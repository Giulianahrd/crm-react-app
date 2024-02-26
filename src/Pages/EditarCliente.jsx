import { obtenerClienteEdit, actualizarCliente } from "../data/clientes";
import Formulario from "../Components/Formulario";
import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import Errors  from "../Components/Errors";

export async function loader({params}) {
    const cliente = await obtenerClienteEdit(params.clienteId)

    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados'
        })
    }

    return cliente
}

export async function action({request, params}) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
   
    //validacion
    const errors = []
    if (Object.values(datos).includes("")) {
      errors.push("Todos los campos son obligatorios")
    }
  
    //retornar si hay errores
    if (Object.keys(errors).length) {
      return errors
    }
   //actualizar el cliente
    await actualizarCliente( params.clienteId, datos)
     
    return redirect('/')

}

function EditarCliente() {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errors = useActionData()

  return (
    <div>

      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>

      <div className='flex justify-end'>
        <button 
          className='bg-blue-800 text-white px-3'
          onClick={() => navigate("/")}>
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
         
        {errors?.length && errors.map( (error, i) => <Errors key={i}>{error}</Errors>)}

         <Form
           method="post"
           >
             <Formulario
             cliente={cliente}/>

             <input
                type="submit"
                className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
                value="Guardar Cambios"
              />

          </Form> 
      </div>


    </div>
  )
}

export default EditarCliente
