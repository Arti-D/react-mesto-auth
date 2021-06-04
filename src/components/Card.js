import CurrentUserContext from "../contexts/CurrentUserContext.js";
import React from 'react';

function Card(props) {
    
    const card = props.card;
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `elems__remove-btn ${isOwn ? 'elems__remove-btn_visible' : 'elems__remove-btn_hidden'}`
      ); 

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeStatus = (
        `elems__like ${isLiked ? 'elems__like_status_active' : ''}`
    )

    function handleLikeClick() {
        props.onCardLike(card)
    }

    function handleCardClick() {
      props.onCardClick({url: card.link, title: card.name});
    }

    function handleDeleteCard() {
        props.onCardDelete(card)
    }
    return (
        <li className="elems__item elem">
            <img src={card.link} alt={card.name} className="elems__img" onClick={handleCardClick}/>
            <div className="elems__wrapper">
                <h2 className="elems__title">{card.name}</h2>
                <div className="elems__like-wrapper">
                    <button type="button" className={cardLikeStatus} onClick={handleLikeClick}></button>
                    <p className="elems__number-of-likes">{card.likes.length}</p>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteCard}></button>
        </li>
    )
}

export default Card