import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:9998/login/",
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 200) {
          axios
            .get("http://localhost:9998/user/", { withCredentials: true })
            .then((response) => {
              if (response.data.user) {
                navigate("/courselist", { state: response.data.user });
              } else {
                alert("User not authenticated");
              }
            })
            .catch((err) => console.log("Error fetching user:", err));
        } else {
          alert("User does not exist");
        }
      })
      .catch((err) => {
        console.log("Login failed:", err);
        alert("Invalid email or password");
      });
  };

  return (
    <div className="signup">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-Box">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="input-Box">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="input-Box">
          <button className="btn" type="submit">
            Login
          </button>
        </div>
        <div className="link">
          New User?{" "}
          <Link to="/signup" className="link-btn1">
            Register
          </Link>{" "}
          here
        </div>
      </form>
    </div>
  );
};

export default Login;
