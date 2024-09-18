import { Link } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

import BackButton from "../components/Forms/BackButton";
import Input from "../components/Forms/Input";
import PhoneNumber from "../components/Forms/PhoneNumber";
import Title from "../components/Forms/Title";
import FormButton from "../components/Forms/FormButton";

import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        name: username,
        phoneNumber: userPhone,
      });
      console.log(response);
      setShowVerification(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setIsLoadingVerify(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/verify", {
        phoneNumber: userPhone,
        verifyCode: checkCode,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingVerify(false);
    }
  };

  // return null;

  return (
    <div className="container">
      <form>
        {step === 1 && (
          <div className="sign-up step1">
            <div className="top-title">
              <Title text="Entre ton nom ici !" />
            </div>
            <Input
              type="text"
              placeholder="Mon nom"
              className="name-input"
              data={username}
              setData={setUsername}
            />
            <Link to="/signIn">
              <h3>J'ai déjà un compte</h3>
            </Link>
            <FormButton
              text="Continuer"
              data={username}
              setStep={setStep}
              step={step}
            />
          </div>
        )}

        {step === 2 && (
          <div className="sign-up step2">
            <div className="top-title">
              <BackButton step={step} setStep={setStep} />
              <Title text="Entre ton numéro de téléphone !" />
            </div>
            <PhoneNumber userPhone={userPhone} setUserPhone={setUserPhone} />
            {showVerification && (
              <div className="verification-block">
                <Title text="Code de vérification" title="false" />
                <Input
                  type="text"
                  placeholder="123-456"
                  className="verification-input"
                  data={checkCode}
                  setData={setCheckCode}
                />
              </div>
            )}
            <FormButton
              data={userPhone}
              text="Envoyer"
              setStep={setStep}
              step={step}
              handleSignUp={handleSignUp}
            />
          </div>
        )}

        {step === 3 && (
          <div className="sign-up step3">
            <div className="top-title">
              <BackButton step={step} setStep={setStep} />
              <Title text="Entre ta date de naissance !" />
            </div>
            <input type="date" />
            <FormButton text="Continuer" setStep={setStep} step={step} />
          </div>
        )}

        {step === 4 && (
          <div className="sign-up step4">
            <div className="top-title">
              <BackButton step={step} setStep={setStep} />
              <Title text="Ajoute ta photo !" />
            </div>
            <input type="file" />
            <FormButton text="Confirmer" setStep={setStep} step={step} />
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
