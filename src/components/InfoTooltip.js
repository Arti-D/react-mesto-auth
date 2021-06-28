function InfoTooltip(props) {
  const statusClassName = `popup-register-status__img ${
    props.isSuccessStatus
      ? "popup-register-status__img_ok"
      : "popup-register-status__img_wrong"
  }`;
  return (
    <div
      className={`popup popup-${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__content">
        <div className={statusClassName}></div>
        <p className="popup__title popup__title_register">
          {props.isSuccessStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </p>
        <button
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
