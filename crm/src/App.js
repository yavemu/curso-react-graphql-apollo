import React from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost'

const clientApollo = new ApolloClient({
  uri:"http://localhost:3000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
})

function App() {
  return (
    <ApolloProvider client={clientApollo} >
      <h1>Hola mundo desde ReactJS</h1>
    </ApolloProvider>
  );
}

export default App;
