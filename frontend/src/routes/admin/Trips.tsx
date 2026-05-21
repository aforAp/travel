import { Header, TripCard } from "@/components";
import { getAllTrips } from "@/lib/trips";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const LIMIT = 2;
const Trips = () => {

  const [searchParams, setSearchParams] = useSearchParams();
   const page = Number(searchParams.get("page")) || 1;
const navigate = useNavigate();
  const TripsList = {
    allTrips: [],
    total: 0,
    totalPages: 0
  };

  const [currentPage, setCurrentPage] = useState(page);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search  = `?page=${page}`
  }

  function NavigationToForms() {
    navigate('create');
  }
const [tripData, setTripData] = useState(TripsList);
useEffect(() => {
  async function AllTrips() {
    console.log("inside useEffect Pages", page);
    const {data} = await getAllTrips(page, LIMIT);
    console.log("the Trips Data are", data);
     setTripData(prev => ({
    ...prev,
     allTrips: data.data,
      total: data.total,
      totalPages: data.totalPages
   }));
  }

  AllTrips();
}, [page]);




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
       <TripCard id={trips._id} name={trips.tripsData.name} location={trips.country} imageUrl={trips.imageUrls[0]} price={trips.tripsData.estimatedPrice} tags={['interests', 'travelStyle']} />
    
       </>
     ))} 
  </div> 
  <div className="flex flex-row justify-between px-10 pt-3">
   <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious  onClick={() => handlePageChange(page - 1)}/>
        </PaginationItem>
{Array.from({length: tripData.totalPages}, (_, index) =>  (
  <PaginationItem key={index}>
    <PaginationLink
      href={`?page=${index + 1}`}
      isActive={page === index + 1}
      onClick={() =>
        setSearchParams({ page: String(index + 1) })
      }
    >
      {index + 1}
    </PaginationLink>
  </PaginationItem>
))}

<PaginationItem>
  <PaginationNext onClick={() => handlePageChange(page + 1)} className={
      page >= tripData.totalPages
        ? "pointer-events-none opacity-50"
        : "cursor-pointer"
    }/>
</PaginationItem>

</PaginationContent>
   </Pagination>
   </div>      
  </section>
   </main>
  )
}

export default Trips;
