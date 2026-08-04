import { useState } from "react";
import "../styles/AdmissonForm.css";

function UploadDocs({ onNext }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files || []));
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      setMessage("Please choose at least one document first.");
      return;
    }

    setMessage(`Uploaded ${selectedFiles.length} document(s).`);
    onNext();
  };

  return (
    <div className="step-card">
      <h2>Upload Documents</h2>
      <p>Please add your ID proof and certificates.</p>

      <input type="file" multiple onChange={handleFileChange} />

      {message && <p className={`form-message ${message.includes("Please") ? "error" : "success"}`}>{message}</p>}

      <button type="button" className="secondary-btn" onClick={handleUpload}>Upload & Continue</button>
    </div>
  );
}

export default UploadDocs;