import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clientesDB',{useNewUrlParser: true})

//Definir el schema de clientes
const clienteSchema = mongoose.Schema({
  nombre: String,
  apellidos: String,
  empresa: String,
  emails: Array,
  tipo: String,
  pedidos: Array,
})

const Clientes = mongoose.model('clientes', clienteSchema)

export {Clientes};