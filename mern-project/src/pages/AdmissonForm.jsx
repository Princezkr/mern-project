import { useState } from "react";
import UploadDocs from "./DocumentUpload";
import AdmissionStatus from "./AdmissonStatus";
import { API_BASE_URL } from "../utils/api";
import "../styles/AdmissonForm.css";

function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, course } = formData;

    if (!name || !email || !phone || !course || course === "Choose Course") {
      setIsError(true);
      setMessage("Please fill in all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await fetch(`${API_BASE_URL}/admissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, course })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setMessage(`Thanks ${name}! Your admission request for ${course} has been saved to MongoDB.`);
      setFormData({ name: "", email: "", phone: "", course: "" });
      setStep(2);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    setStep(3);
  };

  const handleRestart = () => {
    setStep(1);
    setMessage("");
    setIsError(false);
  };

  return (
    <div className="form-page">
      <div className="admission-flow">
        <div className="step-indicator">
          <span className={step === 1 ? "step-pill active" : "step-pill"}>1. Admission Form</span>
          <span className={step === 2 ? "step-pill active" : "step-pill"}>2. Upload Documents</span>
          <span className={step === 3 ? "step-pill active" : "step-pill"}>3. Status</span>
        </div>

        {step === 1 && (
          <form className="admission-form" onSubmit={handleSubmit}>
            <h1>Admission Form</h1>

            <div className="form-group">
              <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <select name="course" value={formData.course} onChange={handleChange}>
                <option value="">Choose Course</option>
                <option value="CSE">CSE</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Electrical">Electrical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>

            {message && <p className={`form-message ${isError ? "error" : "success"}`}>{message}</p>}

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Apply Now"}</button>
          </form>
        )}

        {step === 2 && <UploadDocs onNext={handleNextStep} />}
        {step === 3 && <AdmissionStatus onRestart={handleRestart} />}
      </div>
    </div>
  );
}

export default AdmissionForm;
