import { Header, InfoPill, TripCard } from "@/components";
import ChipDirective from "@/components/ui/ChipDirective";
import { getAllTrips, getAllTripsOnly } from "@/lib/trips";
import { cn, getFirstWord } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router";
const TripsDetail = () => {
   const [allTrips, setAllTrips] = useState([

   ]);
    const tripData =  useRouteLoaderData('TripDetails');
   const {
  country,
  duration,
  imageUrls,
  tripsData,
} = tripData.data;

const {
  name,
  description,
  estimatedPrice,
  travelStyle,
  interest,
  duration: durationData,
  country: TripCountry,
  groupType,
  budget,
} = tripsData;

const pillItems = [
    {text: travelStyle, bg: 'bg-pink-50 !text-pink-500'},
    {text: groupType, bg: 'bg-primary-50 !text-primary-500'},
    {text: budget, bg: 'bg-success-50 !text-success-700'},
    {text: interest, bg: 'bg-navy-50 !text-navy-500'},
];


useEffect(() => {
   
    async function Datas() {
     const {data} = await getAllTripsOnly();
     console.log("datas are");
     const trips =[...data.data];
     setAllTrips(
       (prev) => [...prev, ...trips]);
    }
    Datas();
}, []);

  return (
    <main className="travel-detail wrapper">
        <Header title="Trip Details" description="View and edit AI-generated travel plans" />
        <section className="container wrapper-md">
            <header>
                <h1 className="p-40-semibold text-dark-100">
                    {name}
                </h1>
                <div className="flex items-center gap-5">

                 <InfoPill text={`${durationData} day plan`} image="/icons/calendar.svg" />
             <InfoPill text={`${TripCountry}`} image="/icons/location-mark.svg" />
                </div>
        
            </header>
              <section className="gallery">
                 {imageUrls.map((url: string, i: number) => (
                    <img src={url} key={i} className={cn('w-full rounded-xl object-cover', i === 0 ? 'md:col-span-2 md:row-span-2 h-[330px]': 'md:row-span-1 h-[150px]')}/>
                 ))}
                </section> 
                <section className="flex gap-3 md:gap-5 items-center flex-wrap">
                   <>
                    {pillItems.map((pill, i) => (
                      <ChipDirective key={i} text={getFirstWord(pill.text)} cssClass={`${pill.bg} !text-base !font-medium !px-4`} />
                    ))}
                    <ul className="flex gap-1 items-center">
                        {Array(5).fill().map((_, index) => (
                            <li key={index}>
                                <img src="/icons/star.svg" alt="star" className="size-[18px]" />
                            </li>
                        ))}
                        <li className="ml-1">
                            <ChipDirective text="4.9/5" cssClass="!bg-yellow-50 !text-yellow-700 px-2" />
                        </li>
                    </ul>
                    </>
                </section>
        </section>
<section className="title">
    <article>
        <h3>{duration}-Day {travelStyle}</h3>
        <p>{budget}, {groupType} and {interest}</p>
    </article>
    <h2>{estimatedPrice}</h2>
</section>
<p className="text-sm ms:text-lg font-normal text-dark-400">{description}</p>
    <div className="trip-grid">
     {allTrips.map((trips, id) => (
         <>
       <TripCard id={id} name={trips.tripsData.name} location={trips.country} imageUrl={trips.imageUrls[0]} price={trips.tripsData.estimatedPrice} tags={['interests', 'travelStyle']} />
    
       </>
     ))}
    </div>
    </main>
  )
}

export default TripsDetail;


