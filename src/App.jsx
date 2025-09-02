import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import PatientDashboard from "./pages/dashboards/PatientDashboard";
import DiagnosticDashboard from "./pages/dashboards/DiagnosticDashboard";
import Creator from "./pages/dashboards/Creator";

import Doctor from "./pages/doctor/Doctor";
import Patients from "./pages/doctor/Patients";
import ViewRecord from "./pages/doctor/ViewRecord";
import PatientProfile from "./pages/doctor/PatientProfile";
import Consultancy from "./pages/doctor/Consultancy";

import Patient from "./pages/patient/Patient";
import Permission from "./pages/patient/Permission";
import Record from "./pages/patient/Record";
import Upload from "./pages/patient/Upload";
import Prescription from "./pages/patient/Prescription";

import Diagnostic from "./pages/diagnostic/Diagnostic";
import Reports from "./pages/diagnostic/Reports";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="patient" element={<PatientDashboard />} />
            <Route path="diagnostic" element={<DiagnosticDashboard />} />
            <Route path="creator" element={<Creator />} />

            <Route path="doc" element={<Doctor />} />
            <Route path="patients" element={<Patients />} />
            <Route path="viewrecord" element={<ViewRecord />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="consultancy" element={<Consultancy />} />
            <Route path="prescriptions" element={<Prescription />} />

            <Route path="pat" element={<Patient />} />
            <Route path="record" element={<Record />} />
            <Route path="upload" element={<Upload />} />
            <Route path="permission" element={<Permission />} />

            <Route path="diag" element={<Diagnostic />} />
            <Route path="report" element={<Reports />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
