import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom'

import { GET_CLIENTES } from '../queries'

const Clientes = () => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(GET_CLIENTES, {
    pollInterval: 1000
  });

  if (loading) return 'Cargando...';
  if (error) return `Error Server: ${error.message}`;

  return (
    <Fragment>
      <h1 className='text-center'>LISTAR CLIENTES</h1>
      <ul className="list-group">
        {data.getClientes.map(item=>{
          return (
            <li key={item.id} className='list-group-item mt-4'>
              <div className="row justify-content-between align-items-center">
                <div className="col-md-8 d-flex justify-content-between align-items-center">
                  {item.nombre}
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                  <Link to={`cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                    Editar Cliente
                  </Link>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Fragment>
  );
};

export default Clientes