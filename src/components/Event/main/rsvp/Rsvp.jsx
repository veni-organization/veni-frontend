import { useEffect, useState } from "react";
import RsvpChoice from "./RsvpChoice";

const Rsvp = ({ guests, refused_guests, userId }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const checkRsvp = () => {
      if (Array.isArray(guests) && guests.some((guest) => guest === userId)) {
        setResponse(true);
      }
      if (
        Array.isArray(refused_guests) &&
        refused_guests.some((guest) => guest === userId)
      ) {
        setResponse(false);
      }
    };

    checkRsvp();
  }, [userId, guests, refused_guests]);

  return response === null ? (
    <RsvpChoice />
  ) : response ? (
    <div>True</div>
  ) : (
    <div>False</div>
  );
};

export default Rsvp;
