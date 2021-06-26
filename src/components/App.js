import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUserInfo] = React.useState({});

  // ПЕРЕМЕННЫЕ РЕГИСТРАЦИИ
  const [registerStatus, setRegisterStatus] = React.useState(false); // статус регистрации
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false); // попап регистрации
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserInfo(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  // ПРОВЕРКА ТОКЕНА ПЕРЕД РЕНДЕРОМ СТРАНИЦЫ
  React.useEffect(() => {
    checkToken();
  }, []);

  // РАБОТА С ПОПАПАМИ

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(name, about) {
    api
      .setUserInfo({ name: name, about: about })
      .then((userData) => {
        setUserInfo(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .newAvatar(avatar)
      .then((res) => {
        console.log(res);
        setUserInfo(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // работа с карточками

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api
        .delLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function onAddPlace(data) {
    api
      .addCard(data)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err));
  }

  // РАБОТА С АВТОРИЗАЦИЕЙ

  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleAuthorization(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          console.log(`токен пришел все ок ${data.token}`);
          setLoggedIn(true);
          history.push("/");
          setCurrentUserEmail(email);
          console.log(currentUserEmail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // ФУНКЦИЯ ПРОВЕРКИ ТОКЕНА

  function checkToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/");
          setCurrentUserEmail(res.data.email)
        }
      });
    }
  }

  // ВЫХОД ИЗ ПРОФИЛЯ

  function handleSignOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false)
    setCurrentUserEmail("")
  }
  // РЕГИСТРАЦИЯ

  function handleRegistration(password, email) {
    console.log(password, email);
    auth
      .register(password, email)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setRegisterStatus(true);
        console.log(res);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setRegisterStatus(false);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isIn={loggedIn} email={currentUserEmail} onSignOut={handleSignOut}/>
        <Switch>
          <Route path="/sign-in">
            <Login onSubmit={handleAuthorization} />
          </Route>
          <Route path="/sign-up" isOpen={isInfoTooltipOpen}>
            <Register onSubmit={handleRegistration} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          ></ProtectedRoute>
        </Switch>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          status={registerStatus}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={onAddPlace}
        ></AddPlacePopup>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        <PopupWithForm title="Вы уверены?" name="sure">
          <button className="popup__btn popup-sure__btn" type="button">
            Да
          </button>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
