import { createContext, useState } from "react";

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
