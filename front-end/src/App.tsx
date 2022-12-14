import { Routes, Route } from "react-router-dom";
import Landing from "./screens/Landing.jsx";
import Home from "./screens/Home.jsx";
import PersistProfile from "./components/PersistProfile.jsx";
import AuthScreen from "./screens/AuthScreen.jsx";
const App = () => {
  return (
    <>
      <PersistProfile />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/discord" element={<AuthScreen />}/>
        <Route path="*" element={<h1> 404 Error content not found </h1>} />
      </Routes>
    </>
  );
};
export default App;
