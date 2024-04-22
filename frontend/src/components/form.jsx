import axios from "axios";
import config from "../config";
import { useState } from "react";
import Select from "./Select";
import "./form.css";
import image from './img/img1.png'

const Form = (props) => {
  const [name, setName] = useState("");
  const [event, setEvent] = useState({ key: "", val: "" });
  const [city, setCity] = useState({ key: "", val: "" });
  const [errors, setErrors] = useState([]);

  const choicesEvents = [
    ["", "---"],
    ["front-end-react", "Front End - ReactJS"],
    ["back-end-react", "Back End - Node.js"],
    ["full-stack-react", "Full Stack - MERN"],
    ["tester-manual", "Manual Tester"],
  ];

  const choicesCities = [
    ["", "---"],
    ["online", "Online"],
    ["warsaw", "Warsaw"],
    ["krakow", "Kraków"],
  ];

  const saveEvent = (eventObj) => {
    axios
      .post(config.api.url + "/events/add", eventObj, { mode: "cors" })
      .then((res) => {
        props.getEvents();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const resetForm = () => {
    setName("");
    setEvent({ key: "", val: "" });
    setCity({ key: "", val: "" });
    setErrors([]);
  };

  const validateForm = (e) => {
    e.preventDefault();

    let errorsValidate = [];

    if (name.trim() === "") {
      errorsValidate.push("Please write Name and Surname");
    }

    if (event.key.trim() === "") {
      errorsValidate.push("Please select course");
    }

    if (city.key.trim() === "") {
      errorsValidate.push("Please select city");
    }

    if (errorsValidate.length > 0) {
      setErrors(
        errorsValidate.map((errorTxt, index) => {
          return <li key={index}>{errorTxt}</li>;
        })
      );
      return false;
    }

    const newEvent = {
      name: name,
      event: event,
      city: city,
    };

    saveEvent(newEvent);

    resetForm();
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEvent = (e) => {
    setEvent({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].innerText,
    });
  };

  const handleChangeCity = (e) => {
    setCity({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].innerText,
    });
  };

  return (
    <div className="formWrapper">
      <div className="container">
      <form action="#" onSubmit={validateForm}>
        <div className="wrapper">
          <label htmlFor="name">Name and Surname</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className="wrapper">
          <label htmlFor="event">Event</label>
          <Select
            values={choicesEvents}
            selectedValue={event.key}
            onValueChange={handleChangeEvent}
            id="events"
          />
        </div>
        <div className="wrapper">
          <label htmlFor="city">City</label>
          <Select
            values={choicesCities}
            selectedValue={city.key}
            onValueChange={handleChangeCity}
            id="city"
          />
        </div>
        <div className="wrapper">
          <button type="submit" className="submit">Signup</button>
        </div>
      </form>
      <div className="imgContainer">
        <img src={image} />
      </div>

      <div className="erorsWrapper">
        <ul className="errors">{errors}</ul>
      </div>
    </div>
    </div>
  );
};

export default Form;
