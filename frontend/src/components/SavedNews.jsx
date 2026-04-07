import NewsCard from "./NewsCard.jsx";
import NewsCardList from "./NewsCardList.jsx";
import React from "react";

export default function SavedNews({ data, user, children, likeHandler }) {
  //console.log(data);

  //React.useEffect(() => {}, [data]);

  //const removeCard = () => {};

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
        {/*<ul className="savedNews__grid-container">
          {Array.isArray(data) &&
            data.map((datum) => {
              return (
                <NewsCard
                  data={datum}
                  isLoggedIn={true}
                  key={datum.publishedAt + String.toString(Math.random())}
                  badge={datum.publishedAt}
                  viewingSavedNews={true}
                />
              );
            })}
        </ul>*/}
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
