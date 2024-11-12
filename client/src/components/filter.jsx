import React from "react";
import styled from "@emotion/styled";

const FilterContainer = styled.section`
  display: flex;
  justify-content: center; // Center the filter options
  align-items: center; // Align items vertically in the center
  margin-top: 100px;
`;


const FilterTitle = styled.h3`
  margin-bottom: 15px;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
  margin-left: 30px;
  font-weight: bold;
`;

const FilterSelect = styled.select`
  margin: 5px 0 15px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Filter = ({ data, setData }) => {
  const handleFilterChange = () => {
    const selectedColor = document.getElementById("colorFilter").value;
    const selectedAge = document.getElementById("ageFilter").value;
    const selectedType = document.getElementById("typeFilter").value;

    let filteredData = data;

    // Filter by color
    if (selectedColor !== "all") {
      filteredData = filteredData.filter(
        (item) => item.color.toLowerCase() === selectedColor.toLowerCase()
      );
    }

    // Filter by age
    if (selectedAge !== "all") {
      filteredData = filteredData.filter(
        (item) => item.age === parseInt(selectedAge, 10)
      );
    }

    // Filter by type
    if (selectedType !== "all") {
      filteredData = filteredData.filter(
        (item) => item.type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    setData(filteredData);
  };

  return (
    <FilterContainer>
      <div>
        <FilterLabel htmlFor="colorFilter">Color:</FilterLabel>
        <FilterSelect id="colorFilter" onChange={handleFilterChange}>
          <option value="all">All Colors</option>
          <option value="black">Black</option>
          <option value="brown">Brown</option>
          <option value="white">White</option>
          <option value="gray">Gray</option>
          <option value="golden">Golden</option>
        </FilterSelect>
      </div>

      <div>
        <FilterLabel htmlFor="ageFilter">Age:</FilterLabel>
        <FilterSelect id="ageFilter" onChange={handleFilterChange}>
          <option value="all">All Ages</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          {/* Add more ages as needed */}
        </FilterSelect>
      </div>

      <div>
        <FilterLabel htmlFor="typeFilter">Type:</FilterLabel>
        <FilterSelect id="typeFilter" onChange={handleFilterChange}>
          <option value="all">All Types</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          <option value="fish">Fish</option>
          <option value="bird">Bird</option>
          {/* Add more types based on your data */}
        </FilterSelect>
      </div>
    </FilterContainer>
  );
};

export default Filter;
