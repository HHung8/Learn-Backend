import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import Navbar from './pages/Navbar'
import { Textarea } from './components/ui/textarea'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { RouterProvider } from 'react-router'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },
  {
    path:"/login",
    element:<Login />
  }
])

function App() {
  return (
   <RouterProvider router={appRouter} />
  )
}

export default App
