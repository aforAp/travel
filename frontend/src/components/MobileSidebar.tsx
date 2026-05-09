import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import logo from "../assets/icons/logo.svg";
import menu from "../assets/icons/menu.svg";
import SidebarComponent from "../lib/SidebarComponent";
import NavItems from "./NavItems";
import { useState } from "react";
const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const paths = location.pathname; 
   useEffect(() => {
   if(paths === '/dashboard' || paths==='/all-users'|| paths === '/strips') {
        setIsOpen(false);
    }
   }, [paths]);
    
  return (
    <div className="mobile-sidebar wrapper">
        <header>
            <Link to='/'>
            <img src={logo} alt="logo" className="size-[30px]" />
            <h1>Tourvisto</h1>
            </Link>
            <button>
                <img src={menu} alt="menu" className="size-7" onClick={() => setIsOpen(prev => !prev)}/>
            </button>

        </header>
        {isOpen && <SidebarComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            {isOpen && <NavItems />}
        </SidebarComponent>}
      
    </div>
  )
}

export default MobileSidebar
