import Header from "@/components/Header.tsx";
import { useLoaderData } from "react-router-dom";
import { DropdownMenuComplex } from "@/components/ui/DropMenu.tsx";
import { selectItems, groupTypes } from "@/constants";
import { formatKey } from "@/lib/utils";
import { DropdownMenuTravel } from "@/components/ui/DropDownMenuTravel";

const CreateTrip = () => {

    const data = useLoaderData();
    console.log('Datas re');
   console.log([...data]);

const handleChange = (key: keyof TripFormData, value: string | number) => {

}
    // const handleSubmit = async () => {

    //   const countries = data as Country[];
    //   console.log(countries);

    // }

  return (
    <main className="flex flex-col gap-10 pb-20">
      <Header title="Add a New Trip" description="View and edit AI-generated travel plans" />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form">
       <div>
  <label>Country</label>
  <span className="form-input">

    <DropdownMenuComplex countries={data} />
  </span>

</div>
<div>
  <label htmlFor="duration">Duration</label>
  <input id="duration" name="duration" placeholder="Enter a number of days (5, 12 ....)" className="form-input placeholder:text-gray-100" onChange={(e) => handleChange('duration', Number(e.target.value))} />

</div>
<div>
    <label htmlFor="duration">Travel Type</label>
    <span>
     <DropdownMenuTravel selectedItems={selectItems} />
    </span>
    
  </div>
  <div>
    <label htmlFor="duration">Group Type</label>
    <span>
     <DropdownMenuTravel selectedItems={groupTypes} />
    </span>
    
  </div>
            </form> 
      </section>
   </main>
  )
}

export default CreateTrip;



