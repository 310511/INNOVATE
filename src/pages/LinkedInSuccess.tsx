// src/pages/LinkedInSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LinkedInSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    const userString = url.searchParams.get("user");

    if (token && userString) {
      const user = JSON.parse(userString);

      localStorage.setItem("token", token);
      localStorage.setItem("usr", user.id || user.user_id);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Logging you in...</p>
    </div>
  );
};

export default LinkedInSuccess;
