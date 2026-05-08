import { Outlet } from "react-router";
import { MobileSidebar, NavItems } from "../../components";

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      <span className="lg:hidden block">
       <MobileSidebar />
      </span>
       <aside className="w-full max-w-[270px] hidden lg:block">
        <span>
          <NavItems />
        </span>
       </aside>
       <aside className="children">
        <Outlet />
       </aside>
    </div>
  )
}

export default AdminLayout;

