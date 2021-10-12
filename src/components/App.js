import React from "react";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";
// import { updateAvatar } from "../../../react-mesto-api-full/backend/controllers/users.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUserInfo] = React.useState({});

  // ПЕРЕМЕННЫЕ РЕГИСТРАЦИИ
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false); // статус регистрации
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false); // попап регистрации
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");

  // CARDS
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    checkToken();
    updateUserInfo();
  }, []);

  function checkToken() {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }
  function updateUserInfo() {
    api
      .getAllInfo()
      .then(([userData, cards]) => {
        setUserInfo(userData.data);
        setCards(cards.data);
        setCurrentUserEmail(userData.data.email);
      })
      .catch((err) => console.log(err));
  }
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
        setUserInfo(userData.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .newAvatar(avatar)
      .then((res) => {
        setUserInfo(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
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
        setLoggedIn(true);
        history.push("/");
        updateUserInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ВЫХОД ИЗ ПРОФИЛЯ

  function handleSignOut() {
    auth
      .logOut()
      .then((res) => {
        if (res) {
          history.push("/signin");
          setLoggedIn(false);
          setCurrentUserEmail("");
        }
      })
      .catch((err) => console.log(err));
  }
  // РЕГИСТРАЦИЯ

  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        setIsRegisterSuccess(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={loggedIn}
          email={currentUserEmail}
          onSignOut={handleSignOut}
        />
        <Switch>
          <Route path="/signin">
            <Login onSubmit={handleAuthorization} />
          </Route>
          <Route path="/signup" isOpen={isInfoTooltipOpen}>
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
          isSuccessStatus={isRegisterSuccess}
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
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
