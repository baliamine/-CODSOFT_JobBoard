import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import UseAuthContext from "./hooks/UseAuthContext";
import EmployerHome from "./pages/Employer-home/EmployerHome";
import EmployerProfile from "./pages/Employer-profile/EmployerProfile";
import JobSeekerProfile from "./pages/JobSeeker-profile/JobSeekerProfile";
import JobSeekerHome from "./pages/JobSeeker-home/JobSeekerHome";
import JobDetails from "./pages/JobDetails/JobDetails";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import "./index.css";
function App() {
  const { user } = UseAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Employer-home" element={<EmployerHome />} />
            <Route path="/Employer-profile" element={<EmployerProfile />} />
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
