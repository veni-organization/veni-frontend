import { Link } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import BackButton from "../components/Forms/BackButton";
import Title from "../components/Forms/Title";
import PhoneNumber from "../components/Forms/PhoneNumber";
import Input from "../components/Forms/Input";
import FormButton from "../components/Forms/FormButton";

const SignInScreen = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // This function verify if the user exist in database
  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        { phoneNumber: userPhone }
      );
      setShowVerification(true);
      console.log(response.data);
    } catch (error) {
      setErrorMessage(
        error.response.data.message === "User not found" &&
          "Ce numéro n'est pas enregistré"
      );
      console.log(error.response.data);
    }
  };

  // This fonction send phonenumber and verification code to get the token
  const handleVerify = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        { phoneNumber: userPhone, verifyCode: Number(checkCode) }
      );
      Cookies.set("token", response.data.token);
      console.log(response.data);
    } catch (error) {
      setErrorMessage(
        error.response.data.message === "Wrong code" &&
          "Veuillez vérifier le code saisi"
      );
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      <div className="top-title">
        <Link to={"/signUp"}>
          <BackButton />
        </Link>
        <Title text="Entre ton numéro de téléphone !" />
      </div>
      <PhoneNumber userPhone={userPhone} setUserPhone={setUserPhone} />
      {showVerification && (
        <div>
          <Title text={"Code de vérification"} title="false" />
          <Input
            type="text"
            placeholder="123456"
            className="verification-input"
            data={checkCode}
            setData={setCheckCode}
          />
        </div>
      )}
      <p>{errorMessage}</p>
      <FormButton
        data={userPhone}
        text="Envoyer"
        checkCode={checkCode}
        handleSignIn={handleSignIn}
        handleVerify={handleVerify}
      />
    </div>
  );
};

export default SignInScreen;
