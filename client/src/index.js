import {} from "dotenv/config";
import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import initApolloClient from "./apollo/initApolloClient";
//import { StoreProvider } from "./store";
import App from "./components/app/App";
import "./styles/index.scss";
console.log("process env", process.env);
console.log("server url", process.env.SERVER_URL);
const SERVER_URL = "http://localhost:4000/graphql";

const serverUrl = process.env.SERVER_URL || SERVER_URL;
const client = initApolloClient(serverUrl);

const InitApp = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>
);

render(<InitApp />, document.getElementById("root"));
