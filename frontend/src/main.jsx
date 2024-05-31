import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import ProfileLayout from './layouts/ProfileLayout'
import { PostContextProvider } from './context/postContext'
import {UserContextProvider} from './context/userContext'
import Register from './pages/Register'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  },
  {
    path: '/user/register',
    element: <Register></Register>,
  },
  {
    path: '/user/login',
    element: <Login></Login>,
  },
  {
    path: '/user',
    element: <ProfileLayout></ProfileLayout>,
    children: [
      {
        path: '/user/:id',
        element: <ProfilePage></ProfilePage>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <PostContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </PostContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
