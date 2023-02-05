import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function AppRouter() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.jwt);

  const isLoggedInWithToken = isLoggedIn && token;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedInWithToken ? <Navigate to="/profile" /> : <LandingPage />
        }
      />
      <Route
        path="/login"
        element={isLoggedInWithToken ? <Navigate to="/profile" /> : <Login />}
      />
      <Route
        path="/profile"
        element={isLoggedInWithToken ? <Profile /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default AppRouter;
