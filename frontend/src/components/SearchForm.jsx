import React from "react";

export default function SearchForm({ submit }) {
  const [value, setValue] = React.useState("");

  const handleInput = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submit(value);
  };

  return (
    <>
      <div className="searchForm__main">
        <form className="searchForm__form" onSubmit={handleSubmit}>
          <label className="searchForm__input-label">
            <input
              className="searchForm__input"
              onInput={handleInput}
              value={value}
              name="search-input"
              type="text"
              placeholder="Enter topic"
              required
            />
          </label>
          <button className="searchForm__submit-button" type="submit">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
