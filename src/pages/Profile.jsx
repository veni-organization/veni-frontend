import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h2>Je suis sur la page Profil</h2>
      <button>Modifier son profil</button>
      <Link to="/">
        <button>Retourner sur la page Home</button>
      </Link>
      <h2>{data.name}</h2>
      <h2>{data.phone_number}</h2>
    </>
  );
};

export default Profile;
