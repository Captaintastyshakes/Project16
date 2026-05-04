import { NavLink } from "react-router-dom";
export default function Navigation({ isLoggedIn, viewingMain }) {
  return (
    <>
      <div className="navigation__main">
        <NavLink
          className={
            viewingMain
              ? "navigation__nav-link navigation__button_type_home navigation__nav-link__active"
              : "navigation__nav-link navigation__button_type_home"
          }
          to="/"
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className={
              !viewingMain
                ? "navigation__nav-link navigation__button_type_home navigation__nav-link__active"
                : "navigation__nav-link navigation__button_type_home"
            }
            to="/saved-news"
          >
            Saved articles
          </NavLink>
        )}
      </div>
    </>
  );
}
