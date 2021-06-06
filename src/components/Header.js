import logoPath from '../logo.svg'
import { useLocation, Link } from "react-router-dom";

function Header(props) {
    const location = useLocation();
    return (
        <header className="header">
        <a href="https://github.com/Arti-D/mesto-react" target="_blank" className="header__logo-link"><img className="header__logo" alt="Логотип"
                src={logoPath}/>
        </a>
        {location.pathname === '/sign-in' && <Link to="/sign-up" className="header__link">Регистрация</Link>}
        {location.pathname === '/sign-up' && <Link to="/sign-in" className="header__link">Войти</Link>}
      </header>
    )
}

export default Header;