import { Link, NavLink, useNavigate } from "react-router"
import logo from "../assets/icons/logo.svg";
import Logout from "../assets/icons/logout.svg";
import { sidebarItems } from "../constants/index.ts";
import { cn } from "../lib/utils.ts";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: string;
  joinedAt?: string;
}

const NavItems = () => {
 const [user, setUser] = useState<User>(); 
 const navigate = useNavigate();
  useEffect(() => {
async function FindMe() {
  const token = localStorage.getItem("token");
  if(!token) return;
  try{
  const res= await fetch('http://localhost:3001/auths/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      const data = await res.json();
      console.log("datas are", data);
      setUser(data);   
        } 
        catch(error) {
          console.log(error);
        }
}

FindMe();
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/forms');
  }
  return (
   <section className="nav-items">
    <Link to="/" className="link-logo">
  <img src={logo} alt="logo" className="size-[30px]" />
    <h1>Tourvisto</h1>
    </Link>
    <div className="container">
      <nav>
        {sidebarItems.map(({id, href, icon, label}) => (
          <NavLink to={href} key={id}>
            {({isActive}: {isActive: boolean}) => (
              <div className={cn('group nav-item', {
                'bg-primary-100 !text-white': isActive
              })}>
                <img src={icon} alt={label} className={`group-hover:brightness-0 size-0 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`}/>
               {label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>
      <footer className="nav-footer">
         <img src={user?.imageUrl} alt={user?.name || 'David'} />
         <article>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
         </article>
         <button onClick={handleLogout} className="cursor-pointer">
             <img src={Logout} alt="logout" className="size-6" />
         </button>
      </footer>
    </div>
   </section>
  )
}

export default NavItems;
