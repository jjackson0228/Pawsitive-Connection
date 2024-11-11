import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const StyledInput = styled.input`
  padding: 10px; /* Padding for better spacing */
  font-size: 1.2em; /* Font size for readability */
  width: 100%; /* Full width */
  max-width: 300px; /* Maximum width */
  border-radius: 5px; /* Rounded corners */
  border: 1px solid #ddd; /* Light border */
  outline: none; /* Remove outline */
  transition: border-color 0.3s ease-in-out; /* Smooth transition for border color */

  &:focus {
    border-color: #4da3d1; /* Change border color on focus */
  }

  &::placeholder {
    color: #aaa; /* Placeholder color */
    font-style: italic; /* Italic style for placeholder */
  }
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Handle changes to the search input
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value); // Pass the search query back to the parent
  };

  return (
      <StyledInput
        type="text"
        placeholder="Search for pets..."
        value={query}
        onChange={handleInputChange}
      />
  );
};

export default SearchBar;
