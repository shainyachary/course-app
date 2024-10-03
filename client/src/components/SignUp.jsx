import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9998/signup/", { name, email, password })
      .then((result) => {
        if (result.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          window.alert("Email already exists");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="signup">
      <h2>Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-Box">
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="input-Box">
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="input-Box">
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="input-Box">
          <button className="btn" type="submit">
            Sign-Up
          </button>
        </div>
        <div className="link">
          Already have an account?{" "}
          <Link to="/login" className="link-btn1">
            Login
          </Link>
          here
        </div>
      </form>
    </div>
  );
};

export default SignUp;
