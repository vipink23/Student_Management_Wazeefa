import { Routes, Route } from "react-router";
import React, { Suspense, lazy } from "react";
import { store, persistor } from "./Auth/App/Store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const LoginPage = lazy(() => import("./Auth/Login.jsx"));
const Home = lazy(() => import("./Home.jsx"));
const PermissionMaster = lazy(() => import("./Pages/PermissionMaster.jsx"));
const StaffMaster = lazy(() => import("./Pages/StaffMaster.jsx"));
const StudentMaster = lazy(() => import("./Pages/StudentMaster.jsx"));
const MainLayout = lazy(() => import("./MainLayout.jsx"));
const PrivateRoute = lazy(() => import("./Auth/PrivateRoutes.jsx"));
const RoleMaster = lazy(() => import("./Pages/RoleMaster.jsx"));



function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/RoleMaster" element={<RoleMaster />} />
              <Route path="/PermissionMaster" element={<PermissionMaster />} />
              <Route path="/StaffMaster" element={<StaffMaster />} />
              <Route path="/StudentMAster" element={<StudentMaster />} />
            </Route>
          </Routes>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
