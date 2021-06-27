import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  React.useEffect(() => {
    setPlaceLink("");
    setPlaceName("");
  }, [props.isOpen]);

  function handlePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      buttonText="Сохранить"
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
        onChange={handlePlaceName}
        value={placeName}
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
        onChange={handlePlaceLink}
        value={placeLink}
      />
      <span id="img-link-input-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
