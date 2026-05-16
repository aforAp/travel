import { useState, useEffect } from "react";
import Header from "@/components/Header.tsx";
import { useLoaderData } from "react-router-dom";
import { DropdownMenuComplex } from "@/components/ui/DropMenu.tsx";
import { selectItems, groupTypes, interests,budgetOptions } from "@/constants";
import { DropdownMenuTravel } from "@/components/ui/DropDownMenuTravel";
import Map from "@/components/ui/Map";
import { cn } from "@/lib/utils";


const CreateTrip = () => {
  const data = useLoaderData();
    console.log('Datas re');
   console.log([...data]);
     const [formData, setFormData] = useState<TripFormData>({
         country: data[0]?.name || '',
         travelStyle: '',
         interest: '',
         budget: '',
         duration: 5,
         groupType: ''
     });
    
     const [error, setError] = useState<string | null>(null);
     const [loading, setLoading] = useState(false);
const mapData = 
  {
   country:  formData.country,
   coordinates: data.find((c: Country) => c.name === formData.country)?.coordinates || []
  };
console.log("the formDtata");
console.log(formData.country);
console.log("the map data are");

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  const token = localStorage.getItem("token");
 event.preventDefault();
 setLoading(true);
console.log("The formData" + formData.country, formData.travelStyle, formData.budget, formData.groupType, formData.interest);
 if(!formData.country || !formData.travelStyle || !formData.interest || !formData.budget || !formData.groupType) {
  setError("Please provide values for all fields");
  setLoading(false);
  return;
 }

 if(formData.duration < 1 || formData.duration > 10) {
  setError("Please must be between 1 and 10 days");
  setLoading(false);
  return;
 }

 const res = await fetch('http://localhost:3001/me', {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
 });

 if(res.status !== 200) {
    setLoading(false);
    return;
 }

 try {
    console.log('user',res);
    console.log('formData', {...formData});
 }
   catch (e) {
    console.error("Error generating trip", e);
   } finally {
    setLoading(false);
   }
    
}

const handleChange = (key: keyof TripFormData, value: string | number) => {
   setFormData((prev) => ({
    ...prev,[key] : value
   }))
   console.log(formData);
}
    // const handleSubmit = async () => {

    //   const countries = data as Country[];
    //   console.log(countries);

    // }

  return (
    <main className="flex flex-col gap-10 pb-20">
      <Header title="Add a New Trip" description="View and edit AI-generated travel plans" />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form overflow-y-scroll h-[500px]" onSubmit={handleSubmit}>
       <div className="combo-box">
  <label>Country</label>
  <span className="form-input">

    <DropdownMenuComplex countries={data} onChange={(key, value) => handleChange(key, value)} />
  </span>

</div>
<div className="combo-box">
  <label htmlFor="duration">Duration</label>
  <input id="duration" name="duration" placeholder="Enter a number of days (5, 12 ....)" className="form-input placeholder:text-gray-100" onChange={(e) => handleChange('duration', Number(e.target.value))} />

</div>
<div className="combo-box">
    <label htmlFor="duration">Travel Type</label>
    <span>
     <DropdownMenuTravel field="travelStyle" selectedItems={selectItems} onChange={(key, value) => handleChange(key, value)} />
    </span>
    
  </div>
  <div className="combo-box">
    <label htmlFor="duration">Group Type</label>
    <span>
     <DropdownMenuTravel field="groupType" selectedItems={groupTypes} onChange={(key, value) => handleChange(key, value)} />
    </span>
    
  </div>
   <div className="combo-box">
    <label htmlFor="duration">Interest</label>
    <span>
     <DropdownMenuTravel field="interest" selectedItems={interests} onChange={(key, value) => handleChange(key, value)}/>
    </span>
    
  </div>
  <div className="combo-box">
    <label htmlFor="duration">Budget</label>
    <span>
     <DropdownMenuTravel field="budget" selectedItems={budgetOptions} onChange={(key, value) => handleChange(key, value)}/>
    </span>
    
  </div>
  <div>
    <label htmlFor="location">
      Location on the world map
    </label>
    <span>
      <Map country={mapData.country} coordinates={mapData.coordinates} />
    </span>
  </div>
  <div className="bg-gray-200 h-px w-full" />
  {error && (
    <div className="error">
      <p>{error}</p>
    </div>
  )}
  <footer className="px-6 w-full">
    <button type="submit" className="button-class !h-12 !w-full disabled={loading}">
       <img src={`/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} className={cn("size-5", {'animate-spin': loading})} />
       <span className="p-16-semibold text-white">
        {loading ? 'Generating....': 'Generate Trip'}
       </span>
    </button>
  </footer>
            </form> 
      </section>
   </main>
  )
}

export default CreateTrip;



