import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to="/" className="logo">
          CourseEra
        </Link>
        <div className="btn-group">
          <Link to="/login" className="btn-header">
            Login
          </Link>
          <Link to="/signup" className="btn-header">
            Sign-Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
