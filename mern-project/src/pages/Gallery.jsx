import "../styles/Gallery.css";

const photos = [
  { src: "/src/assets/Gallery1.jpg", alt: "gallery1" },
  { src: "/src/assets/Gallery2.jpg", alt: "gallery2" },
  { src: "/src/assets/Gallery3.jpg", alt: "gallery3" }
];

const videos = [
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/Ez8F0nW6S-w"
];

const events = [
  { img: "/src/assets/Tech-Fest.jpg", title: "Tech Fest" },
  { img: "/src/assets/Cultural-Fest.jpg", title: "Cultural Fest" }
];

function Gallery() {
  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div>
          <p className="eyebrow">Campus Highlights</p>
          <h1>Explore the vibrant life of our college.</h1>
          <p>
            A polished view of our featured photos, event moments, and student experiences.
          </p>
        </div>
        <div className="hero-badges">
          <span>📷 Photos</span>
          <span>🎥 Videos</span>
          <span>🎉 Events</span>
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <div>
            <h2>Featured Photos</h2>
            <p>Moments captured around campus.</p>
          </div>
        </div>
        <div className="photo-grid">
          {photos.map((item, i) => (
            <div key={i} className="photo-card">
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <div>
            <h2>Featured Videos</h2>
            <p>Short glimpses from campus life and events.</p>
          </div>
        </div>
        <div className="video-grid">
          {videos.map((link, i) => (
            <iframe
              key={i}
              src={link}
              title={`video-${i + 1}`}
              allowFullScreen
              loading="lazy"
            ></iframe>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <div>
            <h2>Events Gallery</h2>
            <p>Highlights from our most exciting celebrations.</p>
          </div>
        </div>
        <div className="event-grid">
          {events.map((item, i) => (
            <div key={i} className="event-card">
              <img src={item.img} alt={item.title} loading="lazy" />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Gallery;