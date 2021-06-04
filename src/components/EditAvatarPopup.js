import { useRef } from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {
    const avatarLink = useRef();
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({avatar: avatarLink.current.value})

    }
    return (
        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          buttonText='Сохранить'
        >
          <input
            id="avatar-link-input"
            className="popup__input popup__input_type_link"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            autoComplete="off"
            required
            ref={avatarLink}
          />
          <span id="avatar-link-input-error" className="error"></span>
          
        </PopupWithForm>
    )
}

export default EditAvatarPopup