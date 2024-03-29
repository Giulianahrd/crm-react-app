import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import NuevoCliente, { action as nuevoclienteaction} from "./Pages/NuevoCliente";
import Inicio, { loader as clientesloader } from "./Pages/Inicio";
import  ErrorPage  from "./Components/ErrorPage";
import EditarCliente, { loader as editarClienteLoader, action as editarClienteAction} from "./Pages/EditarCliente";
import { action as eliminarClienteAction } from "./Components/Cliente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, //lo que tenga en layout va a estar en todas las urls childrens. Los children son hijos del layout
    children: [
      {
        index: true,
        element: <Inicio/>,
        loader: clientesloader,
        errorElement: <ErrorPage></ErrorPage>
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente/>,
        action: nuevoclienteaction
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente/>,
        loader: editarClienteLoader,
        errorElement: <ErrorPage/>,
        action: editarClienteAction
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: eliminarClienteAction
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
