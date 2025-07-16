import Login from "./Auth/Login.jsx";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import { Routes, Route } from "react-router"; // use `react-router-dom` not `react-router`
import MainLayout from "./MainLayout.jsx";
import Home from "./Home.jsx";
import RoleMaster from "./Pages/RoleMaster.jsx";
import PermissionMaster from "./Pages/PermissionMaster.jsx";
import StaffMaster from "./Pages/StaffMaster.jsx";
import StudentMaster from "./Pages/StudentMaster.jsx";
// import Home from "./pages/Home"; // Example route
// import About from "./pages/About"; // Another example route

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/RoleMaster" element={<RoleMaster />} />
        <Route path="/PermissionMaster" element={<PermissionMaster />} />
        <Route path="/StaffMaster" element={<StaffMaster />} />
        <Route path="/StudentMAster" element={<StudentMaster />} />

      </Route>
    </Routes>
  );
}

export default App;



