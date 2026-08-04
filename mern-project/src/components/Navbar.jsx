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
    <nav class="Navbar">
      <Link to="/" className="navbar-logo" aria-label="Home">
        <img src={collegeLogo} alt="College logo" />
      </Link>

      <div>
        <Link to="/" class="Link">Home</Link>
        <Link to="/about" class="Link">About</Link>
        <Link to="/courses" class="Link">Courses</Link>
        <Link to="/AdmissonForm" class="Link">Admissions</Link>
        <Link to="/Notices" class="Link">Notices</Link>
        <Link to="/Gallery" class="Link">Gallery</Link>
      </div>
      <div class="Icons">
        <a href="https://www.facebook.com/"><img src={facebookIcon} alt="Facebook" /></a>
        <a href="https://x.com/"><img src={twitterIcon} alt="Twitter"/></a>
        <a href="https://in.linkedin.com/"><img src={linkedinIcon} alt="Linkedin"/></a>
        <a href="https://www.instagram.com/?hl=en"><img src={instagramIcon} alt="Instagram"/></a>
        <a href="https://www.youtube.com/"><img src={youtubeIcon} alt="Youtube"/></a>
      </div>
     </nav>
  );
}
//The Links Are just connected to their official pages and not to admin's account 
export default Navbar;
