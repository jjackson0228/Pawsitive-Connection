/*const Filter = ({ data, setdata }) => {
    const handleFilterChange = () => {
        const selectedColor = document.getElementById("colorFilter").value;
        const selectedAge = document.getElementById("ageFilter").value;

        let filteredData = data;

        // Apply color filter if it's not set to "all"
        if (selectedColor !== "all") {
            filteredData = filteredData.filter(item => item.color === selectedColor);
        }

        // Apply age filter if it's not set to "all"
        if (selectedAge !== "all") {
            filteredData = filteredData.filter(item => item.age === selectedAge);
        }

        setdata(filteredData);
    };

    return (
        <section>
            <select id="colorFilter" onChange={handleFilterChange}>
                <option value="all">All Colors</option>
                <option value="black">Black</option>
                <option value="brown">Brown</option>
                <option value="white">White</option>
                <option value="gray">Gray</option>
            </select>

            <select id="ageFilter" onChange={handleFilterChange}>
                <option value="all">All Ages</option>
                <option value="young">Young</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
            </select>
        </section>
    );
};

export default Filter;*/
import React from 'react';

const Filter = ({ data, setData }) => {
  const handleFilterChange = () => {
    const selectedColor = document.getElementById("colorFilter").value;
    const selectedAge = document.getElementById("ageFilter").value;
    const selectedType = document.getElementById("typeFilter").value;

    let filteredData = data;

    // Filter by color
    if (selectedColor !== "all") {
      filteredData = filteredData.filter(item => item.color.toLowerCase() === selectedColor.toLowerCase());
    }

    // Filter by age
    if (selectedAge !== "all") {
      filteredData = filteredData.filter(item => item.age === parseInt(selectedAge, 10));
    }

    // Filter by type
    if (selectedType !== "all") {
      filteredData = filteredData.filter(item => item.type.toLowerCase() === selectedType.toLowerCase());
    }

    setData(filteredData);
  };

  return (
    <section>
      <h3>Filter Options</h3>
      
      <label htmlFor="colorFilter">Color:</label>
      <select id="colorFilter" onChange={handleFilterChange}>
        <option value="all">All Colors</option>
        <option value="black">Black</option>
        <option value="brown">Brown</option>
        <option value="white">White</option>
        <option value="gray">Gray</option>
      </select>

      <label htmlFor="ageFilter">Age:</label>
      <select id="ageFilter" onChange={handleFilterChange}>
        <option value="all">All Ages</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        {/* Add more ages as needed */}
      </select>

      <label htmlFor="typeFilter">Type:</label>
      <select id="typeFilter" onChange={handleFilterChange}>
        <option value="all">All Types</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="rabbit">Rabbit</option>
        <option value="fish">Fish</option>
        <option value="bird">Bird</option>
        {/* Add more types based on your data */}
      </select>
    </section>
  );
};

export default Filter;