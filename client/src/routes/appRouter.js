import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Home from "../pages/Home";
import CourseLists from "../components/CourseLists";
import CourseEdit from "../components/CourseEdit";
import CourseCreate from "../components/CourseCreate";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/courselist",
        element: <CourseLists />,
      },
      {
        path: "/course/edit/:cid",
        element: <CourseEdit />,
      },
      {
        path: "/course/create",
        element: <CourseCreate />,
      },
    ],
  },
]);
