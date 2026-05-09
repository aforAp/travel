import { redirect } from "react-router";

export const loginWithGoogle = async () => {
    try {
        window.location.href = 'http://localhost:3001/auth/google';

    } catch(e) {
        console.log(e);
    }
}


export const logoutUser = async () => {
   try {
    localStorage.removeItem("token");

    window.location.href = "/login";
  }
   catch(e) {
        console.log(e);
    }
}


export const getUser = async () => {
    try {
       const token = localStorage.getItem("token");
       const response = await fetch(
      "http://localhost:3001/auth/me",
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if(!data) return redirect('/sign-in');

    return data;
    } catch(e) {
        console.log(e);
    }
}


export const getGooglePicture = async () => {
    try {
    const user = await getUser();

    return user.imageUrl;
  } catch (e) {
    console.log(e);
  }
}


export const storeUserData = async () => {
    try {
       
const user = await getUser();

localStorage.setItem(
  "user",
  JSON.stringify(user)
);
    } catch(e) {
        console.log(e);
    }
}

export const getExistingUser = async () => {
    try {
       const token = localStorage.getItem('token');

       const response = await fetch('http://localhost:3001/auth/existing-user', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
       })
const data = await response.json();
return data;
    } catch(e) {
        console.log(e);
    }
}