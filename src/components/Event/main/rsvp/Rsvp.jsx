import { useEffect } from "react";
import RsvpChoice from "./RsvpChoice";
import ResponseIcon from "./ResponseIcon";

const Rsvp = ({
  guests,
  refused_guests,
  userId,
  response,
  setResponse,
  handleUserResponse,
}) => {
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
  }, [
    userId,
    guests,
    refused_guests,
    response,
    setResponse,
    handleUserResponse,
  ]);

  if (response === null) {
    return (
      <RsvpChoice response={response} handleUserResponse={handleUserResponse} />
    );
  }

  return (
    <ResponseIcon
      response={response}
      setResponse={setResponse}
      handleUserResponse={handleUserResponse}
    />
  );
};

export default Rsvp;
