import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import {Dashboard, AdminLayout, clientLoader, AllUsers, SignIn, CreateTrip, loadersCountry, Trips, TripsDetail, TripLoader} from "./genericExports";
import 'leaflet/dist/leaflet.css';

const router = createBrowserRouter(
  [
    {path: '/forms', element: <SignIn />},
    {path: '/', element: <AdminLayout />, loader: clientLoader,
      children:[
{path:'dashboard', element: <Dashboard />},
{path: 'all-users', element: <AllUsers />},
{path: 'trips/create', loader:loadersCountry,  element: <CreateTrip />},
{path: 'trips', element: <Trips />},
{path: 'trips/:tripId', id: 'TripDetails', loader: TripLoader, element: <TripsDetail />}
  ]}]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
