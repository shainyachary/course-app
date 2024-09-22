import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post("http://localhost:9998/logout/", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <button onClick={handleLogout} className="logout">
      Logout
    </button>
  );
};

export default Logout;
