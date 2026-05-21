import {useState, useEffect} from 'react';
import { Header, StatsCard, TripCard } from "../../components"
import { dashboardStats, user, allTrips } from "../../constants";
import { AuthMe } from '@/lib/trips';
import {getUsersAndTripsStats} from "@/components/ui/Dashboard";
type User = {
  name: string;
  email: string;
};
const Dashboard = () => {
 const [currentUser, setCurrentUser] = useState<User | null>(null);
 const [dashboardStats, setDashboardStats] = useState(null);
 
 useEffect(() => {
    async function LoggedIn() {
      const [data, dashboardStats] = await Promise.all([await AuthMe(),
      await getUsersAndTripsStats()]);
     console.log("The dashboard stats");
      const {totalUsers, usersJoined, currentMonth, lastMonth, userRole, totalTrips, tripsCreated} = dashboardStats;
      console.log("the data");
      console.log(data.user);
      setCurrentUser(data.user);
      console.log("the stats");
      console.log(dashboardStats);
      setDashboardStats(dashboardStats);
    }

    LoggedIn();

  }, []);

  
  return (
    <main className="dashboard wrapper">
      <Header title={`Welcome ${currentUser?.name ?? 'Guest'} `} description="Track activity, trends and popular destinations in real time" />
       <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
           <StatsCard 
              headerTitle="Total Users"
              total={dashboardStats?.totalUsers}
              currentMonthCount={dashboardStats?.usersJoined?.currentMonth}
              lastMonthCount={dashboardStats?.usersJoined?.lastMonth}

           />
           <StatsCard 
              headerTitle="Total Trips"
              total={dashboardStats?.totalTrips}
              currentMonthCount={dashboardStats?.tripsCreated?.currentMonth}
              lastMonthCount={dashboardStats?.tripsCreated?.lastMonth}

           />
           <StatsCard 
              headerTitle="Active Users Today"
              total={dashboardStats?.userRole.total}
              currentMonthCount={dashboardStats?.userRole?.currentMonth}
              lastMonthCount={dashboardStats?.usersRole?.lastMonth}

           />
        </div>
       </section>
       <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">
            Created Trips
        </h1>
        <div className="trip-grid">
          {dashboardStats?.allTrips?.slice(0, 4).map(({id, name, imageUrls, itinerary, tags, estimatedPrice}) => (
            <TripCard 
            key={id}
            id={id.toString()}
            name={name}
            imageUrl={imageUrls[0]}
            location={itinerary?.[0]?.location ?? ''}
            tags={tags}
            price={estimatedPrice}
            />
          ))}
        </div>
       </section>
    </main>
  )
}

export default Dashboard
