import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
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
import poster from "../assets/img/life_is_a_party.jpg";
import "./CreateEventScreen.css";
import { CreateEventContext } from "../context/CreateEventContext";

const token = Cookies.get("token");

const CreateEvent = () => {
  // call useContext with all the states
  // add state in context to remember what users created

  const [step, setStep] = useState(1);
  // const [title, setTitle] = useState("");
  // const [date, setDate] = useState();
  // const [time, setTime] = useState();
  // const [endTime, setEndTime] = useState();
  const [searchBox, setSearchBox] = useState(null);
  // const [address, setAddress] = useState("");
  // const [description, setDescription] = useState("");
  // const [picture, setPicture] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { formData, setFormData } = useContext(CreateEventContext);
  const navigate = useNavigate();

  // Fonction pour créer l'événement en DB
  const handleSubmit = async (event) => {
    event.preventDefault();

    // si User pas connecté alors il est d'abord renvoyé sur le flow de connexion
    if (isLoggedIn === false) {
      return navigate(`/login`);
      // sinon on envoit le formData en DB et on va sur la page de l'event
    } else {
      try {
        const formData = new FormData();
        formData.append("title", formData.title);
        formData.append("date", formData.date);
        formData.append("time", formData.time);
        formData.append("endTime", formData.endTime);
        formData.append("address", formData.address);
        formData.append("description", formData.description);
        formData.append("picture", formData.picture);

        const response = await axios.post("api-url", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        navigate(`/event${response.data.id}`);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div
        className={
          step === 4 || step === 5 ? "create-event-background" : "none"
        }
      ></div>
      <div className="create-event-container">
        <div className="form-header">
          <EventCreationBack step={step} setStep={setStep} />
        </div>
        <form className="form-container">
          {step === 1 && (
            <div className="step1-screen">
              <TitleEvent title={formData.title} setTitle={setFormData} />
              <EventFormButton
                className="form-button"
                text="Continuer"
                data={formData.title}
                setStep={setStep}
                step={step}
              />
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="step2-screen">
                <DateEvent date={formData.date} setDate={setFormData} />
                <input type="time" />
                <div className="hours">
                  <TimeEvent
                    label="Heure de début"
                    time={formData.time}
                    setTime={setFormData}
                  />
                  <TimeEvent
                    label="Heure de fin"
                    endTime={formData.endTime}
                    setEndTime={setFormData}
                  />
                </div>
                <EventFormButton
                  className="form-button"
                  text="Continuer"
                  data={formData.date}
                  setStep={setStep}
                  step={step}
                />
              </div>
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
              <EventFormButton
                className="form-button"
                text="Continuer"
                data={formData.address}
                setStep={setStep}
                step={step}
              />
            </div>
          )}
          {step === 4 && (
            <div className="step4-screen">
              <Poster
                picture={formData.picture}
                setPicture={(newPicture) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    picture: newPicture,
                  }))
                }
              />
              <EventFormButton
                className="form-button"
                text="Continuer"
                data={formData.picture ? formData.picture : poster}
                setStep={setStep}
                step={step}
              />
              <p className="browse-poster">Choisir parmis notre collection</p>
            </div>
          )}
          {step === 5 && (
            <div className="step5-screen">
              <p>Options</p>
              <div className="options-input">
                <Option
                  label="Send auto-reminders"
                  labelDesc="Guests will receive a text 1 week & 1 day before the event."
                />
                <Option
                  label="Accept +1"
                  labelDesc="Guest can add a “+1” when they reply."
                />
                <Option
                  label="Guest approval"
                  labelDesc="Approve every guest before they can access to the event page."
                />
                <Description
                  description={formData.description}
                  setDescription={formData.setDescription}
                />
                <Links className="links" />
              </div>
              <MainButton text="Valider" onClick={handleSubmit} />
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
