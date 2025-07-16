import Login from "./Auth/Login.jsx";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import { Routes, Route } from "react-router"; // use `react-router-dom` not `react-router`
import MainLayout from "./MainLayout.jsx";
import Home from "./Home.jsx";
// import Home from "./pages/Home"; // Example route
// import About from "./pages/About"; // Another example route

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Route>
    </Routes>
  );
}

export default App;



