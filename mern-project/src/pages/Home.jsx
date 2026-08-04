import"../styles/Home.css";
import collegeBuilding from "../assets/collegeBuilding.jpg";
function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to ABC College</h1>
          <p>Empowering Students, Through Quality Education</p>
          <span>
            Providing modern education system, experienced faculty and a
            better learning experience for students.
          </span>
        </div>
      </section>
      <section className="campus-section">
        <h2>Campus Highlights</h2>
        <p>Modern labs, library, sports complex, and more.</p>
      </section>
      <section className="about">
        <div className="about-image">
          <img src={collegeBuilding} alt="College Building" />
        </div>
        <div className="about-content">
          <h2>About Our College</h2>
          <p>
            Welcome to Oxford Engineering College. We are committed to
            providing quality education with modern facilities, experienced
            faculty, and excellent placement opportunities.
          </p>
          <button>Read More</button>
        </div>
      </section>
    </div>
  );
}

export default Home;