import { Header, TripCard } from "@/components";
import { getAllTrips } from "@/lib/trips";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
const Trips = () => {
const navigate = useNavigate();
  const TripsList = {
    allTrips: [],
    total: 0
  };
const [searchParams] = useSearchParams();
const initialPage = Number(searchParams.get('page') || '1');
const [currentPage, setCurrentPage] = useState(initialPage);

const handlePageChange = (page: number) => {
  setCurrentPage(page);
  window.location.search = `?page=${page}`
}
  function NavigationToForms() {
    navigate('create');
  }
const [tripData, setTripData] = useState(TripsList);
  useEffect(() => {
    async function AllTrips() {
     const data = await getAllTrips();
     setTripData({...tripData, allTrips: data.data, total: data.data.length});
    }
    AllTrips();
  },[]);

     return (
    <main className="all-user wrapper">
      <Header title="Trips" description="View and edit AI-generated" ctaText="Create a Trip" cta="/trips/create" />
       
      <button className="bg-blue-600 rounded-xl my-3 w-full h-10 text-white" onClick={NavigationToForms}>
        <span className="flex justify-center">

        <Plus />
        Create a Trip
        </span>
      </button>
      <section>
        <h1 className="p-24-semibold text-dark-100 mb-10">Manage Created Trips</h1>
       <div className="trip-grid">
       {tripData.allTrips.map((trips, id) => (
         <>
       <TripCard id={id} name={trips.tripsData.name} location={trips.country} imageUrl={trips.imageUrls[0]} price={trips.tripsData.estimatedPrice} tags={['interests', 'travelStyle']} />
    
       </>
     ))} 
  </div>       
  </section>
   </main>
  )
}

export default Trips;
