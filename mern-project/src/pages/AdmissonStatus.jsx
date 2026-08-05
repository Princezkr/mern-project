import { useEffect, useState } from "react";
import "../styles/AdmissonForm.css";

function AdmissionStatus({ onRestart }) {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admissions/latest");
        const data = await response.json();

        if (data.success) {
          setStatus(data.admission.status);
        } else {
          setStatus("Pending");
        }
      } catch {
        setStatus("Pending");
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="step-card">
      <h2>Admission Status</h2>
      <p>Your application is currently: <strong>{status}</strong></p>
      <button type="button" className="secondary-btn" onClick={onRestart}>Start Again</button>
    </div>
  );
}

export default AdmissionStatus;
