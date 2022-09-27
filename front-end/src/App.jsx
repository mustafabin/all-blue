import { Routes, Route } from "react-router-dom";
import Landing from "./screens/Landing.jsx";
import Home from "./screens/Home.jsx";
import PersistProfile from "./components/PersistProfile.jsx";
function App() {
  return (
    <>
      <PersistProfile />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<h1> 404 Error content not found </h1>} />
      </Routes>
    </>
  );
}
export default App;
