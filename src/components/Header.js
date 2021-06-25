import logoPath from "../logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header(props) {
  // написать функцию обработки нажатия на ВЫЙТИ
  const location = useLocation();
  return (
    <header className="header">
      <a
        href="https://github.com/Arti-D/mesto-react"
        target="_blank"
        className="header__logo-link"
      >
        <img className="header__logo" alt="Логотип" src={logoPath} />
      </a>
      {location.pathname === '/sign-in' && <Link to="/sign-up" className="header__link">Регистрация</Link>}
      {location.pathname === '/sign-up' && <Link to="/sign-in" className="header__link">Войти</Link>}
      {props.isIn && <div className="header__wrapp">
        <p className="header__email">{props.email}</p>
        <a className="header__link">Выйти</a>
      </div>}
    </header>
  );
}

export default Header;
