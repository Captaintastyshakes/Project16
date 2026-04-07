import NewsCard from "./NewsCard.jsx";

export default function NewsCardCluster({
  data,
  isLoggedIn,
  viewingSavedNews,
}) {
  return (
    <div className="newsCardCluster__main">
      {data.map((datum) => {
        return (
          <NewsCard
            data={datum}
            isLoggedIn={isLoggedIn}
            isSavedNews={viewingSavedNews}
          />
        );
      })}
    </div>
  );
}
