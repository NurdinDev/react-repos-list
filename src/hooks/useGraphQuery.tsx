import { useQuery } from "react-query";
import { GraphQLClient, request } from "graphql-request";

export const useGraphQuery = (key: string, query: any, config = {}) => {
  const endpoint = "https://api.github.com/graphql";
  const headers = {
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_TOKEN}`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => await graphQLClient.request(query);

  // const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, config);
};
