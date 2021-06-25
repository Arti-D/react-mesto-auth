import logoPath from "../logo.svg";

function Header(props) {
  // написать функцию обработки нажатия на ВЫЙТИ

  return (
    <header className="header">
      <a
        href="https://github.com/Arti-D/mesto-react"
        target="_blank"
        className="header__logo-link"
      >
        <img className="header__logo" alt="Логотип" src={logoPath} />
      </a>
      <div className="header__wrapp">
        <p className="header__email">{props.email}</p>
        <a className="header__link">Выйти</a>
      </div>
    </header>
  );
}

export default Header;
