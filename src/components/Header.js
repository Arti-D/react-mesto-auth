import logoPath from "../logo.svg";
import { useLocation, Link } from "react-router-dom";
import React from "react";

function Header(props) {
  const location = useLocation();

  function signOut() {
    props.onSignOut();
  }

  return (
    <header className="header">
      <a
        href="https://github.com/Arti-D/react-mesto-auth"
        target="_blank"
        className="header__logo-link"
        rel="noreferrer"
      >
        <img className="header__logo" alt="Логотип" src={logoPath} />
      </a>
      {location.pathname === "/signin" && (
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/signup" && (
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      )}
      {props.isLoggedIn && (
        <div className="header__wrapp">
          <p className="header__email">{props.email}</p>
          <button onClick={signOut} className="header__button header__link">
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
