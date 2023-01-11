import AppRouter from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
