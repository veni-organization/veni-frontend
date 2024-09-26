import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, []);

  const handleModify = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/modify-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <div>
      <h1>Modifie ton profil !</h1>
      <img src={data.avatar} />
      <p>{data.name}</p>
      <p>{data.phone_number}</p>
      <p>{data.date_of_birth}</p>
    </div>
  );
};

export default EditProfile;
