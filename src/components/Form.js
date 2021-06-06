import React from "react";

function Form(props) {
  return (
    <div className="form__container">
      <h2 className="form_title">{props.title}</h2>
      <form className="form">
          <input placeholder={props.placeholder[0]}/>
          <input placeholder={props.placeholder[1]}/>
          <button className="form__submit-btn">{props.buttonText}</button>
      </form>
    </div>
  );
}
