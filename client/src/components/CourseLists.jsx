import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom";

const CourseLists = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleEdit = (id) => {
    navigate("/course/edit/" + id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course")) {
      fetch("http://localhost:5000/courses/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Deleted");
          window.location.reload();
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="course-list">
      <div className="course-title">
        <h2 style={{ textTransform: "capitalize" }}>
          {" "}
          Welcome back
          <Logout />
        </h2>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <button className="add-btn">
          <Link to="/course/create" className="link-btn">
            Add +
          </Link>
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{course?.name}</td>
                <td>{course?.duration}</td>
                <td>{course?.mode}</td>
                <td>
                  <button
                    className="add_btn"
                    onClick={() => handleEdit(course?.id)}
                  >
                    edit
                  </button>
                  <button
                    className="add_btn"
                    onClick={() => handleDelete(course?.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseLists;
