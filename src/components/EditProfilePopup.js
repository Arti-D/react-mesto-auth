import PopupWithForm from './PopupWithForm.js';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {
  const [userName, setName]= React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    // console.log(userName);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    // console.log(description);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(userName, description)
  }
    return (
        <PopupWithForm
          name='edit'
          title='Редактировать профиль'
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          buttonText='Сохранить'
        >
          <input
            id="name-input"
            name="name"
            type="text"
            placeholder="Имя"
            className="popup__input popup__input_type_name"
            minLength="2"
            maxLength="40"
            autoComplete="off"
            required
            value={userName || ''}
            onChange={handleChangeName}
          />
          <span id="name-input-error" className="error"></span>
          <input
            id="about-input"
            name="about"
            type="text"
            placeholder="О себе"
            className="popup__input popup__input_type_about"
            minLength="2"
            maxLength="200"
            autoComplete="off"
            required
            value={description || ''}
            onChange={handleChangeDescription}
          />
          <span id="about-input-error" className="error"></span>
          
        </PopupWithForm>
    )
}

export default EditProfilePopup;