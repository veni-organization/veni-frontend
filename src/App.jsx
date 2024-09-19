import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Event from "./pages/Event";
import CreateEventScreen from "./pages/CreateEventScreen";
import Edit from "./pages/Edit";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="create" element={<CreateEventScreen />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
