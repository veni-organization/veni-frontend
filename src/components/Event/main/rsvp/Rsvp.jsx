import { useState } from "react";

const Rsvp = ({ guests, refused_guests, userId }) => {
  const [response, setResponse] = useState(null);

  return response === null ? (
    <div>Null</div>
  ) : response ? (
    <div>True</div>
  ) : (
    <div>False</div>
  );
};

export default Rsvp;
