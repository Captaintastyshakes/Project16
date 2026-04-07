import SearchForm from "./SearchForm.jsx";
import About from "./About.jsx";
import NewsCardList from "./NewsCardList.jsx";
import React from "react";
import PreLoader from "./PreLoader.jsx";

export default function Main({
  submit,
  data,
  isLoggedIn,
  searchToggle,
  loading,
  children,
  loadMore,
  likeHandler,
}) {
  //console.log(data);

  return (
    <>
      <div className="main__main">
        <div className="main__sub-wrapper">
          {children}
          <div className="main__titles-wrapper">
            <h1 className="main__title">What's going on in the world?</h1>
            <p className="main__descriptor">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>
          <div className="main__content-wrapper">
            <SearchForm submit={submit} />
          </div>
        </div>
        {loading && <PreLoader />}
        {searchToggle && (
          <NewsCardList
            data={Array.isArray(data) ? data[0] : data}
            //data={data} // test with sub 3 article lists, switch back to above when done!
            isLoggedIn={isLoggedIn}
            auxilliaryData={Array.isArray(data) ? data[1] : data}
            isSavedNews={false}
            likeHandler={likeHandler}
          />
        )}
        {<About />}
      </div>
    </>
  );
}
