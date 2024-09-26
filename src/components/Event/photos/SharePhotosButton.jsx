import { useContext } from "react";
import axios from "axios";
import "./SharePhotosButton.css";
import { AuthContext } from "../../../context/AuthContext";

const SharePhotosButton = ({ eventId }) => {
  const { token } = useContext(AuthContext);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      handleSendNewPhoto(file);
    }
  };

  const handleButtonClick = () => {
    // Simuler le clic sur l'input file caché
    document.getElementById("new-photo-input").click();
  };

  const handleSendNewPhoto = async (file) => {
    console.log("file", file);
    try {
      // If a file is selected
      if (file) {
        const formData = new FormData();
        formData.append("pictures", file);

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/photo/create/${eventId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share-button-container">
      <div className="share-my-photos-button" onClick={handleButtonClick}>
        <input
          type="file"
          accept="image/*"
          id="new-photo-input"
          style={{ display: "none" }} // hide the input file
          onChange={handleFileChange}
        />
        Partagez mes photos
      </div>
    </div>
  );
};

export default SharePhotosButton;
