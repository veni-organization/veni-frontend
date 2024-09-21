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
import { FormProvider } from "./components/context/CreateEventContext";

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signIn" element={<SignInScreen />} />
          <Route path="/signUp" element={<SignUpScreen />} />
          <Route path="/event/:id" element={<EventScreen />} />
          <Route path="/create" element={<CreateEventScreen />} />
          <Route path="edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
