import { createContext, useState } from "react";

const today = new Date().toISOString().split("T")[0];
const pictureDefault = "../../";

// Create the context
export const CreateEventContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: today,
    time: "00:00",
    endTime: "",
    address: "",
    description: "",
    picture: null,
    reminder: false,
    plusOne: false,
    guestsApproval: false,
    links: [],
  });

  return (
    <CreateEventContext.Provider value={{ formData, setFormData }}>
      {children}
    </CreateEventContext.Provider>
  );
};
