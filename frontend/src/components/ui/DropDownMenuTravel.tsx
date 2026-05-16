import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";

export function DropdownMenuTravel({ selectedItems = {}, onChange, field }) {

  const [key, setKeys] = useState("");

    const handleSelect = (value: string) => {
    setKeys(value);
    onChange(field, value);
  };
  return (
    <DropdownMenu>

      {/* ✅ FIXED TRIGGER */}
      <DropdownMenuTrigger asChild>
        <button className="w-[100%] flex px-3 py-2 border rounded-md text-center cursor-pointer">
    <ChevronDown className="absolute right-5"/> 
          {key || "Select Group Type"}
        </button>
    
      </DropdownMenuTrigger>

      {/* CONTENT */}
      <DropdownMenuContent className="bg-none w-[100%] max-h-64 overflow-y-auto">

        <DropdownMenuGroup className="w-full flex center">
<span className="w-[100%] ml-50 mr-25">
          {Object.values(selectedItems).map((c, index) => (
            <DropdownMenuItem
              key={index}
             
              className="cursor-pointer"
            onClick={() => handleSelect(c)}
            >
              {c}
            </DropdownMenuItem>
          ))}
</span>
        </DropdownMenuGroup>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}