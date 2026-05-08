import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';
import Dashboard from './routes/admin/dashboard';
import AdminLayout from './routes/admin/admin-layout';
import AllUsers from './routes/admin/all-users';
const router = createBrowserRouter(
  [
    {path: '/', element: <AdminLayout />, 
      children:[
{
  path:'dashboard', element: <Dashboard />
},
{
  path: 'all-users', element: <AllUsers />
}
  ]
}
  ]
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
