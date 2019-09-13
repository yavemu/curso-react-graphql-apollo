import React, { Fragment, useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CLIENTE } from '../mutations'

const ClienteNuevo = (props) => {
  const [nombre,setNombre] = useState('')
  const [apellidos,setApellidos] = useState('')
  const [empresa,setEmpresa] = useState('')
  const [emails,setEmails] = useState([{email:''}])
  const [tipo,setTipo] = useState('')

  const [validationError,setValidationError] = useState(false)

  const [createCliente, { data }] = useMutation(CREATE_CLIENTE,{
    onCompleted: () => props.history.push('/')
  });

  const nuevoEmail = () => {
    setEmails(emails.concat({ email: ''}))
  }

  const quitarEmail = (index) => ()=>{
    if (emails.length >1 ) {
      setEmails(emails.filter((email, i) => i !== index))
    }
  }

  const guardarEmail = index => e => {
    const nuevosEmails = emails.map((email,i) =>{
      if (i !== index) return email;
      return {
        ...email,
        email: e.target.value
      }
    });

    setEmails(nuevosEmails)
  }

  return (
    <Fragment>
      <h1 className='text-center'>NUEVO CLIENTE</h1>
      <form className="col-md-8 m-3" onSubmit={(e) => {
        e.preventDefault();

        setValidationError(false)
        if (!nombre || !apellidos || !empresa || !emails[0].email || !tipo) {
          setValidationError(true)
        }else{
          createCliente({
            variables: {
              input: {
                nombre,
                apellidos,
                empresa,
                emails,
                tipo,
              }
            }
          });
        }

      }} >
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Nombre</label>
            <input type="text" className="form-control" placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
          </div>
          <div className="form-group col-md-6">
            <label>Apellidos</label>
            <input type="text" className="form-control" placeholder="Apellidos" onChange={e => setApellidos(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Empresa</label>
            <input type="text" className="form-control" placeholder="Empresa" onChange={e => setEmpresa(e.target.value)} />
          </div>
          <div className="form-group col-md-6">
            <label>Tipo Cliente</label>
            <select className="form-control" onChange={e => setTipo(e.target.value)}>
              <option value="">Elegir...</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="BASICO">BÁSICO</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          {emails.map((input, index) => (
            <div key={index} className="form-group col-md-12">
              <label>Correo #{index + 1} </label>
              <div className="input-group">
                <input type="email" className="form-control" placeholder={`Ingresa el correo ${index + 1}`} onChange={guardarEmail(index)} />
                {
                  emails.length > 1 &&
                  <div className="input-group-append">
                    <button type='button' className="btn btn-danger" onClick={quitarEmail(index)} > &times; Eliminar</button>
                  </div>
                }
              </div>
            </div>
          ))}
          <div className="form-group justify-content-center d-flex col-md-12">
            <button onClick={nuevoEmail} className="btn btn-warning" type='button'>
              + Agregar otro correo
                  </button>
          </div>
        </div>
        {validationError &&
          <p className="alert alert-danger p-3 text-center">
            Todos los campos son requeridos
                </p>
        }
        <button type="submit" className="btn btn-success float-right">Crear Cliente</button>
      </form>
    </Fragment>
  );
};

export default ClienteNuevo