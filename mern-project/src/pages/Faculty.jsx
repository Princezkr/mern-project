import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../utils/api";
import "../styles/Faculty.css";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [query, setQuery] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/faculty`)
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => setFaculty(Array.isArray(data) ? data : []))
      .catch(() => setError("The faculty directory is temporarily unavailable."))
      .finally(() => setIsLoading(false));
  }, []);

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(faculty.map((item) => item.department).filter(Boolean))).sort()],
    [faculty]
  );
  const visibleFaculty = useMemo(() => {
    const search = query.trim().toLowerCase();
    return faculty.filter((item) =>
      (activeDepartment === "All" || item.department === activeDepartment) &&
      [item.name, item.department, item.designation, item.email].join(" ").toLowerCase().includes(search)
    );
  }, [faculty, query, activeDepartment]);

  return (
    <main className="faculty-page">
      <section className="faculty-hero"><p className="faculty-eyebrow">Academic directory</p><div className="faculty-hero-content"><div><h1>Meet our faculty</h1><p>Learn from our experienced academic team.</p></div><div className="faculty-count"><strong>{faculty.length}</strong><span>Faculty members</span></div></div></section>
      <section className="faculty-directory" aria-labelledby="directory-title">
        <div className="directory-topbar"><div><p className="faculty-eyebrow">Directory</p><h2 id="directory-title">Faculty directory</h2></div><label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people or departments" aria-label="Search faculty" /></label></div>
        {error && <div className="faculty-status error" role="status">{error}</div>}
        <div className="department-filters" aria-label="Filter by department">{departments.map((department) => <button key={department} type="button" className={activeDepartment === department ? "active" : ""} onClick={() => setActiveDepartment(department)}>{department}</button>)}</div>
        {isLoading ? <div className="directory-empty">Loading faculty directory…</div> : visibleFaculty.length ? <div className="faculty-grid">{visibleFaculty.map((item) => <article key={item._id} className="faculty-card"><div className="member-avatar" aria-hidden="true">{item.name?.trim()?.charAt(0)?.toUpperCase() || "F"}</div><div className="member-details"><p className="member-department">{item.department || "Faculty"}</p><h3>{item.name}</h3><p className="member-designation">{item.designation}</p><a href={`mailto:${item.email}`}>{item.email}</a></div></article>)}</div> : <div className="directory-empty"><strong>No faculty members found</strong><span>Faculty added by the administrator will appear here.</span></div>}
      </section>
    </main>
  );
}

export default Faculty;
