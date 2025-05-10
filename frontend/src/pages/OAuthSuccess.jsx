import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";

const OAuth2Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role");
    const email = params.get("email");

    if (!token || !role || !email) {
      navigate("/login");
      return;
    }

    // Store token and user info
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({
      email: email,
      role: role
    }));

    const fetchProfile = async () => {
      try {
        const res = await api.get("/customer/profile");
        const user = res.data;
        
        // Update stored user info with complete profile
        localStorage.setItem("user", JSON.stringify({
          accountId: user.accountId,
          username: user.username,
          email: user.email,
          role: user.role
        }));

        if (user.phoneNumber == null || user.phoneNumber === "") {
          navigate("/profile");
        } else {
          if (role === "ADMIN") {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        }
      } catch (err) {
        console.error("OAuth fetch profile error:", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-600">Logging you in via Google...</p>
    </div>
  );
};

export default OAuth2Success;
