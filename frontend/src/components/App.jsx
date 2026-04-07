import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../blocks/App.css";
import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import SavedNews from "../components/SavedNews.jsx";
import Footer from "../components/Footer.jsx";
import LoginModal from "../components/LoginModal.jsx";
import RegisterModal from "../components/RegisterModal.jsx";
import NewsCardList from "./NewsCardList.jsx";
import RouteProtector from "./RouteProtector.jsx";
import NewsApi from "../utils/NewsApi.js";
import DbApi from "../utils/DbApi.js";
import {
  apiKey,
  apiUrl,
  nonSenseArray,
  nonSenseArray2,
  actualTestArray1,
  dbUrl,
} from "../utils/constants.js";

export default function App() {
  //hooks
  const [loginModalState, setLoginModalState] = React.useState(false);
  const [registerModalState, setRegisterModalState] = React.useState(false); //I am embedding the register modal WITHIN the login modal since design seems to indicate you can't reach it without opening the login anyways.
  const [newsCardListState, setNewsCardListState] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //const [articleBin, setArticleBin] = React.useState([]);
  const [articleBin, setArticleBin] = React.useState({});
  const [activeSearch, setActiveSearch] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [reserveArticles, setReserveArticles] = React.useState([]);
  const [reserveArticleIndex, setReserveArticleIndex] = React.useState(0);
  const [likedArticles, setLikedArticles] = React.useState([]);
  const [userArray, setUserArray] = React.useState([]);

  const pseudoUserData = {
    name: "that nigga",
    email: "mikej513@hotmail.com",
    password: "12345",
    avatar:
      "https://i.pinimg.com/736x/7c/4b/00/7c4b005d6f6fde698002bcc3a901396d.jpg",
  };

  //

  //initializations

  const newsCaller = new NewsApi(apiUrl, apiKey);
  const userApi = new DbApi(dbUrl);

  //functions

  //modal functionality

  //this also acts as a pseudo-register/list of all modals if I ever lose track
  const closeModals = () => {
    setLoginModalState(false);
    setRegisterModalState(false);
  };

  const toggleLoginModal = () => {
    setLoginModalState(!loginModalState);
  };

  //

  //testing/not actual login functionality

  const checkUserArray = (value) => {
    //console.log(value);
    return userArray.some((user) => {
      //console.log(value);
      //console.log(user);
      //user.password === value.password && user.email === value.email;
      //user.email === value.email ? user.password === value.password ? return true : return false : return false;
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
    //console.log(value);
    //console.log(userArray);
    //console.log(checkUserArray(value));
    const userCheck = checkUserArray(value);
    /*if (
      userArray.some((user) => {
        user.password === value.password && user.email === value.email;
      })
    ) */
    //if (checkUserArray(value) || bypass) {
    //if (checkUserArray(value)) {
    if (userCheck) {
      console.log("Login success route.");
      //console.log(value);
      setUserData(userReturn(value));
      //setUserData(value);
      //setUserData(value);
      //console.log(userData);

      setIsLoggedIn(true);
      closeModals();
      return;
    }
    //setUserData(pseudoUserData);
    //async function to go here
    //setIsLoggedIn(true);
    /*if (!value) {
      console.log("No value submitted.");
      //closeModals();
      return;*/
    //}
    //closeModals();
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
    //setUserData(value);
    //login(value, true);
    //login(value);
    //setIsLoggedIn(true);
    closeModals();
    //return;
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
        //adding like attribute to all data
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
        //setArticleBin(actualTestArray1); //testing < 3 results, also see main, line 63
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
      console.log("FAT1");
    }
  };

  const handleBoxClick = (evt) => {
    evt.nativeEvent.stopImmediatePropagation();
    console.log("FAT2");
  }; //this needs attention, may not have the event listener positioned in the right place

  const handleOutClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModals();
      console.log("FAT3");
    }
  };

  //'like' functionality
  const handleLikeClick = (cardData) => {
    /*console.log("Like operation fired.");
    console.log("Data to follow:");
    */ //console.log(cardData);
    if (cardData.liked) {
      //remove operation
      console.log("REMOVE OP ENGAGED");
      setLikedArticles(
        likedArticles.filter((article) => {
          return article.url !== cardData.url;
        }),
      );
      /*setArticleBin(
        articleBin.forEach((bin) => {
          bin.map((article) => {
            if (article.url === cardData.url) {
              article.liked = false;
              return article;
            }
            return article;
          });
        }),
      );*/
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
    /*setArticleBin(
      articleBin.map((bin) => {
        bin.map((article) => {
          if (article.url === cardData.url) {
            article.liked = true;
          }
        });
      }),
    );*/
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
                  //data={[actualTestArray1, nonSenseArray2]}
                  //data={actualTestArray1}
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
