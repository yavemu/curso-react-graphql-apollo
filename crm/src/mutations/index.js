import gql from "graphql-tag";

export const CREATE_CLIENTE = gql`
mutation crearCliente($input: ClienteInput!){
  createCliente(input: $input){
    id
  }
}`;