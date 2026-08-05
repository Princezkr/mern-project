import { useState } from "react";
import "../styles/Contact.css";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Thanks for reaching out. Our team will get back to you soon.");
    setForm(initialForm);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <p className="contact-eyebrow">Get in touch</p>
        <h1 id="contact-title">We would love to hear from you.</h1>
        <p>Whether you have a question about admissions, academics, or campus life, our team is ready to help.</p>
      </section>

      <section className="contact-methods" aria-label="Contact methods">
        <a className="contact-method" href="tel:+919876543210"><span className="contact-icon blue" aria-hidden="true">☎</span><span><strong>Call us</strong><small>+91 98765 43210</small></span></a>
        <a className="contact-method" href="mailto:info@college.edu"><span className="contact-icon violet" aria-hidden="true">✉</span><span><strong>Email us</strong><small>info@college.edu</small></span></a>
        <div className="contact-method"><span className="contact-icon orange" aria-hidden="true">◷</span><span><strong>Office hours</strong><small>Mon – Fri · 9 AM – 5 PM</small></span></div>
      </section>

      <section className="contact-layout">
        <div className="contact-form-card">
          <div className="contact-section-heading"><p className="contact-eyebrow">Send a message</p><h2>How can we help?</h2><p>Fill in the form and our team will respond as soon as possible.</p></div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <label>Full name<input name="name" value={form.name} onChange={handleChange} placeholder="Your name" autoComplete="name" required /></label>
              <label>Email address<input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required /></label>
            </div>
            <div className="contact-form-row">
              <label>Phone number<input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" autoComplete="tel" /></label>
              <label>Subject<input name="subject" value={form.subject} onChange={handleChange} placeholder="What is this about?" required /></label>
            </div>
            <label>Your message<textarea name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Tell us how we can help…" required /></label>
            <button type="submit">Send message <span aria-hidden="true">→</span></button>
            {status && <p className="contact-status" role="status">{status}</p>}
          </form>
        </div>

        <aside className="contact-details">
          <div className="contact-address"><p className="contact-eyebrow">Visit campus</p><h2>ODRA Institute of Technology</h2><p>Village Ramnagar, PO: Balasore,<br />Near Old Bus Stand, Balasore,<br />Odisha – 756001</p><a href="https://www.google.com/maps?q=Balasore,Odisha" target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a></div>
          <iframe src="https://www.google.com/maps?q=Balasore,Odisha&output=embed" title="Map showing Balasore, Odisha" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </aside>
      </section>
    </main>
  );
}

export default Contact;
