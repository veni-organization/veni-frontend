import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
// Import des pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateEventScreen from "./pages/CreateEventScreen";
import SignInScreen from "./pages/SignInScreen";
import EventScreen from "./pages/EventScreen";
import SignUpScreen from "./pages/SignUpScreen";
import EditEventScreen from "./pages/EditEventScreen";
import EditProfile from "./pages/EditProfile";

import "./App.css";
import { FormProvider } from "./context/CreateEventContext";
import { AuthProvider } from "./context/AuthContext";
import { LoadScript } from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_PLACES_API;
const libraries = ["places"];

function App() {
  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries} i>
      <AuthProvider>
        <Router>
          <Header />
          <FormProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signIn" element={<SignInScreen />} />
              <Route path="/signUp" element={<SignUpScreen />} />
              <Route path="/event/:id" element={<EventScreen />} />
              <Route path="/create" element={<CreateEventScreen />} />
              <Route path="/edit/:id" element={<EditEventScreen />} />
              <Route path="/edit-profile/:id" element={<EditProfile />} />
            </Routes>
          </FormProvider>
        </Router>
      </AuthProvider>
    </LoadScript>
  );
}

export default App;
