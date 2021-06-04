import logoPath from '../logo.svg'
function Header() {
    return (
        <header className="header">
        <a href="https://github.com/Arti-D/mesto-react" target="_blank" className="header__logo-link"><img className="header__logo" alt="Логотип"
                src={logoPath}/>
        </a>
      </header>
    )
}

export default Header;