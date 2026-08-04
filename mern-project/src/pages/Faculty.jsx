import { useEffect, useMemo, useState } from "react";
import "../styles/Faculty.css";

const API_BASE_URL = "http://localhost:5000/api";
const emptyForm = { name: "", department: "", designation: "", email: "" };

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [query, setQuery] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [status, setStatus] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchFaculty = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/faculty`);
      if (!response.ok) throw new Error("Could not load records");
      const data = await response.json();
      setFaculty(Array.isArray(data) ? data : []);
    } catch {
      setStatus({ text: "Unable to load faculty records. Please check the server connection.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/faculty`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load records");
        return response.json();
      })
      .then((data) => setFaculty(Array.isArray(data) ? data : []))
      .catch(() => setStatus({ text: "Unable to load faculty records. Please check the server connection.", type: "error" }))
      .finally(() => setIsLoading(false));
  }, []);

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(faculty.map((item) => item.department).filter(Boolean))).sort()],
    [faculty]
  );

  const visibleFaculty = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    return faculty.filter((item) => {
      const inDepartment = activeDepartment === "All" || item.department === activeDepartment;
      const searchable = [item.name, item.department, item.designation, item.email].join(" ").toLowerCase();
      return inDepartment && searchable.includes(searchTerm);
    });
  }, [faculty, query, activeDepartment]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus({ text: "", type: "" });

    try {
      const response = await fetch(
        editId ? `${API_BASE_URL}/faculty/${editId}` : `${API_BASE_URL}/faculty`,
        {
          method: editId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!response.ok) throw new Error("Could not save faculty member");

      setStatus({ text: editId ? "Faculty member updated successfully." : "Faculty member added successfully.", type: "success" });
      resetForm();
      await fetchFaculty();
    } catch {
      setStatus({ text: "We couldn't save this record. Please try again.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      department: item.department || "",
      designation: item.designation || "",
      email: item.email || "",
    });
    setEditId(item._id);
    setStatus({ text: `Editing ${item.name}'s profile.`, type: "info" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Remove ${item.name} from the faculty directory?`)) return;

    try {
      const response = await fetch(`${API_BASE_URL}/faculty/${item._id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Could not delete faculty member");
      setStatus({ text: "Faculty member removed successfully.", type: "success" });
      await fetchFaculty();
    } catch {
      setStatus({ text: "We couldn't remove this record. Please try again.", type: "error" });
    }
  };

  return (
    <main className="faculty-page">
      <section className="faculty-hero">
        <p className="faculty-eyebrow">Academic directory</p>
        <div className="faculty-hero-content">
          <div>
            <h1>Faculty management</h1>
            <p>Keep your college directory accurate, organized, and easy to explore.</p>
          </div>
          <div className="faculty-count"><strong>{faculty.length}</strong><span>Faculty members</span></div>
        </div>
      </section>

      <div className="faculty-layout">
        <aside className="faculty-form-panel">
          <div className="panel-heading">
            <span className="panel-icon" aria-hidden="true">{editId ? "✎" : "+"}</span>
            <div><h2>{editId ? "Update profile" : "Add faculty"}</h2><p>{editId ? "Make changes to this faculty profile." : "Create a new faculty directory profile."}</p></div>
          </div>
          <form onSubmit={handleSubmit} className="faculty-form">
            <label>Full name<input name="name" placeholder="e.g. Dr. Ananya Sharma" value={form.name} onChange={handleChange} required /></label>
            <label>Department<input name="department" placeholder="e.g. Computer Science" value={form.department} onChange={handleChange} required /></label>
            <label>Designation<input name="designation" placeholder="e.g. Associate Professor" value={form.designation} onChange={handleChange} required /></label>
            <label>Email address<input type="email" name="email" placeholder="name@college.edu" value={form.email} onChange={handleChange} required /></label>
            <div className="form-actions">
              <button className="primary-button" type="submit" disabled={isSaving}>{isSaving ? "Saving..." : editId ? "Save changes" : "Add faculty"}</button>
              {editId && <button className="secondary-button" type="button" onClick={resetForm}>Cancel</button>}
            </div>
          </form>
        </aside>

        <section className="faculty-directory" aria-labelledby="directory-title">
          <div className="directory-topbar">
            <div><p className="faculty-eyebrow">Directory</p><h2 id="directory-title">Meet our faculty</h2></div>
            <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people or departments" aria-label="Search faculty" /></label>
          </div>

          {status.text && <div className={`faculty-status ${status.type}`} role="status">{status.text}</div>}

          <div className="department-filters" aria-label="Filter by department">
            {departments.map((department) => <button key={department} className={activeDepartment === department ? "active" : ""} onClick={() => setActiveDepartment(department)}>{department}</button>)}
          </div>

          {isLoading ? <div className="directory-empty">Loading faculty directory…</div> : visibleFaculty.length ? (
            <div className="faculty-grid">
              {visibleFaculty.map((item) => (
                <article key={item._id} className="faculty-card">
                  <div className="member-avatar" aria-hidden="true">{item.name?.trim()?.charAt(0)?.toUpperCase() || "F"}</div>
                  <div className="member-details"><p className="member-department">{item.department || "Unassigned"}</p><h3>{item.name}</h3><p className="member-designation">{item.designation || "Faculty member"}</p><a href={`mailto:${item.email}`}>{item.email}</a></div>
                  <div className="card-actions"><button className="edit-button" onClick={() => handleEdit(item)}>Edit</button><button className="delete-button" onClick={() => handleDelete(item)} aria-label={`Delete ${item.name}`}>Delete</button></div>
                </article>
              ))}
            </div>
          ) : <div className="directory-empty"><strong>No faculty members found</strong><span>Try another search or add a new profile using the form.</span></div>}
        </section>
      </div>
    </main>
  );
}

export default Faculty;
