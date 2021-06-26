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
        href="https://github.com/Arti-D/mesto-react"
        target="_blank"
        className="header__logo-link"
        rel="noreferrer"
      >
        <img className="header__logo" alt="Логотип" src={logoPath} />
      </a>
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {props.isIn && (
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
