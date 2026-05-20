export const getAllTrips = async () => {
    const data = await fetch('http://localhost:3001/allTrips');
    const results = await data.json();
    if(results.length === 0) {
        console.error("No trips found");
        return {
            results: [], total: 0
        }
    }
    return {data: results, total: results.length};
};
