import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import NuevoCliente from "./Pages/NuevoCliente";
import Inicio from "./Pages/Inicio";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, //lo que tenga en layout va a estar en todas las urls childrens. Los children son hijos del layout
    children: [
      {
        index: true,
        element: <Inicio/>
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
