import { buildSchema } from 'graphql'

const schema = buildSchema(`
  """ Estructura objeto Cliente """
  type Cliente {
    id: ID
    nombre:String
    apellidos:String
    empresa:String
    emails:[Email]
    tipo:TipoCliente
    pedidos:[Pedido]
  }

  """ Estructura objeto del Input de Cliente """
  input ClienteInput {
    id: ID
    nombre:String!
    apellidos:String!
    empresa:String!
    emails:[EmailInput!]
    tipo: TipoCliente!
    pedidos: [PedidoInput!]
  }

  """ Estructura objeto Pedido """
  type Pedido {
    producto: String
    precio: Int
  }

  """ Estructura objeto del Input de Pedido """
  input PedidoInput {
    producto: String!
    precio: Int!
  }

  """ Estructura objeto Email """
  type Email {
    email: String
  }

  """ Estructura objeto del Input de Email """
  input EmailInput {
    email: String!
  }

  """ Te permite identificar el tipo de cliente """
  enum TipoCliente {
    BASICO
    PREMIUM
  }

  """ Queries de Cliente """
  type Query {
    """ Obtener un cliente con su id """
    getCliente(id: ID!):Cliente
  }

  """ Mutatios de Cliente """
  type Mutation {
    """ Crear Cliente """
    createCliente(input:ClienteInput!):Cliente
  }
`);

export default schema;