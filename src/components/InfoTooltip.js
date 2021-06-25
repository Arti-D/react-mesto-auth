import PopupWithForm from "./PopupWithForm.js";

function InfoTooltip(props) {
  const statusClassName = `popup-register-status__img ${
    props.status
      ? "popup-register-status__img_ok"
      : "popup-register-status__img_wrong"
  }`;
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="register-status"
      isRegister={true}
    >
      <div className={statusClassName}></div>
      <p className="popup__title popup__title_register">
        {props.status
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз."}
      </p>
    </PopupWithForm>
  );
}

export default InfoTooltip;
