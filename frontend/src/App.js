import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmployerProfile from './pages/EmployerProfile'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/employer-profile" element={<EmployerProfile/>} /> 
            
           
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
