import React, { useState } from "react";
import axios from "axios";
import classes from "./Register.module.css";

export const validateUserForm = (rest, formErrors) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

const RegisterForm = (props) => {
  console.log(props);
  const [state, setState] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    formErrors: {
      name: "",
      phone: "",
      email: "",
      project: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let temp = state.formErrors;
    switch (name) {
      case "name":
        temp.name = value.length < 2 ? "Name is required!" : "";
        break;
      case "phone":
        temp.phone = value.length < 2 ? "Phone is required!" : "";
        break;
      case "email":
        temp.email = value.length < 2 ? "Email is required!" : "";
        break;
      case "project":
        temp.project = value.length < 2 ? "Project is required!" : "";
        break;
      default:
        break;
    }
    setState({ ...state, [name]: value, formErrors: temp });
  };

  const callBackend = async (data) => {
    const phone = data.phone.length > 10 ? data.phone : "+25" + data.phone;
    data.phone = phone;
    try {
      await axios({
        method: "POST",
        url: "http://localhost:9090/api/register",
        data,
      });
      window.location.replace("http://localhost:3000/pay");
    } catch (err) {
      alert("Faled try again later, with other information");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: state.name,
      phone: state.phone,
      email: state.email,
      projectName: state.project,
    };
    const temp = state.formErrors;
    if (!state.name) {
      temp.name = "Name can't be empty";
    }
    if (!state.phone) {
      temp.phone = "Phone can't be empty";
    }
    if (!state.email) {
      temp.email = "Email can't be empty";
    }
    if (!state.project) {
      temp.project = "Email can't be empty";
    }
    setState({ ...state, formErrors: temp });
    if (validateUserForm(state, state.formErrors)) {
      callBackend(data);
    }
  };

  return (
    <div className={classes.container}>
      <h1> Welcome To Our Site </h1>
      <p> Provide us with these least information </p>
      <form className={classes.form}>
        <div className={classes.formControl}>
          <label>Names: </label>
          <input
            onChange={handleChange}
            className={
              state.formErrors.name.length > 0
                ? classes.redBorder
                : classes.formControlInput
            }
            value={state.name}
            type="text"
            name="name"
            placeholder="E.g: Humuriza Patrick"
          />
        </div>
        <div className={classes.formControl}>
          <label>Email: </label>
          <input
            value={state.email}
            onChange={handleChange}
            className={
              state.formErrors.name.length > 0
                ? classes.redBorder
                : classes.formControlInput
            }
            type="text"
            name="email"
            placeholder="E.g: user@gmail.com"
          />
        </div>
        <div className={classes.formControl}>
          <label>Phone: </label>
          <input
            value={state.phone}
            onChange={handleChange}
            className={
              state.formErrors.name.length > 0
                ? classes.redBorder
                : classes.formControlInput
            }
            type="text"
            name="phone"
            placeholder="E.g: +25078......."
          />
        </div>
        <div className={classes.formControl}>
          <label>Project: </label>
          <textarea
            value={state.project}
            onChange={handleChange}
            className={
              state.formErrors.name.length > 0
                ? classes.redBorder
                : classes.formControlInput
            }
            name="project"
            rows="4"
            cols="50"
            placeholder="E.g: Tell us about it"
          />
        </div>
        <button className={classes.button} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
