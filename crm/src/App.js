import React, { Fragment } from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost'

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Componentes
import Header from './componentes/Header';
import Clientes from './componentes/Clientes';
import ClienteNuevo from './componentes/ClienteNuevo';
import ClienteEditar from './componentes/ClienteEditar';


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
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/cliente/nuevo" component={ClienteNuevo} />
              <Route exact path="/cliente/editar/:id" component={ClienteEditar} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
