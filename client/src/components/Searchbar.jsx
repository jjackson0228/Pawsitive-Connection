import React, { useState } from "react";
import { css } from "@emotion/react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Handle changes to the search input
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value); // Pass the search query back to the parent
  };

  return (
    <div
      css={css`
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
      `}
    >
      <input
        type="text"
        placeholder="Search for pets..."
        value={query}
        onChange={handleInputChange}
        css={css`
          padding: 10px;
          font-size: 1.2em;
          width: 100%;
          max-width: 400px;
          border-radius: 5px;
          border: 1px solid #ddd;
          outline: none;
          transition: all 0.3s ease-in-out;

          &:focus {
            border-color: #4da3d1;
          }
        `}
      />
    </div>
  );
};

export default SearchBar;