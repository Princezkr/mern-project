import { useState } from "react";
import "../styles/Students.css";

const studyMaterials = [
  { title: "CSE Notes — Data Structures", file: "/cse-data-structures-notes.txt" },
  { title: "Previous Year Papers", file: "/previous-year-papers.txt" },
];

const downloads = [
  { title: "Syllabus", file: "/course-syllabus.txt" },
  { title: "Academic Calendar", file: "/academic-calendar.txt" },
  { title: "Student Handbook", file: "/student-handbook.txt" },
];

const schedules = {
  CSE: ["09:00 – 10:00  Data Structures", "10:15 – 11:15  Database Systems", "11:30 – 12:30  Computer Networks", "01:30 – 02:30  Programming Lab"],
  Mechanical: ["09:00 – 10:00  Thermodynamics", "10:15 – 11:15  Machine Design", "11:30 – 12:30  Manufacturing Process", "01:30 – 02:30  Workshop Practice"],
};

function DownloadLink({ item }) {
  return <a href={item.file} download>{item.title}<b aria-hidden="true">↓</b></a>;
}

function StudentCorner() {
  const [selectedSchedule, setSelectedSchedule] = useState("CSE");
  const [showSchedule, setShowSchedule] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const checkResult = (event) => {
    event.preventDefault();
    const roll = rollNumber.trim();
    if (!roll) {
      setResultMessage("Enter your roll number to continue.");
      return;
    }
    setResultMessage(`Result lookup for ${roll} is ready to connect to your college result portal. Please ask the administrator to add the portal URL or results API.`);
  };

  return (
    <main className="student-page">
      <section className="student-hero" aria-labelledby="student-title">
        <div className="student-hero-copy"><p className="student-eyebrow">Student portal</p><h1 id="student-title">Everything for your academic journey.</h1><p>Quick access to resources, schedules, and updates to help you stay on track.</p></div>
        <div className="student-hero-stat" aria-label="Four resource categories available"><strong>04</strong><span>essential<br />resources</span></div>
      </section>

      <section className="student-welcome" aria-label="Student information"><div className="welcome-mark" aria-hidden="true">S</div><div><p className="student-eyebrow">Your dashboard</p><h2>Student Corner</h2><p>Download resources or use the tools below to get started.</p></div></section>

      <section className="student-resource-grid" aria-label="Academic resources">
        <article className="student-resource-card">
          <div className="resource-icon blue" aria-hidden="true">▤</div><div className="resource-heading"><h2>Study materials</h2><p>Notes and exam-preparation resources available for download.</p></div>
          <ul className="resource-list">{studyMaterials.map((item) => <li key={item.title}><DownloadLink item={item} /></li>)}</ul>
        </article>

        <article className="student-resource-card">
          <div className="resource-icon violet" aria-hidden="true">◫</div><div className="resource-heading"><h2>Timetable</h2><p>Choose a department to view its current daily class schedule.</p></div>
          <div className="timetable-actions"><select value={selectedSchedule} onChange={(event) => setSelectedSchedule(event.target.value)} aria-label="Choose timetable department">{Object.keys(schedules).map((department) => <option key={department}>{department}</option>)}</select><button type="button" onClick={() => setShowSchedule(true)}>View schedule <span aria-hidden="true">→</span></button></div>
        </article>

        <article className="student-resource-card">
          <div className="resource-icon green" aria-hidden="true">✓</div><div className="resource-heading"><h2>Results</h2><p>Enter your roll number to start a result lookup.</p></div>
          <button type="button" className="resource-button" onClick={() => { setShowResults(true); setResultMessage(""); }}>Check semester results <span aria-hidden="true">→</span></button>
        </article>

        <article className="student-resource-card">
          <div className="resource-icon orange" aria-hidden="true">↓</div><div className="resource-heading"><h2>Important downloads</h2><p>Keep the key academic documents you need close at hand.</p></div>
          <ul className="resource-list">{downloads.map((item) => <li key={item.title}><DownloadLink item={item} /></li>)}</ul>
        </article>
      </section>

      <section className="student-help" aria-label="Student support"><div><p className="student-eyebrow">Need assistance?</p><h2>We are here to help.</h2><p>For access or academic support, contact your department office.</p></div><a href="mailto:support@college.edu">Contact support <span aria-hidden="true">→</span></a></section>

      {showSchedule && <div className="student-modal-backdrop" role="presentation" onMouseDown={() => setShowSchedule(false)}><section className="student-modal" role="dialog" aria-modal="true" aria-labelledby="schedule-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setShowSchedule(false)} aria-label="Close timetable">×</button><p className="student-eyebrow">Daily timetable</p><h2 id="schedule-title">{selectedSchedule} schedule</h2><p className="modal-subtitle">Monday to Friday · Current semester</p><ol className="schedule-list">{schedules[selectedSchedule].map((lesson) => <li key={lesson}>{lesson}</li>)}</ol></section></div>}

      {showResults && <div className="student-modal-backdrop" role="presentation" onMouseDown={() => setShowResults(false)}><section className="student-modal" role="dialog" aria-modal="true" aria-labelledby="results-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setShowResults(false)} aria-label="Close results">×</button><p className="student-eyebrow">Examination portal</p><h2 id="results-title">Check your result</h2><p className="modal-subtitle">Enter the roll number printed on your student ID.</p><form className="result-form" onSubmit={checkResult}><label>Roll number<input value={rollNumber} onChange={(event) => setRollNumber(event.target.value)} placeholder="e.g. CSE2026001" /></label><button type="submit">Continue</button></form>{resultMessage && <p className="result-message" role="status">{resultMessage}</p>}</section></div>}
    </main>
  );
}

export default StudentCorner;
