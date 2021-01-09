import React from "react";
import { createClient, Provider } from "urql";
import { Repos } from "./components/Repos";



const client = createClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_TOKEN}`,
    },
  },
});

function App() {
  return (
    <Provider value={client}>
      <Repos />
    </Provider>
  );
}

export default App;
