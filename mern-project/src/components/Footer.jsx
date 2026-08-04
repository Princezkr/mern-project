import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <div className="footer-box">
        <div><h2>OTHER LINKS</h2><div className="footer-items"><Link to="/about">About ODRA</Link><Link to="/Gallery">Cultural Activities</Link><Link to="/Notices">Latest Notices</Link><a href="mailto:info@college.edu?subject=FAQ">FAQs</a></div></div>
        <div><h2>STUDENT SERVICES</h2><div className="footer-items"><Link to="/Students">Student Corner</Link><Link to="/Students">Timetable</Link><a href="mailto:info@college.edu?subject=Hostel%20enquiry">Hostel</a><a href="mailto:info@college.edu?subject=Campus%20services">Campus Services</a></div></div>
        <div><h2>ACADEMIC INFO</h2><div className="footer-items"><Link to="/AdmissonForm">Admission Procedure</Link><Link to="/courses">Courses Offered</Link><Link to="/Faculty">Faculty Directory</Link></div></div>
        <div><h2>CONTACT US</h2><div className="footer-contact"><p>Village Ramnagar, PO: Balasore,<br />Near Old Bus Stand, Balasore,<br />Odisha-756001</p><p><a href="tel:+919876543210">+91 98765 43210</a></p><p><a href="mailto:info@college.edu">info@college.edu</a></p></div></div>
      </div>
      <hr />
      <p>© 2026 College Website. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
