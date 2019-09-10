import gql from "graphql-tag";

export const GET_CLIENTES = gql`{
  getClientes {
    id
    nombre
    apellidos
  }
}`;