 const token = localStorage.getItem('token');
export const getAllTrips = async (page: number, LIMIT: number) => {
    console.log("page", page, "limit", LIMIT);
    const data = await fetch(`http://localhost:3001/allTrips?page=${page}&limit=${LIMIT}`);
    const results = await data.json();
    if(results.length === 0) {
        console.error("No trips found");
        return {
            results: [], total: 0
        }

    }
            const totalPages = Math.ceil(
  results.total / LIMIT
);
    return {data: results, total: results.length, totalPages: totalPages};
};

export const getAllTripsOnly = async () => {
    const data = await fetch(`http://localhost:3001/allTripss`);
    const results = await data.json();
    if(results.length === 0) {
        console.error("No trips found");
        return {
            results: [], total: 0
        }

    }
    console.log("the trips in the dashboard");
    console.log(results);
    return {data: results};
};

 export async function AllUsersFunc() {
  
    
      const datas = await fetch('http://localhost:3001/all-users',   {
        method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            

      });
     const results = await datas.json();
     console.log("All USers");
     console.log(results);
     if(results.length === 0) {
        console.error("No users found");
        return {
            datas: [], total: 0
        }
     }
      return {datas: results.user, total: results.length};
    }


export async function AuthMe() {
      try {
       
        const response = await fetch(
          "http://localhost:3001/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // request failed
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

      const data = await response.json();

        // adjust this based on backend response
return data;
      } catch (error) {
        console.log("Error fetching user:", error);
      } 

     
}