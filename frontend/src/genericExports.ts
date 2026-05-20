import Dashboard from './routes/admin/dashboard';
import AdminLayout, { clientLoader } from './routes/admin/admin-layout';
import AllUsers from './routes/admin/all-users';
import SignIn from './routes/admin/root/sign-in';
import CreateTrip from './routes/admin/create-trip';
import {loadersCountry} from "./lib/utils.ts";
import Trips from './routes/admin/Trips';
import TripsDetail from './routes/admin/TripsDetails.tsx';
import {loader as TripLoader} from "./lib/auth.ts"
export {Dashboard, AdminLayout, clientLoader, AllUsers, TripLoader, SignIn, CreateTrip, loadersCountry, Trips, TripsDetail};