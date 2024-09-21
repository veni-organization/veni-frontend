import { createContext, useState } from "react";
import poster from "../../assets/img/life_is_a_party.jpg";

// Create the context
export const CreateEventContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    endTime: "",
    address: "",
    description: "",
    picture: null,
  });

  return (
    <CreateEventContext.Provider value={{ formData, setFormData }}>
      {children}
    </CreateEventContext.Provider>
  );
};
