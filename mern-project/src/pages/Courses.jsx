import "../styles/Courses.css";
import btech from "../assets/btech.jpg";
import bca from "../assets/bca.jpg";
import mca from "../assets/mca.jpg";
import mba from "../assets/mba.jpg";
function Courses() {
  return (
   <section className="courses-section">
    <h2>Our Courses</h2>
    <p className="courses-subtitle">We offer UG and PG courses in various fields.</p>
  <div className="courses-container">
    <div className="course-card">
      <h3>B.Tech</h3>
      <img src={btech} alt="b.tech" /> 
      <p><strong>Duration:</strong> 4 Years</p>
      <p><strong>Eligibility:</strong> 10+2 with Physics, Chemistry, and Mathematics</p>
    </div>
    <div className="course-card">
          <h3>BCA</h3>
          <img src={bca} alt="bca" /> 
          <p><strong>Duration:</strong> 3 Years</p>
          <p><strong>Eligibility:</strong> 10+2 Pass</p>
        </div>
        <div className="course-card">
          <h3>MCA</h3>
          <img src={mca} alt="mca" /> 
          <p><strong>Duration:</strong> 2 Years</p>
          <p><strong>Eligibility:</strong> Graduation</p>
        </div>
         <div className="course-card">
          <h3>MBA</h3>
          <img src={mba} alt="mba" /> 
          <p><strong>Duration:</strong> 2 Years</p>
          <p><strong>Eligibility:</strong> Graduation</p>
        </div>
      </div>
  </section>
  );
}

export default Courses;