import { Link, NavLink } from "react-router-dom";
import linkedIn from "../assets/LinkedIn.svg";
import github from "../assets/github.svg";

export default function Footer({}) {
  return (
    <>
      <div className="footer__main">
        <p className="footer__trademark-text">
          ©2024 Supersite, Powered by News API
        </p>
        <div className="footer__sub-wrapper">
          <NavLink
            className="footer__nav-link footer__nav-link_type_home"
            to="/"
          >
            Home
          </NavLink>
          <a
            className="footer__nav-link footer__nav-link_type_external"
            href="https://tripleten.com/"
            target="_blank"
          >
            TripleTen
          </a>
          <a
            className="footer__nav-link footer__nav-link_type_external"
            href="https://github.com/Captaintastyshakes/Project16"
            target="_blank"
          >
            <img className="footer__icon" src={github} alt="Github icon" />
          </a>
          <a
            className="footer__nav-link footer__nav-link_type_external"
            href="https://www.linkedin.com/in/michael-weihmann-a0176763/"
            target="_blank"
          >
            <img className="footer__icon" src={linkedIn} alt="Linked-in icon" />
          </a>
        </div>
      </div>
    </>
  );
}
