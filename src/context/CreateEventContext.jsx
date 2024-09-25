import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import poster from "../assets/img/life_is_a_party.jpg";
import axios from "axios";

const today = new Date().toISOString().split("T")[0];

// Edit poster to the correct format so it can be send in formData
const handlePosterFile = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
};

// Create the context
export const CreateEventContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: today,
    time: "00:00",
    endTime: "",
    address: "",
    description: "",
    picture: null,
    // reminder: `${{ enabled: true, number_of_days: 1 }}`,
    plusOne: false,
    guestsApproval: false,
    links: [],
  });

  const handleCreateEvent = async (userToken) => {
    try {
      // formattage de la date
      const eventDate = new Date(formData.date);
      eventDate.setHours(Number(formData.time.slice(0, 2)));
      eventDate.setMinutes(Number(formData.time.slice(3)));
      // console.log(eventDate);

      // envoi du formData
      const formData2 = new FormData();
      formData2.append("name", formData.title);
      formData2.append("eventDate", eventDate);
      // formData2.append("time", formData.time);
      // formData2.append("endTime", formData.endTime);
      formData2.append("location", formData.address);
      formData2.append("description", formData.description);

      // Create a variable to send the eventimage in the formData
      const pictureFile = formData.picture || (await handlePosterFile(poster));
      formData2.append("eventPicture", pictureFile);
      // formData2.append("reminder", formData.reminder);
      formData2.append("plusOne", formData.plusOne);
      formData2.append("guestsApproval", formData.guestsApproval);
      formData2.append("links", formData.links);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/event/create`,
        formData2,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("RESPONSEHERE !", response);
      navigate(`/event/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CreateEventContext.Provider
      value={{ formData, setFormData, handleCreateEvent }}
    >
      {children}
    </CreateEventContext.Provider>
  );
};
