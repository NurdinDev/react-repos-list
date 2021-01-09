import { gql } from "graphql-request";
import { useGraphQuery } from "./hooks/useGraphQuery";

const GET_REACT_REPOS = gql`
  query() {
    search(query: "topic:react", type: REPOSITORY, first: 10) {
      repositoryCount
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasPreviousPage
      }
      nodes {
        ... on Repository {
          name
          forkCount
          stargazerCount
          url
        }
      }
    }
  }
`;

const App = () => {
  const { data, isLoading, error } = useGraphQuery(
    "search",
    GET_REACT_REPOS
  );
  console.log(data);
  return <p>Hello</p>;
};

export default App;
