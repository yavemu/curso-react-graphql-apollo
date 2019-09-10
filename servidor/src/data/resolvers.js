import { Clientes } from './db'

export const resolvers = {
  Query: {
    getClientes: (_,{limite}) =>{
      return Clientes.find({}).limit(limite);
    },
    getCliente: (_,{ id }) => {
      return new Promise((resolve, object) => {
        Clientes.findById(id,(error, cliente)=>{
          if (error) rejects(error)
          else resolve(cliente)
        })
      })
    }
  },
  Mutation:{
    createCliente: (_,{ input }) => {
      const nuevoCliente  = new Clientes({
        nombre: input.nombre,
        apellidos: input.apellidos,
        empresa: input.empresa,
        emails: input.emails,
        tipo: input.tipo,
        pedidos: input.pedidos
      });
      return new Promise((resolve, object) => {
        nuevoCliente.save(error => {
          if (error) {
            rejects(error)
          } else {
            resolve(nuevoCliente)
          }
        })
      })
    },
    updateCliente: (_,{ input }) => {
      return new Promise((resolve, object)=>{
        Clientes.findOneAndUpdate({ _id: input.id} , input, { new: true }, (error, cliente) => {
          if (error) rejects(error)
          else resolve(cliente)
        });
      });
    },
    removeCliente: (_, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findByIdAndRemove(id, (error) => {
          if (error) rejects(error)
          else resolve('Cliente eliminado exitosamente.')
        });
      });
    }
  }
}
