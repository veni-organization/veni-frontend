import PhoneInput from "react-phone-number-input";
import { useState } from "react";

import "./PhoneNumber.css";

const PhoneNumber = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <div className="phone-block">
        <p>Choisis ton pays</p>
        <PhoneInput
          value={value}
          onChange={setValue}
          defaultCountry="FR"
          international
          countryCallingCodeEditable={false}
          limitMaxLength
          placeholder="Votre numéro"
        />
      </div>
    </>
  );
};

export default PhoneNumber;
