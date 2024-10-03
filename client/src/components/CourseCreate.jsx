import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CourseCreate = () => {
  const [id, idchange] = useState();
  const [name, namechange] = useState("");
  const [duration, durationchange] = useState("");
  const [mode, modechange] = useState("");
  const navigate = useNavigate();

  // Fetch existing users and set the next available ID
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => {
        const maxId = data.reduce((acc, curr) => Math.max(acc, curr.id), 0);
        idchange(maxId + 1);
      })
      .catch((err) => {
        console.log("Error fetching users: ", err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id, name, duration, mode }; // Create user object with dynamic ID

    // Save the new user
    fetch("http://localhost:5000/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        window.alert("Saved Successfully");
        navigate("/courselist"); // Redirect to home or users list
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error saving user: ", err.message);
      });
  };
  return (
    <div>
      <h5 style={{ textAlign: "center", fontSize: "3em" }}> Create courses</h5>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputBox">
          <input value={id} disabled />
        </div>
        <div className="inputBox">
          <input
            value={name}
            placeholder="Course Name"
            onChange={(e) => namechange(e.target.value)}
          />
        </div>
        <div className="inputBox">
          <input
            value={duration}
            placeholder="Course Duration"
            onChange={(e) => durationchange(e.target.value)}
          />
        </div>
        <div className="inputBox">
          <input
            value={mode}
            placeholder="Course Mode"
            onChange={(e) => modechange(e.target.value)}
          />
        </div>
        <div className="inputBox" style={{ marginTop: "1em" }}>
          <button type="submit" className="btn green">
            Save
          </button>
          <button className="btn red">
            <Link to="/courselist" className="bck-btn">
              Back
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreate;
