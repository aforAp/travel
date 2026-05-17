import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Dashboard from './routes/admin/dashboard';
import AdminLayout, { clientLoader } from './routes/admin/admin-layout';
import AllUsers from './routes/admin/all-users';
import SignIn from './routes/admin/root/sign-in';
import CreateTrip from './routes/admin/create-trip';
import {loadersCountry} from "./lib/utils.ts";
import Trips from './routes/admin/Trips';
import 'leaflet/dist/leaflet.css';

const router = createBrowserRouter(
  [
    {path: '/forms', element: <SignIn />},
    {path: '/', element: <AdminLayout />, loader: clientLoader,
      children:[
{
  path:'dashboard', element: <Dashboard />
},
{
  path: 'all-users', element: <AllUsers />
},
{
  path: 'trips/create', loader:loadersCountry,  element: <CreateTrip />
},
{
  path: 'trips', element: <Trips />
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
