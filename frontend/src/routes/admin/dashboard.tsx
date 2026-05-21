import {useState, useEffect, useRef} from 'react';
import { Header, StatsCard, TripCard } from "../../components"
import { dashboardStats, user, allTrips } from "../../constants";
import { AllUsersFunc, AuthMe, getAllTripsOnly } from '@/lib/trips';
import {getTripsByTravelStyle, getTripsCreatedPerDay, getUserGrowthPerDay, getUsersAndTripsStats} from "@/components/ui/Dashboard";
import {getAllTrips} from "@/lib/trips";
import { parseTripData } from '@/lib/utils';
import {useMemo} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend
);
type User = {
  name: string;
  email: string;
};
const Dashboard = () => {
  const chartRef = useRef(null);
 const [currentUser, setCurrentUser] = useState<User | null>(null);
 const [dashboardStats, setDashboardStats] = useState(null);
 const [allTrips, setAllTrips] = useState([]);
 const [usersList, setUsersList] = useState([]);
 const [userGrowth, setUserGrowth] = useState([]);
 const [tripsCreatedPerDay, setTripsCreatedPerDay] = useState([]);
 const [tripsByTravelStyle, setTripsByTravelStyle] = useState([]);
const [usersAndTrips, setUsersAndTrips] = useState([]);
 const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "User Growth Over Time",
      font: {
        size: 18,
      },
    },
    legend: {
      display: true,
      position: "top",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Months",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of Users",
      },
      beginAtZero: true,
    },
  },
};

 const TripTrendsOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Trip Trends Over Time",
      font: {
        size: 18,
      },
    },
    legend: {
      display: true,
      position: "top",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Months",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of Users",
      },
      beginAtZero: true,
    },
  },
};

 useEffect(() => {
    async function LoggedIn() {
      const [data, dashboardStatss, allTrips, growth, tripsCreatedperDay, users] = await Promise.all([
        AuthMe(),
      getUsersAndTripsStats(),
      getAllTrips(1, 4),
      getTripsCreatedPerDay(),
      getTripsByTravelStyle(),
      AllUsersFunc()
    ]);
     console.log("The dashboard statsss");
     setTripsCreatedPerDay(tripsCreatedperDay);
     console.log("the growth is", growth);
      setUserGrowth(growth);
      console.log("the trips by travel style", tripsCreatedperDay);
      setTripsByTravelStyle(tripsCreatedperDay);
      setCurrentUser(data.user);
      console.log("the dashboard stats are", allTrips.data.data);
      setDashboardStats(dashboardStatss);
      
  const allTripss = allTrips?.data?.data.map(({_id, travelStyle, imageUrls, tripsData}) => ({
    id: _id,
    tripsData,
    imageUrls: imageUrls ?? [],
  }));

  const trips = allTrips?.data?.data.map((trip) => ({
    imageUrl: trip.imageUrls[0],
    name: trip.tripsData.name,
    interest: trip.tripsData.interest,
  }));
  console.log("the trips in the dashboard");
  console.log(allTripss);
setUsersAndTrips(trips);
  const mappedUsers = users.datas.map((user) => ({
    image: user.profileImage,
    name: user.name,
    email: user.email,
    count: user?.count ?? Math.floor(Math.random() * 10) + 1,
  }));
  console.log("the mapped users");
  console.log(mappedUsers);
  setUsersList(mappedUsers);
      setAllTrips(allTripss);
    }

    LoggedIn();

  }, []);
const headers = ['name', 'TripsCreated'];
const headers2 = ['name', 'Interests'];
const usersAndTripsArray = [
  {
    title: 'Latest user signups',
    dataSource: usersList,
    field: 'count',
    header: headers,
    headerText: 'Trips Created'
  },
  {
    title: 'Trips based on interests',
    dataSource: usersAndTrips,
    field: 'interest',
    header: headers2,
    headerText: 'Interests'

  }
]

const userGrowthChart = useMemo(() => {
  return {
    labels: userGrowth.map((item) => item.day),
    datasets: [
      {
        label: "User Growth",
        data: userGrowth.map((item) => item.count),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };
}, [userGrowth]);

const TripsByTravelStyleChart = useMemo(() => {
  return {
    labels: Object.keys(tripsByTravelStyle),
    datasets: [
      {
        label: "Trips by Travel Style",
        data: Object.values(tripsByTravelStyle),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };
}, [tripsByTravelStyle]); 
  

  
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
          {allTrips?.slice(0, 4).map(({id, name, imageUrls, itinerary, tags, estimatedPrice, tripsData}) => (
            <TripCard 
            key={id}
            id={id}
            name={tripsData.name}
            imageUrl={imageUrls[0]}
            location={tripsData.country ?? ''}
            tags={[tripsData.interest, tripsData.travelStyle]}
            price={tripsData.estimatedPrice}
            />
          ))}
        </div>
       </section>
       <section className="grid grid-cols-1 lg:grid-cols-1 gap-5">
        <Bar data={userGrowthChart} options={options} />
        <Bar data={TripsByTravelStyleChart} options={TripTrendsOptions} />
       </section>
       <section className="user-trip wrapper">
{usersAndTripsArray.map(({title, dataSource, field, header,  headerText}, i) => (
   <div key={i} className="flex flex-col gap-5">
       <h3 className="p-20-semibold text-dark-100">{title}</h3>
<section className='w-full'>
<Table className="w-[300px]">
<TableHeader>
  <TableRow>
    <TableHead>{header?.[0] || 'Name'}</TableHead>
    <TableHead>{header?.[1] || 'Interests'}</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  {dataSource.map((item, index) => (
    <TableRow key={index} className="h-15">
      <TableCell>
        {item[header?.[0] || 'name']}
      </TableCell>
      <TableCell>
        {item[field || 'Interests']}
      </TableCell>
    </TableRow>
  ))}
</TableBody>
</Table>
</section>
   </div>
))}

       </section>
    </main>
  )
}

export default Dashboard
