import { useState } from "react";

function Signup({setFormNeeded}:  {
  setFormNeeded: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) {


   function handleToggle() {
        setFormNeeded(true);
    }


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
    joinedAt: "",
  });


  async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("joinedAt", formData.joinedAt);
    data.append("imageUrl", formData.imageUrl);
    const response = await fetch(
      "http://localhost:3001/auths/signup",
      {
        method: "POST",
        headers: {
      "Content-Type": "application/json",
    },
        body: JSON.stringify({...formData})
      }
    );

    const result = await response.json();

    console.log(result);

    if (response.ok) {
      handleToggle();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
         className='input'
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      className='input'
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
          className='input'
      />
      <input
        type="date"
        placeholder="Date"
        onChange={(e) =>
          setFormData({
            ...formData,
            joinedAt: e.target.value,
          })
        }
          className='input'
      />
<input
  id="profileImage"
  type="input"
  className='input'
  placeholder="ImageUrl"
  onChange={(
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
      setFormData({
       ...formData,
      imageUrl: e.target.value
      });
  }}
/>
<span className="flex flex-col">
     <button type="submit" className="bg-blue-500 h-[48px] flex justify-center mt-1 p-3 cursor-pointer rounded-lg text-white">
        Sign Up
      </button>

      <p className="text-center mt-5 text-gray-100" onClick={handleToggle}>
        already have an account?
          <span className="ml-2 text-blue-500 font-semibold">

           Sign Up
          </span>
        </p>

     </span>
</form>
  );
}


export default Signup;