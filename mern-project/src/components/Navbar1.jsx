import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar1() {
  return (
    <nav className="Navbar1">
      <div>
        <Link to="/Faculty" className="Link1">Faculty</Link>
        <Link to="/Students" className="Link1">Students</Link>
        <Link to="/Contact" className="Link1">Contact us</Link>
      </div>
      <div className="Icons">
        <Link to="/admin/login" className="Link">Log in</Link>
      </div>
    </nav>
  );
}

export default Navbar1;
