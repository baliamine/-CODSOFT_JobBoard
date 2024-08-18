import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nvabar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nvabar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
