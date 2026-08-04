import { Link } from "react-router-dom";
import facebookIcon from "../assets/Facebook.png";
import twitterIcon from "../assets/Twitter.png";
import linkedinIcon from "../assets/Linkedin.png";
import instagramIcon from "../assets/Instagram.png";
import youtubeIcon from "../assets/Youtube.png";
import collegeLogo from "../assets/Logo.jpeg";
import "../styles/Navbar.css"

function Navbar() {
  return (
    <nav className="Navbar">
      <Link to="/" className="navbar-logo" aria-label="Home">
        <img src={collegeLogo} alt="College logo" />
      </Link>

      <div>
        <Link to="/" className="Link">Home</Link>
        <Link to="/about" className="Link">About</Link>
        <Link to="/courses" className="Link">Courses</Link>
        <Link to="/AdmissonForm" className="Link">Admissions</Link>
        <Link to="/Notices" className="Link">Notices</Link>
        <Link to="/Gallery" className="Link">Gallery</Link>
      </div>
      <div className="Icons">
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><img src={facebookIcon} alt="Facebook" /></a>
        <a href="https://x.com/" target="_blank" rel="noreferrer"><img src={twitterIcon} alt="X"/></a>
        <a href="https://in.linkedin.com/" target="_blank" rel="noreferrer"><img src={linkedinIcon} alt="LinkedIn"/></a>
        <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noreferrer"><img src={instagramIcon} alt="Instagram"/></a>
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><img src={youtubeIcon} alt="YouTube"/></a>
      </div>
     </nav>
  );
}
//The Links Are just connected to their official pages and not to admin's account 
export default Navbar;
