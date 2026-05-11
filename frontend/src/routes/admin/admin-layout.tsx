import { Outlet, redirect } from "react-router";
import { MobileSidebar, NavItems } from "../../components";

export async function clientLoader() {

    const token = localStorage.getItem("token");
    if(!token) {
       redirect('/forms');
    }
  try {
    const res = await fetch('http://localhost:3001/auths/me', {
      method: 'GET',
       headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return redirect('/forms');
  }

  const user = await res.json();

  // block non-admin users
  if (user.status !== "admin") {
    return redirect('/forms');
  }

  return user;
}

catch(err) {
  console.log(err);
}
}
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

