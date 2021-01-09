import { SearchType, useGitHubSearchQuery } from "../generated/graphql";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface RepoType {
  key: number;
  name: string;
  stargazerCount: string;
  forkCount: string;
  url: string;
}

export const Repos: React.FC = () => {
  const [page, setPage] = useState(null);
  const [pageInfo, setPageInfo] = useState({});

  const [{ data, fetching }] = useGitHubSearchQuery({
    variables: { type: SearchType.Repository, query: "topic:react" },
  });
  const columns: ColumnsType<RepoType> = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Stars",
        dataIndex: "stargazerCount",
      },
      {
        title: "Forks",
        dataIndex: "forkCount",
      },
    ],
    []
  );
  const edges = useMemo(() => data?.search?.edges, [data]);
  const totalCount = useMemo(() => data?.search?.repositoryCount, [data]);

  useEffect(() => {
    if (data) {
      setPageInfo(data.search?.pageInfo);
    }
  }, [data]);

  const getDataSource: RepoType[] = useMemo(() => {
    const arr: RepoType[] = [];
    if (edges) {
      edges.forEach((repo) => {
        if (repo && repo.node) {
          const { id, name, url, stargazerCount, forkCount } = {
            name: "",
            stargazerCount: 0,
            forkCount: 0,
            url: "",
            id: 0,
            ...repo.node,
          };
          arr.push({
            key: id as number,
            name,
            url,
            stargazerCount: `${stargazerCount} 🌟`,
            forkCount: `${forkCount} 🍴`,
          });
        }
      });
    }
    return arr;
  }, [edges]);

  if (fetching) {
    return <p>Loading...</p>;
  }

  const changePage = (page: any, pageSize: any) => {
    console.log("changePage", page, pageSize);
    // @TODO compleat pagination functionality
    setPage(page);
  };

  return (
    <>
      {getDataSource.length ? (
        <Table<RepoType>
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                window.open(record.url, "_black");
              },
            };
          }}
          columns={columns}
          pagination={{
            total: totalCount,
            onChange: changePage,
          }}
          dataSource={getDataSource}
          size="middle"
        />
      ) : null}
    </>
  );
};
