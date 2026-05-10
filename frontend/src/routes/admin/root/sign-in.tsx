
import { useState } from "react";
import { Link, Outlet} from "react-router";
import Signup from "../../../components/SignUp";
import SignInForm from "../../../components/SignIn";
const SignIn = () => {

  const [formNeeded, setFormNeeded] = useState(true);
 
  return (
    <main className="auth">
        <section className="size-full glassmorphism flex-center px-6">
          <div className="sign-in-card">
           <header className="header">
              <Link to='/'>
              <img src="/icons/logo.svg" alt="logo" className="size-[30px]"/>
              </Link>
              <h1 className="p-28-bold text-dark-100">Tourvist</h1>
            </header>
           <article>
              <h2 className="p-28-semibold text-dark-100 text-center">Start Your Travel Journey</h2>
               
          </article>
         {formNeeded ? <SignInForm setFormNeeded={setFormNeeded} /> : <Signup setFormNeeded={setFormNeeded} />}
        </div>

        </section>
        <Outlet />
    </main>
  )
}

export default SignIn;
