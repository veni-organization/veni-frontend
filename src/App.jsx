import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateEventScreen from "./pages/CreateEventScreen";
import SignInScreen from "./pages/SignInScreen";
import EventScreen from "./pages/EventScreen";
import SignUpScreen from "./pages/SignUpScreen";
import Edit from "./pages/Edit";

import "./App.css";
import { FormProvider } from "./context/CreateEventContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/event/:id" element={<EventScreen />} />
            <Route path="/create" element={<CreateEventScreen />} />
            <Route path="edit/:id" element={<Edit />} />
          </Routes>
        </Router>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
