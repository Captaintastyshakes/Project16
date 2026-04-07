import React from "react";
import bookmarkDefault from "../assets/bookmark_1.svg";
import bookmarkHover from "../assets/bookmark2.svg";
import bookmarkActive from "../assets/bookmark.svg";

export default function NewsCard({
  data,
  isLoggedIn,
  viewingSavedNews,
  badge,
  likeHandler,
}) {
  const toggleHoverPromptState = () => {
    setHoverPromptState(!hoverPromptState);
  };

  const {
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
    liked,
  } = data;

  const [hoverPromptState, setHoverPromptState] = React.useState(false);

  const [isLiked, setIsLiked] = React.useState(false); //maybe keep using this at the component level just for frontend purposes

  const handleLikeClick = () => {
    isLiked ? setIsLiked(false) : setIsLiked(true);
  };

  const monthMatrix = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (someDate) => {
    const day = new Date(someDate).getDate();
    const month = new Date(someDate).getMonth();
    const selectedMonth = monthMatrix[month];
    const year = new Date(someDate).getFullYear();
    const output = `${selectedMonth} ${day}, ${year}`;
    return output;
  };

  const outputDate = formatDate(publishedAt);

  //logged in save function but not viewing saved
  const handleSaveButtonClick = () => {
    //console.log("I'm still figuring this shit out. Here's a badge#: " + badge);
    //console.log(viewingSavedNews);
    //const returnData = {};
    //console.log("Returning data: " + data);
    //console.log(data);
    //handleLikeClick();
    //likeHandler(isLiked, data);
    likeHandler(data);
  };

  const handleRemoveCard = () => {};

  //React.useEffect(() => {}, [data]);

  return (
    <>
      <li className="newsCard__main">
        {/*viewingSavedNews && (
          <div className="newsCard__topic-box-wrapper">
            <p className="newsCard__topic-box">topic</p>
          </div>
        )*/}
        {hoverPromptState && (
          <div className="newsCard__hover-prompt-wrapper">
            <p className="newsCard__hover-prompt">
              {viewingSavedNews
                ? "Remove from saved"
                : isLoggedIn
                  ? // isLiked
                    liked
                    ? "Added to saved"
                    : "Add to saved"
                  : "Sign in to save articles"}
            </p>
          </div>
        )}
        {viewingSavedNews ? (
          <button
            className="newsCard__action-button newsCard__action-button_type_remove"
            onMouseEnter={toggleHoverPromptState}
            onMouseLeave={toggleHoverPromptState}
            type="button"
            //onClick={handleRemoveCard}//need to remove
            onClick={handleSaveButtonClick}
          >
            <img
              className="newsCard__icon"
              alt="remove-icon"
              src={
                viewingSavedNews
                  ? bookmarkActive
                  : hoverPromptState
                    ? bookmarkDefault
                    : bookmarkActive
              }
            />
          </button>
        ) : (
          <button
            className="newsCard__action-button newsCard__action-button_type_save"
            onMouseEnter={toggleHoverPromptState}
            onMouseLeave={toggleHoverPromptState}
            onClick={
              isLoggedIn
                ? handleSaveButtonClick
                : () => {
                    console.log("You must log in to save articles!");
                    //console.log(data);
                  }
            } //will use this, using checkless version for now- mind you I could probably make the check happen in the function...
            //onClick={handleSaveButtonClick}
            type="button"
          >
            <img
              className="newsCard__icon"
              alt="save-icon"
              src={
                //isLiked
                liked
                  ? bookmarkActive
                  : hoverPromptState
                    ? bookmarkDefault
                    : bookmarkHover
              }
            />
          </button>
        )}
        <a className="newsCard__hyperlink" href={url} target="_blank">
          <img
            className="newsCard__cover-image"
            src={urlToImage}
            alt="News article cover"
          />
        </a>
        <div className="newsCard__textual-wrapper">
          <h3 className="newsCard__date">{outputDate}</h3>
          <a
            className="newsCard__hyperlink_type_text"
            href={url}
            target="_blank"
          >
            <h2 className="newsCard__title">{title}</h2>
          </a>
          <p className="newsCard__article">{description}</p>
          {source.name !== null && (
            <p className="newsCard__source">{source.name}</p>
          )}
        </div>
      </li>
    </>
  );
}
