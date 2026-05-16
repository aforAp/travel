import {useState} from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export function DropdownMenuComplex({countries, onChange}) {
  const [datas, setDatas] = useState({
     img: '',
     name: ''
  });

  return (
<>

 <DropdownMenu className="w-full bg-none ml-10">

      <DropdownMenuTrigger asChild>
        <span variant="outline">

          {(datas.img || datas.name) ?( <span className="flex items-center justify-center">
            <img src={datas.img} alt={datas.name} className="w-5 h-5"/>
            <h1 className="ml-5">{datas.name}</h1>
          </span>) : "Please Choose the country"}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full max-h-64 overflow-y-auto">

        <DropdownMenuGroup className="w-full flex center">
<span className="w-[100%] ml-50 mr-25">
          {countries.map((c, index) => (
           <DropdownMenuItem
  key={index}
  className="flex items-center gap-2"
  onClick={() => {
    setDatas({
      img: c.flag,
      name: c.name,
    });

   onChange('country', c.name);
  }}
>

              <img
                src={c.flag}
                alt={c.name}
                className="w-5 h-4"
              />

              <span>{c.name}</span>

            </DropdownMenuItem>
          ))}
</span>
        </DropdownMenuGroup>

      </DropdownMenuContent>

    </DropdownMenu>

</>
    
                        
  )
};
