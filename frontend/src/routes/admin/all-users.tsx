import { Header } from "../../components"
import { UsersHead, users } from "@/constants/index";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AllUsersFunc } from "@/lib/trips";

const AllUsers = () => {
const [usersList, setUsersList] = useState([]);

  useEffect(() => {

    async function AllUserss() {
  
     
      const {datas} = await AllUsersFunc();
      console.log("the data of the users");
      setUsersList(datas);
    }

    AllUserss();
    
  }, []);

  const {id, name, email, dateJoined, status} = UsersHead;
 
  return (
    <main className="all-user wrapper">
      <Header title="Manage Users" description="Filter, sort, and access detailed user profiles" />
    <Table className="mt-10">
      <TableHeader>
      <TableRow>
        <TableHead>

      {id}
        </TableHead>
         <TableHead>

      {name}
        </TableHead>
         <TableHead>

      {email}
        </TableHead>
        <TableHead>

      {dateJoined}
        </TableHead>
         <TableHead>

      {status}
        </TableHead>
      </TableRow>
  
      </TableHeader>
{usersList.map((user, index) =>(

  <TableBody>
  <TableRow className="h-15">
     <TableCell>
      <h1 className="py-3 ml-3">{index + 1}</h1>
       </TableCell>
       <TableCell>
        <span className="flex mt-2 sm:flex-col md:flex-row">
 <img src={user.profileImage} alt="" className="ml-3 rounded-full size-8 aspect-square"/>
    
       <h1 className="mt-2 ml-2">{user.name}</h1>
        </span>
       </TableCell>
       <TableCell>
        {user.email}
       </TableCell>
    
     <TableCell>
        <span className="sm:truncate">
          {formatDate(user.joinedAt)}
          </span>
          
       </TableCell>
       <TableCell>
        <article className={cn('status-column', user.status === 'user' ? 'bg-success-50': 'bg-light-300')}>
           <span className={cn('size-1.5 rounded-full', user.status === 'user' ? ' bg-success-500': ' bg-gray-500')} />
           <h1 className={cn('ml-2 font-inter font-medium', status === 'user'? 'text-success-700': 'text-gray-500')}>{user.status}</h1>
        </article>
       </TableCell>
       </TableRow>
      </TableBody>
) )}
    </Table>
    </main>
  )
}

export default AllUsers
