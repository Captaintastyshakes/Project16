//marking for pull request analysis
import NewsCardList from "./NewsCardList.jsx";
import React from "react";

export default function SavedNews({ data, user, children, likeHandler }) {
  React.useEffect(() => {}, [user]);

  return (
    <>
      <div className="savedNews__main">
        <div className="savedNews__header-wrapper">
          {children}
          <p>Saved articles</p>
          <h1>
            {user.username} you have saved {data.length} articles.
          </h1>
          By keywords: {"Keywords shall go here."}
        </div>
        <NewsCardList
          data={data}
          isLoggedIn={true}
          auxilliaryData={null}
          isSavedNews={true}
          likeHandler={likeHandler}
        />
      </div>
    </>
  );
}
