import React from 'react'
import Home from './Components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import { ToastContainer } from 'react-toastify';
import Login from './Components/Login/Login'
import Register from './Register/Register'
import './index.css'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import Code from './Components/Code/Code'
import UptadePass from './Components/UptadePass/UptadePass'

const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/home', element: <Home /> },
      { path: '/forget-password', element: <ForgetPass /> },
      { path: '/verifyCode', element: <Code /> },
      { path: '/uptade-password', element: <UptadePass /> },
      { path: '*', element: <div className='bg-danger p-3'><h1>Not found page</h1></div> },
    ]
  },
])



const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
