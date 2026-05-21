import { AllUsersFunc, getAllTripsOnly } from "@/lib/trips";
import { parseTripData } from "@/lib/utils";

interface Document {
  [key: string]: any;
}

type FilterByDate = (
  items: Document[],
  key: string,
  start: string,
  end?: string
) => number;


type Trip = {
  tripDetails: string;
};

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {

  // Current Month Dates
  const d = new Date();

  const startCurrent = new Date(
    d.getFullYear(),
    d.getMonth(),
    1
  ).toISOString();

  // Previous Month Dates
  const startPrev = new Date(
    d.getFullYear(),
    d.getMonth() - 1,
    1
  ).toISOString();

  const endPrev = new Date(
    d.getFullYear(),
    d.getMonth(),
    0
  ).toISOString();

  // Fetch Users and Trips
  const [usersResponse, tripsResponse] = await Promise.all([
    AllUsersFunc(),
    getAllTripsOnly(),
  ]);

const users = usersResponse.datas;
const trips = tripsResponse.data.data;

  // Filter By Date
  const filterByDate: FilterByDate = (
    items,
    key,
    start,
    end
  ) => {

    return items.filter((item) => {

      const itemDate = new Date(item[key]);
      const startDate = new Date(start);

      return (
        itemDate >= startDate &&
        (!end || itemDate <= new Date(end))
      );

    }).length;
  };

  // Filter Users By Role
  const filterUsersByRole = (role: string) => {
    return users.filter(
      (user: any) => user.status === role
    );
  };
console.log("users", users);
console.log("users array", Array.isArray(users));

console.log("trips", trips);
console.log("trips array", Array.isArray(trips));

console.log(
  "filtered users",
  filterUsersByRole("user")
);

console.log(
  "filtered users array",
  Array.isArray(filterUsersByRole("user"))
);
  // Final Stats
  return {

    // Total Users
    totalUsers: users.length,

    // User Joined Stats
    usersJoined: {

      currentMonth: filterByDate(
        users,
        "joinedAt",
        startCurrent
      ),

      lastMonth: filterByDate(
        users,
        "joinedAt",
        startPrev,
        endPrev
      ),
    },

    // Normal User Stats
    userRole: {

      total: filterUsersByRole("user").length,

      currentMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startCurrent,
        undefined
      ),

      lastMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startPrev,
        endPrev
      ),
    },

    // Total Trips
    totalTrips: trips.length,

    // Trips Created Stats
    tripsCreated: {

      currentMonth: filterByDate(
        trips,
        "createdAt",
        startCurrent
      ),

      lastMonth: filterByDate(
        trips,
        "createdAt",
        startPrev,
        endPrev
      ),
    },
  };

  
};

export const getUserGrowthPerDay = async () => {
    const users = await AllUsersFunc();

    const userGrowth = users.datas.reduce(
        (acc: { [key: string]: number }, user: Document) => {
            const date = new Date(user.joinedAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(userGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getTripsCreatedPerDay = async () => {
    const trips = await getAllTripsOnly();
console.log("the trips in the dashboard wow wow");
    console.log(trips.data.data);

    const tripsGrowth = trips.data.data.reduce(
        (acc: { [key: string]: number }, trip: Trip) => {
            const date = new Date(trip.createdAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(tripsGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getTripsByTravelStyle = async () => {
    const trips = await getAllTripsOnly();
    console.log("the trips in the dashboard");
    console.log(trips.data.data);
    const datas = trips.data.data;

    const travelStyleCounts = datas.reduce(
        (acc: { [key: string]: number }, trip) => {

         const TripDatas = trip.tripsData;
            if (trip && TripDatas.travelStyle) {
                const travelStyle = trip.travelStyle;
                acc[travelStyle] = (acc[travelStyle] || 0) + 1;
            }
            return acc;
        },
        {}
    );

    return travelStyleCounts;
/*
  const tripsByTravelStyle = Object.entries(travelStyleCounts).map(([travelStyle, count]) => ({
        count: Number(count),
        travelStyle,
    }));
    console.log("tripsByTravelStyle", tripsByTravelStyle);
    */
};