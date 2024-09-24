// Imports React
import Cookies from "js-cookie";
import { useEffect } from "react";

// Imports externes
import PhoneInput from "react-phone-number-input";

import "./PhoneNumber.css";

const PhoneNumber = ({ userPhone, setUserPhone }) => {
  useEffect(() => {
    const phone = Cookies.get("phone");
    if (phone) {
      setUserPhone(phone);
    }
  }, []);

  return (
    <div className="phone-block">
      <p>Choisis ton pays</p>
      <PhoneInput
        value={userPhone}
        onChange={setUserPhone}
        defaultCountry="FR"
        international
        countryCallingCodeEditable={false}
        limitMaxLength
        placeholder="Votre numéro"
      />
    </div>
  );
};

export default PhoneNumber;
