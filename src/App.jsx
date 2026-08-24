import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/attendance/:id" element={<Attendance />} />
    </Routes>
  );
}

export default App;