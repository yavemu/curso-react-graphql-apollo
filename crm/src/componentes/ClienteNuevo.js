import React, { Fragment, useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CLIENTE } from '../mutations'
import { ClienteFormulario } from './ClienteFormulario';

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

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'nombre') setNombre(value)
    else if (name === 'apellidos') setApellidos(value)
    else if (name === 'empresa') setEmpresa(value)
    else if (name === 'tipo') setTipo(value)
    else if (name === 'emails') setEmails(value)
  }

  const onSubmit = (e) => {
      e.preventDefault();

      setValidationError(false)
      if (!nombre || !apellidos || !empresa || !emails[0].email || !tipo) {
        setValidationError(true)
      } else {
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
  }

  return (
    <Fragment>
      <h1 className='text-center'>NUEVO CLIENTE</h1>
      <ClienteFormulario 
        onSubmit={onSubmit}
        onChange={onChange}
        validationError={validationError}
        guardarEmail={guardarEmail}
        quitarEmail={quitarEmail}
        nuevoEmail={nuevoEmail}
        nombre={nombre}
        apellidos={apellidos}
        empresa={empresa}
        tipo={tipo}
        emails={emails}
      />
    </Fragment>
  );
};

export default ClienteNuevo