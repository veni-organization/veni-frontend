import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import BackButton from "../components/Forms/BackButton";
import Title from "../components/Forms/Title";
import PhoneNumber from "../components/Forms/PhoneNumber";
import Input from "../components/Forms/Input";
import FormButton from "../components/Forms/FormButton";

import "./SignInScreen.css";
import { AuthContext } from "../context/AuthContext";
import { CreateEventContext } from "../context/CreateEventContext";

const SignInScreen = () => {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  const { setToken, setUserId } = useContext(AuthContext);
  const { handleCreateEvent } = useContext(CreateEventContext);

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
    } catch (error) {
      setErrorMessage(
        error.response.data.message === "User not found" &&
          "Ce numéro n'est pas enregistré"
      );
      Cookies.set("phone", userPhone);
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
      setToken(response.data.token);
      setUserId(response.data.id);
      Cookies.set("token", response.data.token, { expires: 365 });
      Cookies.set("id", response.data.id, { expires: 365 });
      if (!data) {
        navigate("/");
      } else {
        if (data.event.event) {
          navigate(`/event/${data.event.event}`);
        } else {
          navigate("/");
        }
        if (data.isCreateEvent) {
          console.log("CREATE EVENT");
          handleCreateEvent(response.data.token);
        } else {
          navigate("/");
        }
      }
      // navigate("/event/:id");
    } catch (error) {
      setErrorMessage(
        error.response.data.message === "Wrong code" &&
          "Veuillez vérifier le code saisi"
      );
      console.log(error.response.data);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-header">
        <Link to={"/signUp"}>
          <BackButton />
        </Link>
        <Title text="Quel est ton numéro de téléphone ?" />
        <div style={{ visibility: "hidden", width: 32 }}></div>
      </div>
      <div className="form-signin-container">
        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            padding: "0 16px 0 16px",
            lineHeight: "20px",
            fontSize: "14px",
            color: "#d9dddd",
          }}
        >
          Ton numéro servira uniquement pour te connecter et pour tes
          évènements. Pas de Spam.
        </p>
        <PhoneNumber userPhone={userPhone} setUserPhone={setUserPhone} />
        {showVerification && (
          <div className="verification-input">
            <Title text="Code de vérification" title="false" />
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
    </div>
  );
};

export default SignInScreen;
