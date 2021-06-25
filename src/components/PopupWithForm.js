function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__content">
        <h2 className={`popup__title${props.isRegister ? '_register' : ''}`}>{props.title}</h2>
        <form
          name={props.name}
          className={`popup__form popup__form_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className={`popup__btn popup__btn_${props.name}`} type="submit">
            {props.buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
