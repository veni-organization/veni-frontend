import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import DateEvent from "../components/Forms/DateEvent";
import TimeEvent from "../components/Forms/TimeEvent";
import AddressInput from "../components/Forms/AddressInput";
import Poster from "../components/Forms/Poster";
import MainButton from "../components/MainButton/MainButton";
import TitleEvent from "../components/Forms/TitleEvent";
import Option from "../components/OptionsEvent/Option";
import Description from "../components/OptionsEvent/Description";
import Links from "../components/OptionsEvent/Links";
import EventFormButton from "../components/Forms/EventFormButton";
import EventCreationBack from "../components/Forms/EventCreationBack";
import BlurBackground from "../components/Event/main/img/BlurBackground";
import poster from "../assets/img/life_is_a_party.jpg";
import "./CreateEventScreen.css";
import { CreateEventContext } from "../context/CreateEventContext";
import { AuthContext } from "../context/AuthContext";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  // import du context
  const { formData, setFormData, handleCreateEvent } =
    useContext(CreateEventContext);

  // states du formulaire
  const [step, setStep] = useState(1);
  // const [title, setTitle] = useState("");
  // const [date, setDate] = useState();
  // const [time, setTime] = useState();
  // const [endTime, setEndTime] = useState();
  const [searchBox, setSearchBox] = useState(null);
  // const [address, setAddress] = useState("");
  // const [description, setDescription] = useState("");
  // const [picture, setPicture] = useState(null);

  // Fonction pour créer l'événement en DB
  const handleSubmit = async (event) => {
    event.preventDefault();

    // si User pas connecté alors il est d'abord renvoyé sur le flow d'inscription
    if (!token) {
      navigate("/signup", { state: { isCreateEvent: true } });
    } else {
      handleCreateEvent(token);
    }
    console.log("clicked");
  };

  return (
    <>
      {(step === 4 || step === 5) && (
        <BlurBackground
          event_picture={
            formData.picture ? URL.createObjectURL(formData.picture) : null
          }
          defaultImg={poster}
        />
      )}
      {/* {console.log(formData.picture)} */}
      <div className="form-header">
        <EventCreationBack step={step} setStep={setStep} />
        {step === 2 || step === 3 ? (
          <p
            onClick={() => {
              setStep(step + 1);
            }}
          >
            Passer
          </p>
        ) : step === 5 ? (
          <p
            onClick={() => {
              handleSubmit();
            }}
          >
            Passer
          </p>
        ) : null}
      </div>
      <div
        className="create-event-container"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (step !== 5) {
              setStep(step + 1);
            } else {
              handleSubmit;
            }
          }
        }}
      >
        <div className={"form-container"}>
          <div></div>
          {step === 1 && (
            <div className="step1-screen">
              <TitleEvent title={formData.title} setTitle={setFormData} />
              {/* <EventFormButton
            className="form-button"
            text="Continuer"
            data={formData.title}
            setStep={setStep}
            step={step}
          /> */}
            </div>
          )}
          {step === 2 && (
            <div className="step2-screen">
              <DateEvent date={formData.date} setDate={setFormData} />
              <TimeEvent
                type="time"
                label="Heure de début"
                time={formData.time}
                setTime={setFormData}
              />
            </div>
          )}
          {step === 3 && (
            <div className="step3-screen">
              <AddressInput
                searchBox={searchBox}
                setSearchBox={setSearchBox}
                address={formData.address}
                setAddress={(newAddress) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    address: newAddress,
                  }))
                }
              />
              {/* <EventFormButton
                className="form-button"
                text="Continuer"
                data={formData.address}
                setStep={setStep}
                step={step}
              /> */}
            </div>
          )}
          {step === 4 && (
            // <div className="step4-screen">
            <Poster
              picture={formData.picture}
              setPicture={(newPicture) =>
                setFormData((prevData) => ({
                  ...prevData,
                  picture: newPicture,
                }))
              }
            />
            // {/* <EventFormButton
            //   className="form-button"
            //   text="Continuer"
            //   data={formData.picture ? formData.picture : poster}
            //   setStep={setStep}
            //   step={step}
            // /> */}
            // </div>
          )}
          {step === 5 && (
            <div className="step5-screen">
              <p>Options</p>
              <div className="options-input">
                <Option
                  label="Send auto-reminders"
                  labelDesc="Guests will receive a text 1 week & 1 day before the event."
                  checked={formData.reminder}
                  setChecked={(newReminder) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      reminder: newReminder,
                    }))
                  }
                />
                <Option
                  label="Accept +1"
                  labelDesc="Guests can bring a plus one."
                  checked={formData.plusOne}
                  setChecked={(newPlusOne) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      plusOne: newPlusOne,
                    }))
                  }
                />
                <Option
                  label="Guest approval"
                  labelDesc="Guests need approval to join."
                  checked={formData.guestsApproval}
                  setChecked={(newApproval) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      guestsApproval: newApproval,
                    }))
                  }
                />
                <Description
                  description={formData.description}
                  setDescription={(newDescription) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      description: newDescription,
                    }))
                  }
                />
                <Links
                  className="links"
                  links={formData.links}
                  setLinks={(newLinks) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      links: newLinks,
                    }))
                  }
                />
              </div>
            </div>
          )}
          {step !== 5 ? (
            <EventFormButton
              className="form-button"
              text="Continuer"
              data={
                step === 1
                  ? formData.title
                  : step === 2
                  ? formData.date
                  : step === 3
                  ? formData.address
                  : step === 4
                  ? formData.picture || poster
                  : null
              }
              setStep={setStep}
              step={step}
            />
          ) : (
            <MainButton text="Valider" onClick={handleSubmit} />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
