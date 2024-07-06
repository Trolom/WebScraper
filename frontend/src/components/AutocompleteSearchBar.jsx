import React, { useState, useEffect } from 'react';
import api from '../api';

const AutocompleteSearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState('');

    const handleInputChange = async (e) => {
        setQuery(e.target.value);
        if (e.target.value.length > 1) {
            try {
                const response = await api.get(`/api/autocomplete?q=${e.target.value}`);
                setSuggestions(response.data.suggestions);
            } catch (error) {
                console.error('Error fetching autocomplete suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSelectedSuggestion(suggestion);
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the submission to the backend here if needed
        console.log(`Selected suggestion: ${selectedSuggestion}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for cities or countries..."
                />
                <button type="submit">Search</button>
            </form>
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteSearchBar;
