import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Navbar from "./components/Navbar";
import Navbar1 from "./components/Navbar1";
import Footer from "./components/Footer";
import AdmissionForm from "./pages/AdmissonForm";
import Notices from "./pages/Notices";
import Gallery from "./pages/Gallery";
import Faculty from "./pages/Faculty";
import StudentCorner from "./pages/Students";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Navbar />
      <Navbar1 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/AdmissonForm" element={<AdmissionForm />} />
        <Route path="/Notices" element={<Notices />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Faculty" element={<Faculty />} />
        <Route path="/Students" element={<StudentCorner />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;