import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import BackButton from "../components/Forms/BackButton";
import Input from "../components/Forms/Input";
import PhoneNumber from "../components/Forms/PhoneNumber";
import Title from "../components/Forms/Title";
import FormButton from "../components/Forms/FormButton";

import "./SignUpScreen.css";

const SignUpScreen = () => {
  const navigate = useNavigate();

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const formatedDate = today.toISOString().split("T")[0];
  const [isDateChanged, setIsDateChanged] = useState(false);

  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [checkCode, setCheckCode] = useState("");
  const [userBirth, setUserBirth] = useState(formatedDate);
  const [userAvatar, setUserAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);

  // This function send username and phonenumber to the server, to be able to continue the process with the code to verify identity
  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          name: username,
          phoneNumber: userPhone,
        }
      );
      console.log(response);
      setShowVerification(true);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  // This fonction send phonenumber and verification code to get the token
  const handleVerify = async () => {
    setIsLoadingVerify(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          phoneNumber: userPhone,
          verifyCode: Number(checkCode),
        }
      );
      Cookies.set("token", response.data.token, { expires: 365 });
      setStep(step + 1);
      setCheckCode("");
      setShowVerification(false);
      console.log(response.data);
    } catch (error) {
      setErrorMessage(
        (error.response.data.message === "User not found" &&
          "Merci de renvoyer ton numéro de téléphone") ||
          (error.response.data.message === "Phone number already registered" &&
            "Numéro déjà utilisé") ||
          (error.response.data.message === "Wrong code" &&
            "Veuillez vérifier le code saisi")
      );
      console.log(error.response.data);
    } finally {
      setIsLoadingVerify(false);
    }
  };

  // This fonction send the birth date and the avatar to complete user profile
  const handleCompleteProfile = async () => {
    const formData = new FormData();
    formData.append("birth", userBirth);
    formData.append("avatar", userAvatar);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/complete-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // navigate("/event/:id");
      setStep(step + 1);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // This function handle the file upload, and create a temporary URL to put the picture instead of the input
  const handleFileChange = (file) => {
    setUserAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        {/* Ici mettre le composant Back + Title */}
        <BackButton step={step} setStep={setStep} />
        <Title text="Entre ton nom ici !" step={step} />
        {step === 4 && (
          <p
            onClick={() => {
              handleCompleteProfile();
            }}
          >
            Passer
          </p>
        )}
      </div>
      <form className="signup-form-container">
        {step === 1 && (
          <div
            className="signup-step1"
            // Allow to press enter on keyboard to go to next step
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (username) {
                  setStep(step + 1);
                }
              }
            }}
          >
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
          <div
            className="signup-step2"
            // Allow to press enter on keyboard to go to next step
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (userPhone && checkCode) {
                  return handleVerify();
                }
                if (userPhone) {
                  return handleSignUp();
                }
              }
            }}
          >
            {/* <div className="top-title">
            <BackButton step={step} setStep={setStep} />
            <Title text="Entre ton numéro de téléphone !" />
          </div> */}
            <PhoneNumber userPhone={userPhone} setUserPhone={setUserPhone} />
            {showVerification && (
              <div className="verification-block">
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
              setStep={setStep}
              step={step}
              checkCode={checkCode}
              handleSignUp={handleSignUp}
              handleVerify={handleVerify}
            />
          </div>
        )}
        {step === 3 && (
          <div
            className="signup-step3"
            // Allow to press enter on keyboard to go to next step
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (userBirth) {
                  setStep(step + 1);
                }
              }
            }}
          >
            {/* <div className="top-title">
            <BackButton step={step} setStep={setStep} />
            <Title text="Entre ta date de naissance !" />
          </div> */}
            <Input
              type="date"
              data={userBirth}
              setData={(value) => {
                setUserBirth(value);
                setIsDateChanged(value !== formatedDate);
              }}
              className="birthday-input"
              max={formatedDate}
            />
            <FormButton
              text="Continuer"
              setStep={setStep}
              step={step}
              data={userBirth}
              isDateChanged={isDateChanged}
            />
          </div>
        )}
        {step === 4 && (
          <div
            className="signup-step4"
            // Allow to press enter on keyboard to go to next step
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (userAvatar) {
                  handleCompleteProfile();
                  setStep(step + 1);
                }
              }
            }}
          >
            {/* <div className="top-title">
            <BackButton step={step} setStep={setStep} />
            <Title text="Ajoute ta photo !" />
            <p
              onClick={() => {
                handleCompleteProfile();
              }}
            >
              Passer
            </p>
          </div> */}
            {avatarPreview ? (
              <div className="avatar">
                <img
                  className="avatar-preview"
                  src={avatarPreview}
                  alt="Avatar Preview"
                  onClick={() => {
                    setUserAvatar(null);
                    setAvatarPreview(null);
                  }}
                />
                <p>Quelle beauté ! ✨</p>
              </div>
            ) : (
              <Input
                type="file"
                data={userAvatar}
                setData={(file) => {
                  handleFileChange(file);
                }}
                className="file-input"
              />
            )}
            <FormButton
              text="Confirmer"
              setStep={setStep}
              step={step}
              data={userAvatar}
              handleCompleteProfile={handleCompleteProfile}
              userBirth={userBirth}
            />
          </div>
        )}
      </form>
      {step === 5 && (
        <div
          className="going-screen"
          onClick={() => {
            navigate("/event/:id");
          }}
        >
          <p>going</p>
        </div>
      )}
    </div>
  );
};

export default SignUpScreen;
