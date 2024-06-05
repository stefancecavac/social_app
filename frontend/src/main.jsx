import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import ProfileLayout from './layouts/ProfileLayout'
import { PostContextProvider } from './context/postContext'
import { UserContextProvider } from './context/userContext'
import Register from './pages/Register'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import { FriendsContextProvider } from './context/friendsContext'
import AuthRedirect from './layouts/AuthRedirect'
import FriendsPage from './pages/FriendsPage'
 
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <AuthRedirect><Home></Home></AuthRedirect>
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
        element: <AuthRedirect><ProfilePage></ProfilePage></AuthRedirect>
      }
    ]
  },
  {
    path: '/friends',
    element: <MainLayout></MainLayout>,
    children:[
      {
        path: '/friends',
        element: <AuthRedirect><FriendsPage></FriendsPage></AuthRedirect>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <FriendsContextProvider>
        <PostContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </PostContextProvider>
      </FriendsContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
