import { Routes, Route } from "react-router-dom";
import Landing from "./screens/Landing.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<h1> 404 Error content not found </h1>} />
      </Routes>
    </>
  );
}
export default App;
