import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import "./Profile.css";
import EventList from "../components/profile/EventList";

const Profile = () => {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [typeEvent, setTypeEvent] = useState("actual");

  const { token } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <>
      <div>
        <span className="veni-logo">veni</span>
        <button
          onClick={() => {
            navigate("/create");
          }}
        >
          Je crée un event
        </button>
        <button
          onClick={() => {
            navigate("/edit-profile");
          }}
        >
          Modifier son profil
        </button>
      </div>
      <div>
        <h2>Bonjour {data.name} !</h2>
        {console.log(data)}
        <EventList typeEvent={typeEvent} setTypeEvent={setTypeEvent} />
      </div>
    </>
  );
};

export default Profile;
