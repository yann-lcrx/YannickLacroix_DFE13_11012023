import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function AppRouter() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.jwt);

  return (
    <Routes>
      {isLoggedIn && token ? (
        <>
          <Route path="/" element={<Navigate to="/profile" />} replace />
          <Route path="/login" element={<Navigate to="/profile" />} replace />
        </>
      ) : (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </>
      )}

      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRouter;
