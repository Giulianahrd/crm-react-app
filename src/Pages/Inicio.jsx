import { useLoaderData } from "react-router-dom"//es un hook que se utiliza para mostrar lo que se envuentra dentro de loader
import Cliente from "../Components/Cliente";
import { obtenerClientes } from "../data/clientes";

export function loader() { //la funcion loader se va a ejecutar cuando el componente carge, es ideal para cargar un state o consultar en una API, siempre tiene que retornnar algo
 const clientes =  obtenerClientes()
  return clientes
}

function Inicio() {

  const clientes = useLoaderData()
  

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      {clientes.length? ( 
         <table className="w-full bg-white shadow mt-5 table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Cliente</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
             
              <tbody>
                {clientes.map(cliente => (
                  <Cliente
                   cliente={cliente}
                   key={cliente.id}
                   empresa={cliente.empresa}
                  />
                ))}
              </tbody>
            
         </table> ) : (
         <p className="text-center nt-10">No hay clientes aun</p> 
      )}
    </>
  )
}

export default Inicio
