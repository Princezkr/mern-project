import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdmissionForm from "./pages/AdmissonForm";
import Notices from "./pages/Notices";
import Gallery from "./pages/Gallery";


function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/AdmissonForm" element={<AdmissionForm />} />
        <Route path="/Notices" element={<Notices/>}/>
        <Route path="/Gallery" element={<Gallery/>}/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;