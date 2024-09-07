import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployerHome from "./pages/Employer-home/EmployerHome";
import EmployerProfile from "./pages/Employer-profile/EmployerProfile";
import JobSeekerProfile from "./pages/JobSeeker-profile/JobSeekerProfile";
import JobSeekerHome from "./pages/JobSeeker-home/JobSeekerHome";
import JobDetails from "./pages/JobDetails/JobDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/Employer-home" element={<EmployerHome />} />
            <Route path="/employer-profile" element={<EmployerProfile />} />
            <Route path="/JobSeeker-home" element={<JobSeekerHome />} />
            <Route path="/JobSeeker-profile" element={<JobSeekerProfile />} />
            <Route path="/JobDetails" element={<JobDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
