import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";

const OAuth2Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get("role");
    const email = params.get("email");

    const fetchProfile = async () => {
      try {
        const res = await api.get("/customer/profile", { withCredentials: true });
        const user = res.data;
        localStorage.setItem("user", JSON.stringify({
          accountId: user.accountId,
          username: user.username,
          email: user.email,
          role: user.role
        }));

        if (user.phoneNumber == null || user.phoneNumber === "") {
          // Redirect to profile completion screen (optional)
          navigate("/profile");
        } else {
          // Redirect based on role
          if (role === "ADMIN") {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        }
      } catch (err) {
        console.error("OAuth fetch profile error:", err);
        navigate("/login"); // fallback
      }
    };

    if (role && email) {
      fetchProfile();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-600">Logging you in via Google...</p>
    </div>
  );
};

export default OAuth2Success;
