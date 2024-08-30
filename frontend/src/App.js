import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages//Home/Home";
import EmployerProfile from './pages/Employer-profile/EmployerProfile';
import JobSeekerProfile from "./pages/JobSeeker-profile/JobSeekerProfile";
import  JobSeekerHome from "./pages/homeJobSeeker/index";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/employer-profile" element={<EmployerProfile/>} /> 
            <Route path="/JobSeeker-profile" element={<JobSeekerProfile/>} />
            <Route path="/home-jobseeker" element={<JobSeekerHome/>} />
            
           
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
