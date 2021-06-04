function ImagePopup(props) {
    return (
    <div className={`popup popup-img ${props.card && 'popup_opened'}`}>
    <div className="popup-img__content">
        <img src={props.card && props.card.url} alt={props.card && props.card.title} className="popup-img__picture" />
        <p className="popup-img__caption">{props.card && props.card.title}</p>
        <button type="button" className="popup__close-btn" onClick={props.onClose}></button>
    </div>
</div>
    )
}

export default ImagePopup;