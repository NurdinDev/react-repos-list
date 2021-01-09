import { SearchType, useGitHubSearchQuery } from "../generated/graphql";
import React, { useMemo } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface RepoType {
  key: number;
  name: string;
  stargazerCount: string;
  forkCount: string;
}

export const Repos: React.FC = () => {
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

  const getDataSource: RepoType[] = useMemo(() => {
    const arr: RepoType[] = [];
    if (edges) {
      edges.forEach((repo, index) => {
        if (repo && repo.node) {
          console.log(repo.node);
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
  return (
    <>
      {getDataSource.length ? (
        <Table columns={columns} dataSource={getDataSource} size="middle" />
      ) : null}
    </>
  );
};
