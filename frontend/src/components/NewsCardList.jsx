//marking for pull request analysis
import NewsCard from "./NewsCard.jsx";
import React from "react";
//import NewsCardCluster from "./NewsCardCluster.jsx";//ensure this isn't needed then nuke
import notFound from "../assets/not-found_v1.svg";

export default function NewsCardList({
  data,
  isLoggedIn,
  auxilliaryData,
  isSavedNews,
  likeHandler,
}) {
  const [showMoreState, setShowMoreState] = React.useState(false);

  const toggleShowMoreState = () => {
    setShowMoreState(true);
  };

  const handleShowMoreClick = () => {
    toggleShowMoreState();
  };
  return (
    <>
      {!Array.isArray(data) ? (
        <h4 onClick={console.log(data)}>OOPSIE DAISIES HANDLER</h4>
      ) : data.length > 0 ? (
        <div className="newsCardList__main">
          <h3 className="newsCardList__results-title">Search results</h3>
          <ul className="newsCardList__grid-container">
            {Array.isArray(data) &&
              data.map((datum) => {
                return (
                  <NewsCard
                    data={datum}
                    key={datum.publishedAt + String.toString(Math.random())}
                    isLoggedIn={isLoggedIn}
                    badge={datum.publishedAt}
                    viewingSavedNews={isSavedNews}
                    likeHandler={likeHandler}
                  />
                );
              })}

            {showMoreState &&
              auxilliaryData &&
              auxilliaryData.map((datum) => {
                return (
                  <NewsCard
                    data={datum}
                    key={datum.publishedAt + String.toString(Math.random())}
                    isLoggedIn={isLoggedIn}
                    badge={datum.publishedAt}
                    viewingSavedNews={isSavedNews}
                    likeHandler={likeHandler}
                  />
                );
              })}
          </ul>
          {auxilliaryData && !showMoreState && (
            <button
              className="newsCardList__button newsCardList__button_type_show-more"
              type="button"
              onClick={handleShowMoreClick}
            >
              Show more
            </button>
          )}
        </div>
      ) : isSavedNews ? (
        <div className="newsCardList__main newsCardList__no-saved-articles-wrapper">
          <p className="newsCardList__no-results-description">
            Save articles and they will appear here.
          </p>
        </div>
      ) : (
        <div className="newsCardList__main newsCardList__no-results-wrapper">
          <img
            className="newsCardList__no-results-icon"
            alt="A sad face"
            src={notFound}
          />
          <h3 className="newsCardList__results-title">No results</h3>
          <p className="newsCardList__no-results-description">
            Sorry but nothing matched your search terms.
          </p>
        </div>
      )}
    </>
  );
}
