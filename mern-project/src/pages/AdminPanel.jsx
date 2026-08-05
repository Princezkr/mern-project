import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, clearAuthToken, getAuthHeaders, isAdminLoggedIn } from "../utils/api";
import "../styles/Admin.css";

const defaultCourse = { title: "", department: "", description: "", duration: "" };
const defaultFaculty = { name: "", department: "", designation: "", email: "" };
const defaultNotice = { title: "", date: "", content: "", tag: "" };
const defaultGalleryItem = { title: "", src: "", type: "image", description: "" };

function AdminPanel() {
  const navigate = useNavigate();
  const [section, setSection] = useState("faculty");
  const [status, setStatus] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState(defaultCourse);
  const [courseEditId, setCourseEditId] = useState(null);

  const [faculty, setFaculty] = useState([]);
  const [facultyForm, setFacultyForm] = useState(defaultFaculty);
  const [facultyEditId, setFacultyEditId] = useState(null);

  const [notices, setNotices] = useState([]);
  const [noticeForm, setNoticeForm] = useState(defaultNotice);
  const [noticeEditId, setNoticeEditId] = useState(null);

  const [gallery, setGallery] = useState([]);
  const [galleryForm, setGalleryForm] = useState(defaultGalleryItem);
  const [galleryEditId, setGalleryEditId] = useState(null);

  const [admissions, setAdmissions] = useState([]);

  const authHeaders = getAuthHeaders();

  const setMessage = (text, type = "success") => setStatus({ text, type });
  const clearMessage = () => setStatus({ text: "", type: "" });

  async function fetchCourses() {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/courses`, { headers: authHeaders });
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Unable to load courses.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchFaculty() {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/faculty`, { headers: authHeaders });
      const data = await response.json();
      setFaculty(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Unable to load faculty records.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchNotices() {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/notices`, { headers: authHeaders });
      const data = await response.json();
      setNotices(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Unable to load notices.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchGallery() {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`, { headers: authHeaders });
      const data = await response.json();
      setGallery(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Unable to load gallery items.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchAdmissions() {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admissions`, { headers: authHeaders });
      const data = await response.json();
      setAdmissions(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Unable to load admissions.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadSection(key) {
    clearMessage();
    switch (key) {
      case "courses":
        await fetchCourses();
        break;
      case "faculty":
        await fetchFaculty();
        break;
      case "notices":
        await fetchNotices();
        break;
      case "gallery":
        await fetchGallery();
        break;
      case "admissions":
        await fetchAdmissions();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin/login");
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    void loadSection(section);
  }, [navigate, section]);

  const handleSectionClick = (key) => {
    setSection(key);
    setCourseEditId(null);
    setFacultyEditId(null);
    setNoticeEditId(null);
    setGalleryEditId(null);
    setCourseForm(defaultCourse);
    setFacultyForm(defaultFaculty);
    setNoticeForm(defaultNotice);
    setGalleryForm(defaultGalleryItem);
  };

  const handleLogout = () => {
    clearAuthToken();
    navigate("/admin/login");
  };

  const handleCourseChange = (event) => {
    setCourseForm({ ...courseForm, [event.target.name]: event.target.value });
  };

  const handleFacultyChange = (event) => {
    setFacultyForm({ ...facultyForm, [event.target.name]: event.target.value });
  };

  const handleNoticeChange = (event) => {
    setNoticeForm({ ...noticeForm, [event.target.name]: event.target.value });
  };

  const handleGalleryChange = (event) => {
    setGalleryForm({ ...galleryForm, [event.target.name]: event.target.value });
  };

  const handleSaveCourse = async (event) => {
    event.preventDefault();
    clearMessage();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/courses${courseEditId ? `/${courseEditId}` : ""}`, {
        method: courseEditId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify(courseForm),
      });
      if (!response.ok) throw new Error();
      await fetchCourses();
      setCourseForm(defaultCourse);
      setCourseEditId(null);
      setMessage(courseEditId ? "Course updated." : "Course added.");
    } catch {
      setMessage("Failed to save course.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCourse = (item) => {
    setCourseEditId(item._id);
    setCourseForm({ title: item.title || "", department: item.department || "", description: item.description || "", duration: item.duration || "" });
    setMessage(`Editing course: ${item.title}`, "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteCourse = async (item) => {
    if (!window.confirm(`Delete course ${item.title}?`)) return;
    clearMessage();
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${item._id}`, { method: "DELETE", headers: authHeaders });
      if (!response.ok) throw new Error();
      await fetchCourses();
      setMessage("Course deleted.");
    } catch {
      setMessage("Failed to delete course.", "error");
    }
  };

  const handleSaveFaculty = async (event) => {
    event.preventDefault();
    clearMessage();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/faculty${facultyEditId ? `/${facultyEditId}` : ""}`, {
        method: facultyEditId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify(facultyForm),
      });
      if (!response.ok) throw new Error();
      await fetchFaculty();
      setFacultyForm(defaultFaculty);
      setFacultyEditId(null);
      setMessage(facultyEditId ? "Faculty updated." : "Faculty added.");
    } catch {
      setMessage("Failed to save faculty member.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditFaculty = (item) => {
    setFacultyEditId(item._id);
    setFacultyForm({ name: item.name || "", department: item.department || "", designation: item.designation || "", email: item.email || "" });
    setMessage(`Editing ${item.name}`, "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteFaculty = async (item) => {
    if (!window.confirm(`Delete faculty ${item.name}?`)) return;
    clearMessage();
    try {
      const response = await fetch(`${API_BASE_URL}/faculty/${item._id}`, { method: "DELETE", headers: authHeaders });
      if (!response.ok) throw new Error();
      await fetchFaculty();
      setMessage("Faculty record removed.");
    } catch {
      setMessage("Failed to delete faculty.", "error");
    }
  };

  const handleSaveNotice = async (event) => {
    event.preventDefault();
    clearMessage();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/notices${noticeEditId ? `/${noticeEditId}` : ""}`, {
        method: noticeEditId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify(noticeForm),
      });
      if (!response.ok) throw new Error();
      await fetchNotices();
      setNoticeForm(defaultNotice);
      setNoticeEditId(null);
      setMessage(noticeEditId ? "Notice updated." : "Notice added.");
    } catch {
      setMessage("Failed to save notice.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNotice = (item) => {
    setNoticeEditId(item._id);
    setNoticeForm({ title: item.title || "", date: item.date || "", content: item.content || "", tag: item.tag || "" });
    setMessage(`Editing notice: ${item.title}`, "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteNotice = async (item) => {
    if (!window.confirm(`Delete notice ${item.title}?`)) return;
    clearMessage();
    try {
      const response = await fetch(`${API_BASE_URL}/notices/${item._id}`, { method: "DELETE", headers: authHeaders });
      if (!response.ok) throw new Error();
      await fetchNotices();
      setMessage("Notice deleted.");
    } catch {
      setMessage("Failed to delete notice.", "error");
    }
  };

  const handleSaveGallery = async (event) => {
    event.preventDefault();
    clearMessage();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/gallery${galleryEditId ? `/${galleryEditId}` : ""}`, {
        method: galleryEditId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify(galleryForm),
      });
      if (!response.ok) throw new Error();
      await fetchGallery();
      setGalleryForm(defaultGalleryItem);
      setGalleryEditId(null);
      setMessage(galleryEditId ? "Gallery item updated." : "Gallery item added.");
    } catch {
      setMessage("Failed to save gallery item.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditGallery = (item) => {
    setGalleryEditId(item._id);
    setGalleryForm({ title: item.title || "", src: item.src || "", type: item.type || "image", description: item.description || "" });
    setMessage(`Editing gallery item: ${item.title}`, "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteGallery = async (item) => {
    if (!window.confirm(`Delete gallery item ${item.title}?`)) return;
    clearMessage();
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${item._id}`, { method: "DELETE", headers: authHeaders });
      if (!response.ok) throw new Error();
      await fetchGallery();
      setMessage("Gallery item deleted.");
    } catch {
      setMessage("Failed to delete gallery item.", "error");
    }
  };

  const handleAdmissionStatus = async (item, newStatus) => {
    clearMessage();
    try {
      const response = await fetch(`${API_BASE_URL}/admissions/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error();
      await fetchAdmissions();
      setMessage("Admission status updated.");
    } catch {
      setMessage("Failed to update admission.", "error");
    }
  };

  const renderSection = () => {
    if (section === "courses") {
      return (
        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Manage Courses</h2>
            <p>Add, update, or remove course descriptions for your public course catalog.</p>
          </div>
          <form className="admin-form" onSubmit={handleSaveCourse}>
            <label>Course title<input name="title" value={courseForm.title} onChange={handleCourseChange} required /></label>
            <label>Department<input name="department" value={courseForm.department} onChange={handleCourseChange} required /></label>
            <label>Description<textarea name="description" value={courseForm.description} onChange={handleCourseChange} required rows="4" /></label>
            <label>Duration<input name="duration" value={courseForm.duration} onChange={handleCourseChange} placeholder="e.g. 4 years" /></label>
            <div className="admin-form-actions">
              <button type="submit">{courseEditId ? "Update course" : "Add course"}</button>
              {courseEditId && <button type="button" className="secondary-button" onClick={() => { setCourseForm(defaultCourse); setCourseEditId(null); clearMessage(); }}>Cancel</button>}
            </div>
          </form>
          <div className="admin-data-grid">
            {isLoading ? <p>Loading courses…</p> : courses.length ? courses.map((item) => (
              <article key={item._id} className="admin-card">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.department}</p>
                  <p>{item.description}</p>
                  {item.duration && <p><strong>Duration:</strong> {item.duration}</p>}
                </div>
                <div className="admin-card-actions">
                  <button onClick={() => handleEditCourse(item)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteCourse(item)}>Delete</button>
                </div>
              </article>
            )) : <p>No courses found.</p>}
          </div>
        </section>
      );
    }

    if (section === "faculty") {
      return (
        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Manage Faculty</h2>
            <p>Keep your faculty roster up to date with title, department, and contact details.</p>
          </div>
          <form className="admin-form" onSubmit={handleSaveFaculty}>
            <label>Name<input name="name" value={facultyForm.name} onChange={handleFacultyChange} required /></label>
            <label>Department<input name="department" value={facultyForm.department} onChange={handleFacultyChange} required /></label>
            <label>Designation<input name="designation" value={facultyForm.designation} onChange={handleFacultyChange} required /></label>
            <label>Email<input type="email" name="email" value={facultyForm.email} onChange={handleFacultyChange} required /></label>
            <div className="admin-form-actions">
              <button type="submit">{facultyEditId ? "Update faculty" : "Add faculty"}</button>
              {facultyEditId && <button type="button" className="secondary-button" onClick={() => { setFacultyForm(defaultFaculty); setFacultyEditId(null); clearMessage(); }}>Cancel</button>}
            </div>
          </form>
          <div className="admin-data-grid">
            {isLoading ? <p>Loading faculty…</p> : faculty.length ? faculty.map((item) => (
              <article key={item._id} className="admin-card">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.designation}</p>
                  <p>{item.department}</p>
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </div>
                <div className="admin-card-actions">
                  <button onClick={() => handleEditFaculty(item)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteFaculty(item)}>Delete</button>
                </div>
              </article>
            )) : <p>No faculty found.</p>}
          </div>
        </section>
      );
    }

    if (section === "notices") {
      return (
        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Manage Notices</h2>
            <p>Publish announcements, circulars, and updating notices for students and staff.</p>
          </div>
          <form className="admin-form" onSubmit={handleSaveNotice}>
            <label>Title<input name="title" value={noticeForm.title} onChange={handleNoticeChange} required /></label>
            <label>Date<input type="date" name="date" value={noticeForm.date} onChange={handleNoticeChange} required /></label>
            <label>Tag<input name="tag" value={noticeForm.tag} onChange={handleNoticeChange} placeholder="NEW, IMPORTANT, etc." /></label>
            <label>Content<textarea name="content" value={noticeForm.content} onChange={handleNoticeChange} required rows="4" /></label>
            <div className="admin-form-actions">
              <button type="submit">{noticeEditId ? "Update notice" : "Add notice"}</button>
              {noticeEditId && <button type="button" className="secondary-button" onClick={() => { setNoticeForm(defaultNotice); setNoticeEditId(null); clearMessage(); }}>Cancel</button>}
            </div>
          </form>
          <div className="admin-data-grid">
            {isLoading ? <p>Loading notices…</p> : notices.length ? notices.map((item) => (
              <article key={item._id} className="admin-card">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                  {item.tag && <p className="notice-tag">{item.tag}</p>}
                  <p>{item.content}</p>
                </div>
                <div className="admin-card-actions">
                  <button onClick={() => handleEditNotice(item)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteNotice(item)}>Delete</button>
                </div>
              </article>
            )) : <p>No notices found.</p>}
          </div>
        </section>
      );
    }

    if (section === "gallery") {
      return (
        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Manage Gallery</h2>
            <p>Add highlight images and videos that appear on the public gallery page.</p>
          </div>
          <form className="admin-form" onSubmit={handleSaveGallery}>
            <label>Title<input name="title" value={galleryForm.title} onChange={handleGalleryChange} required /></label>
            <label>Media source URL<input name="src" value={galleryForm.src} onChange={handleGalleryChange} required placeholder="Image or video URL" /></label>
            <label>Type<select name="type" value={galleryForm.type} onChange={handleGalleryChange}><option value="image">Image</option><option value="video">Video</option></select></label>
            <label>Description<textarea name="description" value={galleryForm.description} onChange={handleGalleryChange} rows="3" /></label>
            <div className="admin-form-actions">
              <button type="submit">{galleryEditId ? "Update item" : "Add item"}</button>
              {galleryEditId && <button type="button" className="secondary-button" onClick={() => { setGalleryForm(defaultGalleryItem); setGalleryEditId(null); clearMessage(); }}>Cancel</button>}
            </div>
          </form>
          <div className="admin-data-grid">
            {isLoading ? <p>Loading gallery…</p> : gallery.length ? gallery.map((item) => (
              <article key={item._id} className="admin-card">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.type}</p>
                  <p>{item.description}</p>
                  <p className="gallery-source">{item.src}</p>
                </div>
                <div className="admin-card-actions">
                  {item.type === "image" && item.src?.trim() && <button onClick={() => handleEditGallery(item)}>Edit photo</button>}
                  <button className="delete-button" onClick={() => handleDeleteGallery(item)}>Delete</button>
                </div>
              </article>
            )) : <p>No gallery items found.</p>}
          </div>
        </section>
      );
    }

    if (section === "admissions") {
      return (
        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Manage Admissions</h2>
            <p>Track submitted applications and update candidate status.</p>
          </div>
          <div className="admin-data-grid admin-admissions-grid">
            {isLoading ? <p>Loading admissions…</p> : admissions.length ? admissions.map((item) => (
              <article key={item._id} className="admin-card admin-admission-card">
                <div>
                  <h3>{item.name}</h3>
                  <p><strong>Course:</strong> {item.course}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Phone:</strong> {item.phone}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                </div>
                <div className="admin-card-actions">
                  <button onClick={() => handleAdmissionStatus(item, "Approved")}>Approve</button>
                  <button onClick={() => handleAdmissionStatus(item, "Rejected")}>Reject</button>
                  <button onClick={() => handleAdmissionStatus(item, "Pending")}>Pending</button>
                </div>
              </article>
            )) : <p>No admissions found.</p>}
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>Admin Panel</span>
          <button className="logout-button" onClick={handleLogout}>Sign out</button>
        </div>
        <nav className="admin-nav">
          {[
            { key: "faculty", label: "Faculty" },
            { key: "notices", label: "Notices" },
            { key: "gallery", label: "Gallery" },
            { key: "admissions", label: "Admissions" },
          ].map((item) => (
            <button key={item.key} className={section === item.key ? "active" : ""} onClick={() => handleSectionClick(item.key)}>{item.label}</button>
          ))}
        </nav>
      </aside>

      <section className="admin-content">
        {status.text && <div className={`admin-status ${status.type}`}>{status.text}</div>}
        {renderSection()}
      </section>
    </main>
  );
}

export default AdminPanel;
