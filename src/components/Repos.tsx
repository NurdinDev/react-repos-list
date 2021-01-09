import { SearchType, useGitHubSearchQuery } from "../generated/graphql";
import React, { useMemo } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface RepoType {
  key: number;
  name: string;
  stars: number;
  forks: number;
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
        dataIndex: "stars",
      },
      {
        title: "Forks",
        dataIndex: "forks",
      },
    ],
    []
  );
  const nodes = useMemo(() => data?.search.nodes, [data]);

  const getDataSource: RepoType[] = useMemo(() => {
    const arr: RepoType[] = [];
    if (nodes) {
      nodes.forEach((repo, index) => {
        if (repo) {
          arr.push({
            key: index,
            name: "fwef",
            stars: 32,
            forks: 123,
          });
        }
      });
    }
    return arr;
  }, [nodes]);

  if (fetching) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {nodes ? (
        <Table columns={columns} dataSource={getDataSource} size="middle" />
      ) : null}
    </>
  );
};
