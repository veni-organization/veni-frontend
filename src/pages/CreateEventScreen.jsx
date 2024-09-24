import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Forms/Input";
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
  const ScrollSaver = () => {
    // State to store the current scroll position
    const [scrollPos, setScrollPos] = useState(0);
    // Effect to restore scroll position on component mount
    useEffect(() => {
      // Scroll to the saved position
      window.scrollTo(0, scrollPos);
    }, [scrollPos]);
  };

  const navigate = useNavigate();
  // import du context
  const { formData, setFormData } = useContext(CreateEventContext);

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction pour créer l'événement en DB
  const handleSubmit = async (event) => {
    event.preventDefault();

    // si User pas connecté alors il est d'abord renvoyé sur le flow d'inscription
    if (isLoggedIn === false) {
      return navigate(`/signUp`);
      // sinon on envoit le formData en DB et on va sur la page de l'event
    } else {
      try {
        // formattage de la date
        const eventDate = new Date(formData.date);
        eventDate.setHours(Number(formData.time.slice(0, 2)));
        eventDate.setMinutes(Number(formData.time.slice(3)));
        // console.log(eventDate);

        // envoi du formData
        const formData2 = new FormData();
        formData2.append("name", formData.title);
        formData2.append("eventDate", eventDate);
        // formData2.append("time", formData.time);
        // formData2.append("endTime", formData.endTime);
        formData2.append("location", formData.address);
        formData2.append("description", formData.description);
        formData2.append("eventPicture", formData.picture);
        formData2.append("reminder", formData.reminder);
        formData2.append("plusOne", formData.plusOne);
        formData2.append("guestsApproval", formData.guestsApproval);
        formData2.append("links", formData.links);

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/event/create`,
          formData2,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate(`/event/${response.data.id}`);
      } catch (error) {
        console.log(error.message);
      }
      // }
    }
  };

  return (
    <>
      <div
        className={
          step === 4 || step === 5 ? "create-event-background" : "none"
        }
      ></div>
      <div className="form-header">
        <EventCreationBack step={step} setStep={setStep} />
      </div>
      <div className="create-event-container">
        <form
          className={
            step !== 4 && step !== 5 ? "form-container" : "form-container2"
          }
        >
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
              {/* <Input type="date" />
                <Input type="time" /> */}
              <DateEvent date={formData.date} setDate={setFormData} />
              <TimeEvent
                type="time"
                label="Heure de début"
                time={formData.time}
                setTime={setFormData}
              />
              {/* <div className="hours">
                  <TimeEvent
                    label="Heure de début"
                    time={formData.time}
                    setTime={setFormData}
                  /> */}
              {/* <TimeEvent
                    label="Heure de fin"
                    endTime={formData.endTime}
                    setEndTime={setFormData}
                  /> */}
              {/* </div> */}
              {/* <EventFormButton
                  className="form-button"
                  text="Continuer"
                  data={formData.date}
                  setStep={setStep}
                  step={step}
                /> */}
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
              {/* <EventFormButton
                className="form-button"
                text="Continuer"
                data={formData.picture ? formData.picture : poster}
                setStep={setStep}
                step={step}
              /> */}
            </div>
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
                {/* {console.log("---->", formData.links)} */}
              </div>
            </div>
          )}
        </form>
      </div>
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
    </>
  );
};

export default CreateEvent;
