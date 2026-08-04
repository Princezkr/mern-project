import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "15px", background:"red", color: "#fff" }}>
      <h2>Odra Institute of Technology</h2>
    
      <div>
        <Link to="/" style={{ margin: "10px", color: "#fff" }}>Home</Link>
        <Link to="/about" style={{ margin: "10px", color: "#fff" }}>About</Link>
        <Link to="/courses" style={{ margin: "10px", color: "#fff" }}>Courses</Link>
      </div>
     </nav>
  );
}

export default Navbar;