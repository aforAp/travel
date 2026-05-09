import { Link, useLocation } from "react-router";
import locationMark from "../assets/icons/location-mark.svg";
import { cn, getFirstWord } from "../lib/utils";
const TripCard = ({id, name, location, imageUrl, tags, price}: TripCardProps) => {
  const path = useLocation();

  return (
    <Link to={path.pathname === '/' || path.pathname.startsWith('/travel') ? `/travel/${id}` : `/trips/${id}`} className="trip-card">
<img src={imageUrl} alt={name} />
   <article>
    <h2 className={cn(name.length > 15 ? 'text-sm': 'text-[15px]')}>{name}</h2>
    <figure>
        <img src={locationMark} alt="location" className="size-4" />
        <p>{location}</p>
    </figure>
   </article>
   <div className="mt-5 pl-[18px] pr-3.5 pb-5">
      <span className="flex">
        {tags.map((tag, index) => (
          <h1 key={index} className={cn(index === 1 ? '!bg-pink-50 !text-pink-500 ml-1 p-2 text-[15px] rounded-3xl': '!bg-success-50 p-2 !text-success-700 ml-1 rounded-3xl text-[15px]')}>{getFirstWord(tag)}</h1>
        ))}
      </span>
   </div>
   <article className="tripCard-pill">
    {price}
   </article>
    </Link>
  )
}

export default TripCard;