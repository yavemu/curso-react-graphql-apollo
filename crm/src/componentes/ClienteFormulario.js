import React from 'react'

export const ClienteFormulario = ({
  onSubmit,
  onChange,
  validationError,
  guardarEmail,
  quitarEmail,
  nuevoEmail,
  nombre,
  apellidos,
  empresa,
  tipo,
  emails,
  id=null,
}) => {
  return(
    <form className="col-md-8 m-3" onSubmit={onSubmit} >
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Nombre</label>
          <input type="text" name='nombre' value={nombre} className="form-control" placeholder="Nombre" onChange={onChange} />
        </div>
        <div className="form-group col-md-6">
          <label>Apellidos</label>
          <input type="text" name='apellidos' value={apellidos} className="form-control" placeholder="Apellidos" onChange={onChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Empresa</label>
          <input type="text" name='empresa' value={empresa} className="form-control" placeholder="Empresa" onChange={onChange} />
        </div>
        <div className="form-group col-md-6">
          <label>Tipo Cliente</label>
          <select name='tipo' value={tipo} className="form-control" onChange={onChange}>
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
      <button type="submit" className="btn btn-success float-right">
        {id ? 'Guardar Cambios del Cliente' :'Crear Cliente'}
      </button>
    </form>
  )
}