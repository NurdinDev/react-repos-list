import { useReactReposQuery } from "./generated/graphql";

const App = () => {
  const [{ data }] = useReactReposQuery();
  console.log(data);
  return <p>Hello</p>;
};

export default App;
