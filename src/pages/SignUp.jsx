import { Link } from "react-router-dom";
import { useState } from "react";

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

  return (
    <>
      <form className="sign-up-form">
        {step === 1 && (
          <>
            <BackButton />
            <Title text="Entre ton nom ici !" />
            <Input
              type="text"
              placeholder="Mon nom"
              className="name-input"
              username={username}
              setUsername={setUsername}
            />
            <Link to="/signIn">
              <h3>J'ai déjà un compte</h3>
            </Link>
            <FormButton text="Continuer" setStep={setStep} step={step} />
          </>
        )}

        {step === 2 && (
          <>
            <BackButton />
            <Title text="Entre ton numéro de téléphone !" />
            <PhoneNumber userPhone={userPhone} setUserPhone={setUserPhone} />
            <Title text="Code de vérification" title="false" />
            <Input
              type="text"
              placeholder="123-456"
              className="verification-input"
            />
            <FormButton text="Continuer" setStep={setStep} step={step} />
          </>
        )}

        {step === 3 && (
          <>
            <BackButton />
            <Title text="Entre ta date de naissance !" />
            <input type="date" />
            <FormButton text="Continuer" setStep={setStep} step={step} />
          </>
        )}

        {step === 4 && (
          <>
            <BackButton />
            <Title text="Ajoute ta photo !" />
            <input type="file" />
            <FormButton text="Confirmer" setStep={setStep} step={step} />
          </>
        )}
      </form>
    </>
  );
};

export default SignUp;

// Font-size : 32
// Font-weight: 700
