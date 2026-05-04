import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../blocks/App.css";
import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import SavedNews from "../components/SavedNews.jsx";
import Footer from "../components/Footer.jsx";
import LoginModal from "../components/LoginModal.jsx";
import RouteProtector from "./RouteProtector.jsx";
import NewsApi from "../utils/NewsApi.js";
import DbApi from "../utils/DbApi.js";
import { apiKey, apiUrl, dbUrl } from "../utils/constants.js";

export default function App() {
  //hooks
  const [loginModalState, setLoginModalState] = React.useState(false);
  const [registerModalState, setRegisterModalState] = React.useState(false); //I am embedding the register modal WITHIN the login modal since design seems to indicate you can't reach it without opening the login anyways. This hook stands mostly just to unify the closing functionality.
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [articleBin, setArticleBin] = React.useState({});
  const [activeSearch, setActiveSearch] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [likedArticles, setLikedArticles] = React.useState([]);
  const [userArray, setUserArray] = React.useState([]);

  //initializations

  const newsCaller = new NewsApi(apiUrl, apiKey);
  const userApi = new DbApi(dbUrl); //to be used in the future

  //functions

  //modal functionality

  const closeModals = () => {
    setLoginModalState(false);
    setRegisterModalState(false);
  };

  const toggleLoginModal = () => {
    setLoginModalState(!loginModalState);
  };

  //

  //login functionality

  //this and a lot of the following will be done by the database/backend at some point, consider these a stopgap
  const checkUserArray = (value) => {
    return userArray.some((user) => {
      if (user.email === value.email) {
        if (user.password === value.password) {
          return true;
        }
      }
      return false;
    });
  };

  const userReturn = (value) => {
    return userArray.find((user) => {
      return user.email === value.email;
    });
  };

  const login = (value) => {
    const userCheck = checkUserArray(value);
    if (userCheck) {
      console.log("Login success route.");
      setUserData(userReturn(value));
      setIsLoggedIn(true);
      closeModals();
      return;
    }
    console.log("There was a problem signing in!");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUserData({});
  };

  //signup functionality

  const handleSignupSubmit = (value) => {
    console.log(value);
    setUserArray([...userArray, value]);
    closeModals();
  };

  const resetArticles = () => {
    setArticleBin([]);
  };

  const handleSearchFormSubmit = (searchValue) => {
    setActiveSearch(false);
    resetArticles();
    setIsLoading(true);
    newsCaller
      .search(searchValue)
      .then((data) => {
        setActiveSearch(true);
        //adding 'like' attribute to all incoming data, again this could probably be handled by the backend and any models I setup
        data.articles.forEach((article) => {
          if (
            likedArticles.some((saved) => {
              return article.url == saved.url;
            })
          ) {
            return (article.liked = true);
          }
          article.liked = false;
        });
        const first3 = data.articles.slice(0, 3);
        const restOf = data.articles.slice(4, 7);
        const articleSet = [first3, restOf];
        setArticleBin(articleSet);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //close modal functionality

  const handleEscPress = (evt) => {
    if (evt.key === "Escape") {
      closeModals();
    }
  };

  const handleBoxClick = (evt) => {
    evt.nativeEvent.stopImmediatePropagation();
  };

  const handleOutClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModals();
    }
  };

  //'like' functionality
  const handleLikeClick = (cardData) => {
    if (cardData.liked) {
      //remove operation
      console.log("REMOVE OP ENGAGED");
      setLikedArticles(
        likedArticles.filter((article) => {
          return article.url !== cardData.url;
        }),
      );
      let binReconstructA = articleBin[0].map((article) => {
        if (article.url === cardData.url) {
          article.liked = false;
          return article;
        }
        return article;
      });
      let binReconstructB = articleBin[1].map((article) => {
        if (article.url === cardData.url) {
          article.liked = false;
          return article;
        }
        return article;
      });
      setArticleBin([binReconstructA, binReconstructB]);
      return;
    }
    //addition operation
    console.log("ADD OP ENGAGED");
    setLikedArticles([...likedArticles, cardData]);
    let binReconstructA = articleBin[0].map((article) => {
      if (article.url === cardData.url) {
        article.liked = true;
        return article;
      }
      return article;
    });
    let binReconstructB = articleBin[1].map((article) => {
      if (article.url === cardData.url) {
        article.liked = true;
        return article;
      }
      return article;
    });
    setArticleBin([binReconstructA, binReconstructB]);
  };

  return (
    <>
      <div className="app__page" tabIndex={0} onKeyDown={handleEscPress}>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                submit={handleSearchFormSubmit}
                data={articleBin}
                isLoggedIn={isLoggedIn}
                searchToggle={activeSearch}
                loading={isLoading}
                likeHandler={handleLikeClick}
              >
                <Header
                  LoggedIn={isLoggedIn}
                  signOut={logOut}
                  signIn={toggleLoginModal}
                  user={userData}
                  viewingMain={true}
                />
              </Main>
            }
          />
          <Route
            path="/saved-news"
            element={
              <RouteProtector isLoggedIn={isLoggedIn}>
                <SavedNews
                  data={likedArticles}
                  user={userData}
                  likeHandler={handleLikeClick}
                >
                  <Header
                    LoggedIn={isLoggedIn}
                    signOut={logOut}
                    signIn={toggleLoginModal}
                    user={userData}
                    viewingMain={false}
                  />
                </SavedNews>
              </RouteProtector>
            }
          />
        </Routes>
        {loginModalState && (
          <LoginModal
            submit={login}
            submitB={handleSignupSubmit}
            closeModal={closeModals}
            isLoading={false}
            clickPass={handleBoxClick}
            mouseDownPass={handleOutClick}
          />
        )}
        <Footer />
      </div>
    </>
  );
}
