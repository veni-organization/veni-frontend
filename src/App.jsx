import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import EventScreen from "./pages/EventScreen";
import SignUpScreen from "./pages/SignUpScreen";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/event/:id" element={<EventScreen />} />
        <Route path="/signUp" element={<SignUpScreen />} />
        <Route path="create" element={<Create />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
