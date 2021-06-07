import PopupWithForm from "./PopupWithForm.js";

function InfoTooltip(props) {
  return (
  <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="register-status" title={props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}>

  </PopupWithForm>
  );
}

export default InfoTooltip;
