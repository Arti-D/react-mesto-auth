import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const placeName = React.useRef();
  const placeLink = React.useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName.current.value,
      link: placeLink.current.value,
    });
    placeName.current.value = '';
    placeLink.current.value = '';
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      buttonText='Сохранить'
    >
      <input
        id="img-title-input"
        className="popup__input popup__input_type_title"
        type="text"
        name="name"
        placeholder="Название"
        maxLength="30"
        minLength="2"
        autoComplete="off"
        ref={placeName}
      />
      <span id="img-title-input-error" className="error"></span>
      <input
        id="img-link-input"
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
        ref={placeLink}
      />
      <span id="img-link-input-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
