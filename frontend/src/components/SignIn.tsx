import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignInForm = ({setFormNeeded}) => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

    function handleToggle() {
        setFormNeeded(false);
    }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/auths/signin",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        localStorage.setItem(
          "token",
          data.token
        );

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <article className="mb-6">
        <h2 className="p-28-semibold text-dark-100 text-center">
          Welcome Back
        </h2>

        <p className="p-18-regular text-center text-gray-100 mt-2">
          Sign in to continue your journey
        </p>
      </article>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="border border-gray-300 rounded-xl p-3 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          className="border border-gray-300 rounded-xl p-3 outline-none"
        />

        <button
          type="submit"
          className="button-class !h-11 !w-full"
        >
          <span className="p-18-semibold text-white">
            Sign In
          </span>
        </button>
      </form>

      <p className="text-center mt-5 text-gray-100" onClick={handleToggle}>
        Don’t have an account?

        <span
          className="ml-2 text-blue-500 font-semibold">
          Sign Up
        </span>
      </p>
    </>
  );
};

export default SignInForm;