const Filter = ({ data, setdata }) => {
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

export default Filter;