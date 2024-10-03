import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CourseEdit = () => {
  const { cid } = useParams();

  const [id, idset] = useState("");
  const [name, namechange] = useState("");
  const [duration, durationchange] = useState("");
  const [mode, modechange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/courses/" + cid)
      .then((response) => response.json())
      .then((data) => {
        idset(data.id);
        namechange(data.name);
        durationchange(data.duration);
        modechange(data.mode);
      })
      .catch((err) => {
        console.log("Error fetching user: ", err.message);
      });
  }, [cid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const course = { id, name, duration, mode };

    fetch(`http://localhost:5000/courses/` + cid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    })
      .then((res) => {
        window.alert("Saved Successfully");
        navigate("/courselist");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      {" "}
      <h5 style={{ textAlign: "center", fontSize: "3em" }}> Edit courses</h5>
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

export default CourseEdit;
