import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const SearchForm = () => {
    const [query, setQuery] = useState('');
    const [country, setCountry] = useState('us');
    const [location, setLocation] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleLocationChange = async (e) => {
        setLocation(e.target.value);
        if (e.target.value.length > 1) {
            try {
                const response = await api.get(`/api/autocomplete?q=${e.target.value}&type=location`);
                setLocationSuggestions(response.data.suggestions);
            } catch (error) {
                console.error('Error fetching location suggestions:', error);
            }
        } else {
            setLocationSuggestions([]);
        }
    };

    const handleLocationSuggestionClick = (suggestion) => {
        setLocation(suggestion);
        setLocationSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (query && country && location) {
            try {
                const response = await api.get(`/api/start-scrape?query=${query}&country=${country}&location=${location}`);
                const taskId = response.data.task_id;
                navigate('/waiting', { state: { query, country, location, taskId } });
            } catch (error) {
                console.error('Error starting scrape task:', error);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={query}
                        onChange={handleQueryChange}
                        placeholder="Keyword search..."
                    />
                </div>
                <div>
                    <select value={country} onChange={handleCountryChange}>
                        <option value="us">United States</option>
                        {/* Add more country options here if needed */}
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        value={location}
                        onChange={handleLocationChange}
                        placeholder="Search for city or location..."
                    />
                    {locationSuggestions.length > 0 && (
                        <ul>
                            {locationSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleLocationSuggestionClick(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchForm;
