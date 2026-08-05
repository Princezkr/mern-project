import"../styles/Home.css";
import collegeBuilding from "../assets/collegeBuilding.jpg";
import principal from "../assets/principal.jpg";
import library from "../assets/library.jpg";
import lab from "../assets/lab.jpg";
import sports from "../assets/sports.jpg";
import hostel from "../assets/hostel.jpg";
function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to Odra Institute of Technology</h1>
          <p>Empowering Students, Through Quality Education</p>
          <span>
            Providing modern education system, experienced faculty and a
            better learning experience for students.
          </span>
        </div>
      </section>
      <section className="about">
        <div className="about-image">
          <img src={collegeBuilding} alt="College Building" />
        </div>
        <div className="about-content">
          <h2>About Our College</h2>
          <p>
            Welcome to Odra institute of technology. We are committed to
            providing quality education with modern facilities, experienced
            faculty, and excellent placement opportunities.
          </p>
          <button>Read More</button>
        </div>
      </section>
      <section className="principal">
        <div className="principal-image">
          <img src={principal} alt="Principal" />          
        </div>
        <div className="principal-content">
          <h2>Principal's Message</h2>
          <h3>Dr. Kumar</h3>
          <p>Welcome to Odra Institute of Technology. Our goal is to provide
            quality education,encourage innovation,and prepare students for a successful future.
          </p>
          <button className="principal-button">Know more</button>
      </div>
      </section>
      <section className="vision-mission">
        <h2 className="section-title">Vision and Mission</h2>
        <div className="vision-container">
          <div className="vision-card">
            <h3>Our Vision</h3>
            <p>To provide quality education, promote research and development, and create an environment that nurtures the holistic growth of students.</p>
          </div>
          <div className="vision-card">
            <h3>Our Mission</h3>
            <p>To provide quality education, promote research and development, and create an environment that nurtures the holistic growth of students.</p>
          </div>
        </div>
      </section>
      <section className="campus-section">
        <h2>Campus Highlights</h2>
        <p className="campus-subtitle">
           Modern facilities designed to provide the best learning experience.
        </p>
        <div className="campus-container">
          <div className="campus-card">
            <img src={library} alt="Library" />
            <h3>Library</h3>
            <p>Our library is equipped with a vast collection of books, journals, and digital resources to support students' academic needs.</p>
        </div>
        <div className="campus-card">
          <img src={lab} alt="Computer Lab" />
          <h3>Computer Lab</h3>
          <p>Modern computer labs with high-speed internet and the latest software.</p>
        </div>
       <div className="campus-card">
         <img src={sports} alt="Sports" />  
      <h3> Sports</h3>
      <p>Indoor and outdoor sports facilities for students.</p>
    </div>
    <div className="campus-card">
      <img src={hostel} alt="Hostel" /> 
      <h3>Hostel Facility</h3>
      <p>Safe hostel with Wi-Fi, security, and healthy food.</p>
    </div>
   </div>
    </section>
    </div>
    
  );
}
export default Home;