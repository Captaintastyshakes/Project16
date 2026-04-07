import Navigation from "./Navigation.jsx";
import logout from "../assets/logout.svg";
import logoutW from "../assets/logoutW.svg";
import React from "react";

export default function Header({
  LoggedIn,
  signOut,
  signIn,
  user,
  viewingMain,
}) {
  React.useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <div
        className="header__main"
        style={viewingMain ? { color: "white" } : { color: "black" }}
      >
        <h3 className="header__title">NewsExplorer</h3>
        <div className="header__sub-wrapper">
          {<Navigation isLoggedIn={LoggedIn} viewingMain={viewingMain} />}
          {LoggedIn && (
            <button
              className="header__button header__button_type_sign-out"
              type="button"
              onClick={signOut}
            >
              <p className="header__user-name">{user.username}</p>
              <img
                alt="sign out glyph"
                className="header__glyph"
                //src={logout}
                src={viewingMain ? logoutW : logout}
              />
            </button>
          )}
          {!LoggedIn && (
            <button
              className="header__button header__button_type_sign-in"
              type="button"
              onClick={signIn}
            >
              <p className="header__button-title">Sign in</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
