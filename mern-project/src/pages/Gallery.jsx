import { useEffect, useState } from "react";
import { API_BASE_URL, getMediaUrl } from "../utils/api";
import "../styles/Gallery.css";
import techFest from "../assets/Tech-Fest.jpg";
import culturalFest from "../assets/Cultural-Fest.jpg";
const videos = ["https://www.youtube.com/embed/dQw4w9WgXcQ", "https://www.youtube.com/embed/Ez8F0nW6S-w"];
const events = [{ img: techFest, title: "Tech Fest" }, { img: culturalFest, title: "Cultural Fest" }];

function Gallery() {
  const [adminItems, setAdminItems] = useState([]);
  useEffect(() => { fetch(`${API_BASE_URL}/gallery`).then((response) => response.ok ? response.json() : []).then((items) => setAdminItems(Array.isArray(items) ? items : [])).catch(() => {}); }, []);
  const adminPhotos = adminItems.filter((item) => item.type === "image");
  const adminVideos = adminItems.filter((item) => item.type === "video");
  return <div className="gallery-page"><section className="gallery-hero"><div><p className="eyebrow">Campus Highlights</p><h1>Explore the vibrant life of our college.</h1><p>A polished view of our featured photos, event moments, and student experiences.</p></div><div className="hero-badges"><span>📷 Photos</span><span>🎥 Videos</span><span>🎉 Events</span></div></section><section className="gallery-section"><div className="section-heading"><div><h2>Featured Photos</h2><p>Moments captured around campus.</p></div></div><div className="photo-grid">{adminPhotos.map((item) => <figure key={item._id} className="photo-card"><img src={getMediaUrl(item.src)} alt={item.title} loading="lazy" /><figcaption>{item.title}{item.description && ` — ${item.description}`}</figcaption></figure>)}</div></section><section className="gallery-section"><div className="section-heading"><div><h2>Featured Videos</h2><p>Short glimpses from campus life and events.</p></div></div><div className="video-grid">{adminVideos.map((item) => <iframe key={item._id} src={item.src} title={item.title} allowFullScreen loading="lazy" />)}{videos.map((link, i) => <iframe key={link} src={link} title={`video-${i + 1}`} allowFullScreen loading="lazy" />)}</div></section><section className="gallery-section"><div className="section-heading"><div><h2>Events Gallery</h2><p>Highlights from our most exciting celebrations.</p></div></div><div className="event-grid">{events.map((item) => <div key={item.title} className="event-card"><img src={item.img} alt={item.title} loading="lazy" /><p>{item.title}</p></div>)}</div></section></div>;
}
export default Gallery;
