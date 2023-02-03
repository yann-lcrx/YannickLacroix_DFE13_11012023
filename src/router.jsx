import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function AppRouter() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.jwt);

  const isLoggedInWithToken = isLoggedIn && token;

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedInWithToken ? <Profile /> : <LandingPage />}
      />
      <Route
        path="/login"
        element={isLoggedInWithToken ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
}

export default AppRouter;
