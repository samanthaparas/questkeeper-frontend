import { Link } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import logoIcon from "../../../public/QK-favicon.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link className="header__brand" to="/">
        <img className="header__icon" src={logoIcon} alt="QuestKeeper logo" />

        <div className="header__text">
          <span className="header__title">QuestKeeper</span>
          <span className="header__tagline">Where Heroes Find Answers</span>
        </div>
      </Link>

      <Navigation />
    </header>
  );
}

export default Header;
