import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuTravel({ selectedItems = {} }) {

  const [key, setKeys] = useState("");

  return (
    <DropdownMenu>

      {/* ✅ FIXED TRIGGER */}
      <DropdownMenuTrigger asChild>
        <button className="w-[100%] px-3 py-2 border rounded-md text-center cursor-pointer">
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
              onClick={() => setKeys(c)}
              className="cursor-pointer"
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