import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Welcome = () => {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('us');
  const [location, setLocation] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoad = () => {
      $(".welcome-hero-txt h2, .welcome-hero-txt p").removeClass("animated fadeInUp").css({ opacity: 0 });
      $(".welcome-hero-search-box").removeClass("animated fadeInDown").css({ opacity: 0 });

      $(".welcome-hero-txt h2, .welcome-hero-txt p").addClass("animated fadeInUp").css({ opacity: 1 });
      $(".welcome-hero-search-box").addClass("animated fadeInDown").css({ opacity: 1 });
    };

    window.addEventListener('load', handleLoad);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

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
    <section id="home" className="welcome-hero">
      <div className="container">
        <div className="welcome-hero-txt">
          <h2>best place to find and explore that all you need</h2>
          <p>
            Find Best Place, Restaurant, Hotel, Real Estate and many more things in just One click
          </p>
        </div>
        <div className="welcome-hero-search-box">
          <form onSubmit={handleSubmit}>
            <div className="welcome-hero-form">
              <div className="double-welcome-hero-form">
                <h3>what?</h3>
                <input
                  type="text"
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Ex: place, restaurant, food"
                />
                <div className="welcome-hero-form-icon">
                  <i className="flaticon-list-with-dots"></i>
                </div>
              </div>
            </div>
            <div className="welcome-hero-form">
              <div className="single-welcome-hero-form">
                <h3>Country</h3>
                <select value={country} onChange={handleCountryChange}>
                  <option value="us">United States</option>
                  {/* Add more country options here if needed */}
                </select>
                <div className="welcome-hero-form-icon">
                  <div className="arrow-down"></div>
                </div>
              </div>
              <div className="single-welcome-hero-form">
                <h3>City</h3>
                <input
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Ex: london, new york, rome"
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
                <div className="welcome-hero-form-icon">
                  <i className="flaticon-gps-fixed-indicator"></i>
                </div>
              </div>
            </div>
            <div className="welcome-hero-search">
              <button className="welcome-hero-btn" type="submit">
                search <i data-feather="search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
