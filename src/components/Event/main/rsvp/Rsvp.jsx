import { useEffect } from "react";
import RsvpChoice from "./RsvpChoice";
import ResponseIcon from "./ResponseIcon";

const Rsvp = ({ guests, refused_guests, userId, response, setResponse }) => {
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
  }, [userId, guests, refused_guests, response, setResponse]);

  return response === null ? (
    <RsvpChoice />
  ) : (
    <ResponseIcon response={response} setResponse={setResponse} />
  );
};

export default Rsvp;
