import { useLocation } from "react-router-dom";
import Logout from "./Logout";
import axios from "axios";
import { useEffect, useState } from "react";

const CourseList = () => {
  const location = useLocation();
  const user = location.state;

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("");
  const [uname, setUName] = useState("");
  const [uduration, setUDuration] = useState("");
  const [umode, setUMode] = useState("");
  const [editId, setEditId] = useState(-1);

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const c_id = data.length + 1;
    axios
      .post("http://localhost:3000/courses", {
        id: c_id,
        name,
        duration,
        mode,
      })
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    axios
      .get("http://localhost:3000/courses/" + id)
      .then((response) => {
        setUName(response.data.name);
        setUDuration(response.data.duration);
        setUMode(response.data.mode);
      })
      .catch((error) => {
        console.log(error);
      });
    setEditId(id);
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/courses/" + editId, {
        id: editId,
        name: uname,
        duration: uduration,
        mode: umode,
      })
      .then((result) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/courses/" + id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="course-list">
      <div className="course-title">
        <h2 style={{ textTransform: "capitalize" }}>
          {" "}
          Welcome {user?.name ? user.name : "No user data available"}
          <Logout />
        </h2>
      </div>

      <div className="container-form">
        <form action="" className="formCourse" onSubmit={handleFormSubmit}>
          <div className="input-Box">
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Course Name"
            />
          </div>
          <div className="input-Box">
            <input
              type="text"
              name="duration"
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter Duration"
            />
          </div>
          <div className="input-Box">
            <input
              type="text"
              name="mode"
              onChange={(e) => setMode(e.target.value)}
              placeholder="Enter Course Mode"
            />
          </div>
          <div className="input-Box">
            <button className="add_btn" type="submit">
              Add
            </button>
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) =>
              course.id === editId ? (
                <tr key={course?.id}>
                  <td>
                    <input
                      type="text"
                      value={uname}
                      onChange={(e) => setUName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={uduration}
                      onChange={(e) => setUDuration(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={umode}
                      onChange={(e) => setUMode(e.target.value)}
                    />
                  </td>
                  <td className="update">
                    <button onClick={handleUpdate} className="add_btn">
                      Update
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={course?.id}>
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
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
