import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    async function LoginConfirm() {
      const params = new URLSearchParams(
        window.location.search
      );

      const token = params.get("token");

      if (!token) {
        return;
      }

      localStorage.setItem("token", token);

      console.log(token);

      const response = await fetch(
        "http://localhost:3001/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        navigate("/");
      }
    }

    LoginConfirm();
  }, [navigate]);

  return <h1>Logging in...</h1>;
}

export default OAuthSuccess;