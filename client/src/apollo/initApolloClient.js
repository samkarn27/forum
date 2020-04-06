import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, Observable, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "apollo-utilities";

let apolloCLient = null;

const createDefaultCache = () => new InMemoryCache();

const createAuthenticationLink = () => {
  const request = (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  };

  return new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle;
        Promise.resolve(operation)
          .then((oper) => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );
};

const createApolloClient = (apolloConfig) => {
  const { authLink, uploadLink, wsLink } = apolloConfig;
  const cache = createDefaultCache();

  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    uploadLink
  );

  const config = {
    cache,
    link: ApolloLink.from([authLink, terminatingLink]),
  };

  return new ApolloClient(config);
};

export default (serverUrl) => {
  const serverWebSoketUrl =
    serverUrl &&
    serverUrl.replace("https://", "ws://").replace("http://", "ws://");
  const authLink = createAuthenticationLink();
  const uploadLink = createUploadLink({ uri: serverUrl });

  // Create WebSocket link
  const authToken = localStorage.getItem("token");
  const wsLink = new WebSocketLink({
    uri: serverWebSoketUrl,
    options: {
      timeout: process.env.REACT_APP_CWEBSOCKET_TIMEOUT,
      reconnect: true,
      connectionParams: {
        authorization: authToken,
      },
    },
  });

  const apolloConfig = {
    authLink,
    uploadLink,
    wsLink,
  };

  if (!apolloCLient) {
    apolloCLient = createApolloClient(apolloConfig);
  }
  return apolloCLient;
};
