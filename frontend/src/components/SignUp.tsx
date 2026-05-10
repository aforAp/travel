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
    joinedAt: "",
  });

  const [profileImage, setProfileImage] =
    useState<File | null>(null);

  async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("joinedAt", formData.joinedAt);
if(profileImage){

    data.append(
      "profileImage",
      profileImage
    );
}
    const response = await fetch(
      "http://localhost:3001/auths/signup",
      {
        method: "POST",
        body: data,
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
<label
  htmlFor="profileImage"
  className="bg-green-500 h-[48px] flex justify-center mt-1 p-3 cursor-pointer rounded-lg text-white"
>
  Upload File
</label>

<input
  id="profileImage"
  type="file"
  className="hidden"
  onChange={(
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setProfileImage(
        e.target.files[0]
      );
    }
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