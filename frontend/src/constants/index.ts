import { formatDate } from "@/lib/utils";
import home from "../assets/icons/home.svg";
import usersLogo from "../assets/icons/users.svg";
import itinerary from "../assets/icons/itinerary.svg";
import simple1 from "../assets/images/sample1.jpg";
import simple2 from "../assets/images/sample2.jpg";
import simple3 from "../assets/images/sample3.jpg";
import simple4 from "../assets/images/sample4.jpg";

export const sidebarItems = [
  {
    id: 1,
    icon: home,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 3,
    icon: usersLogo,
    label: "All Users",
    href: "/all-users",
  },
  {
    id: 4,
    icon: itinerary,
    label: "AI Trips",
    href: "/trips",
  },
];


export const user = {name: 'Satheesh'};

  type User = {
    id: number;
    name: string;
      email: string;
      imageUrl: string;
      dateJoined: string;
      status: string;
      itineraryCreated?: number;

}


type UserHead = {
  id : string,
   name: string;
      email: string;
      imageUrl: string;
      dateJoined: string;
      status: string;
itineraryCreated?: string;
}


export const dashboardStats = {
    totalUsers: 12450,
    usersJoined: {
      currentMonth: 218,
      lastMonth: 176
    },
    totalTrips: 3210,
    tripsCreated: {currentMonth: 150, lastMonth: 250},
    userRole: {total: 62, currentMonth: 25, lastMonth: 15}
  }

 export const allTrips = [{
      id: 1,
      name: "Tropical Rewind",
      imageUrls: [simple1],
      itinerary: [{ location: "Thailand" }],
      tags: ["Adventure", "Culture"],
      travelStyle: "Solo",
      estimatedPrice: "$1,000",
    },
    {
      id: 2,
      name: "French Reverie",
      imageUrls: [simple2],
      itinerary: [{ location: "Paris" }],
      tags: ["Relaxation", "Culinary"],
      travelStyle: "Family",
      estimatedPrice: "$2,000",
    },
    {
      id: 3,
      name: "Zen Break",
      imageUrls: [simple3],
      itinerary: [{ location: "Japan" }],
      tags: ["Shopping", "Luxury"],
      travelStyle: "Couple",
      estimatedPrice: "$3,000",
    },
    {
      id: 4,
      name: "Adventure in Westeros",
      imageUrls: [simple4],
      itinerary: [{ location: "Croatia" }],
      tags: ["Historical", "Culture"],
      travelStyle: "Friends",
      estimatedPrice: "$4,000",
    },
    ];

export const UsersHead: UserHead = {
      id: 'id',
      name: 'name',
      email: 'email',
      imageUrl: 'imageUrl',
      dateJoined: 'dateJoined',
      status: 'status',
      itineraryCreated: 'itineraryCreated'
    };


  export const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      imageUrl: "/assets/images/david.webp",
      dateJoined: formatDate("2025-01-01"),
      itineraryCreated: 10,
      status: "user",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      imageUrl: "/assets/images/david.webp",
      dateJoined: formatDate("2025-01-02"),
      itineraryCreated: 4,
      status: "user",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@example.com",
      imageUrl: "/assets/images/david.webp",
      dateJoined: formatDate("2025-01-03"),
      itineraryCreated: 8,
      status: "admin",
    },
  ];


  export const selectItems = {
  "groupType": "groupType",
  "travelStyle": "travelStyle",
  "interest": "interest",
  "budget": "budget"
   };

   export const interests = [
  "Food & Culinary",
  "Historical Sites",
  "Hiking & Nature Walks",
  "Beaches & Water Activities",
  "Museums & Art",
  "Nightlife & Bars",
  "Photography Spots",
  "Shopping",
  "Local Experiences",
];

   export const budgetOptions = ["Budget", "Mid-range", "Luxury", "Premium"];

export const groupTypes = {
  solo: "Solo",
  couple: "Couple",
  family: "Family",
  friends: "Friends",
  business: "Business"
};;

export const footers = ["Terms & Condition", "Privacy Policy"];



export const comboBoxItems = {
  groupType: groupTypes,
  interest: interests,
  budget: budgetOptions,
} as Record<keyof TripFormData, string[]>;
