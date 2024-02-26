import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../Components/Formulario";
import Errors from "../Components/Errors";
import { agregarCliente } from "../data/clientes";

export  async function action({request}) {
  
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

  await agregarCliente(datos)
   
  return redirect('/')
}

function NuevoCliente () {

  const errors = useActionData()
  const navigate = useNavigate() //me permite redireccionar dentro de botones

  return (
    <div>

      <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
      <p className="mt-3">Completa todos los campos para registrar un nuevo cliente</p>

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
             <Formulario/>

             <input
                type="submit"
                className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
                value="Registrar Cliente"
              />

          </Form> 
      </div>


    </div>
  )
}

export default NuevoCliente

