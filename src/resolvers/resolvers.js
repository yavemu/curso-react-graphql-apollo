class Cliente {
  constructor(id, { nombre, apellidos, empresa, emails, tipo, pedidos }) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.empresa = empresa;
    this.emails = emails;
    this.tipo = tipo;
    this.pedidos = pedidos;
  }
}
const clientesDB = {}

const resolvers = {
  getCliente:({id})=>{
    return new Cliente(id,clientesDB[id])
  },
  createCliente: ({ input }) => {
    const id = require('crypto').randomBytes(10).toString('hex')
    clientesDB[id] = input;
    return new Cliente(id, input)
  }
}

export default resolvers;