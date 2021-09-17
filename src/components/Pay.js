import React, { useState } from "react";
import { validateUserForm } from "./RegisterForm";
import axios from "axios";
import classes from "./Pay.module.css";

const Pay = () => {
  const [state, setState] = useState({
    amount: 10000,
    phone: "",
    formErrors: {
      phone: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let temp = state.formErrors;
    switch (name) {
      case "phone":
        temp.phone = value.length < 2 ? "Phone is required!" : "";
        break;
      default:
        break;
    }
    setState({ ...state, [name]: value, formErrors: temp });
  };

  const callBackend = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:9090/api/pay",
        data,
      });

      if (res.data.status === "success") {
        window.location.replace(res.data.meta.authorization.redirect);
      } else {
        alert("Failed try again later");
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      phone: state.phone,
      amount: state.amount,
    };

    const temp = state.formErrors;

    if (!state.phone) {
      temp.phone = "Phone can't be empty";
    }

    setState({ ...state, formErrors: temp });
    console.log(state);

    if (validateUserForm(state, state.formErrors)) {
      callBackend(data);
    }
  };

  const handleQuit = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3000/");
  };
  return (
    <div className={classes.container}>
      <h1> Pay Here Your Upfront </h1>
      <form className={classes.form}>
        <div className={classes.formControl}>
          <label>Amount: </label>
          <input
            className={classes.formControlInput}
            type="text"
            name="name"
            placeholder="10,000"
            disabled={true}
          />
        </div>
        <div className={classes.formControl}>
          <label>Phone: </label>
          <input
            onChange={handleChange}
            className={
              state.formErrors.phone.length > 0
                ? classes.redBorder
                : classes.formControlInput
            }
            value={state.phone}
            type="text"
            name="phone"
            placeholder="E.g: +25078......."
          />
        </div>
        <button className={classes.buttonPay} onClick={handleSubmit}>
          Pay Now
        </button>
        <button className={classes.button} onClick={handleQuit}>
          Quit
        </button>
      </form>
    </div>
  );
};

export default Pay;
