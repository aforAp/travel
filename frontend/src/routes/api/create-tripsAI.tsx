import { parseMarkdownToJson } from "@/lib/utils";
import { useEffect } from "react";
export const CreateTripsAI = async (formData: TripFormData) => {

  const {
    country,
    duration,
    travelStyle,
    interest,
    budget,
    groupType,
  } = formData;

  const unsplashApiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  console.log(unsplashApiKey);
  // STATIC AI DATA
  const trip = {
    name: `${country} Adventure`,
    description: `A beautiful ${duration} day trip`,
    estimatedPrice: "$1200",
    country,
    duration,
    budget,
    travelStyle,
    interest,
    groupType,
  };

  // FETCH IMAGES
const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${country} ${interest} ${travelStyle}&client_id=${unsplashApiKey}`)

const imageUrls = (await imageResponse.json()).results.slice(0, 3).map((result: any) => result.urls?.regular || null);

console.log(imageUrls);
  return {
    trip,
    imageUrls,
  };
};