import React, { useState,useEffect } from 'react';

function Dropdown({ options,setValue,onSelectionChange }) {
    const [selectedOption, setSelectedOption] = useState(""); // Track selected option
    // const options = ["Option 1", "Option 2", "Option 3"]; // Options for the dropdown
    
    useEffect(() => {
        setSelectedOption(setValue);
    },[])
    
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        onSelectionChange(event.target.value); 
    };

    return (
        <div className="dropdown-container">
        <select
            className="custom-dropdown"
            value={selectedOption}
            onChange={handleChange}
        >
            <option value="" disabled>Select an option</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    </div>
    );
}

export default Dropdown;
