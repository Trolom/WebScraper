import React, { useEffect, useState } from 'react';
import api from '../api';

const ListTopics = () => {
  const [popularSearches, setPopularSearches] = useState([]);

  useEffect(() => {
    const fetchPopularSearches = async () => {
      try {
        const response = await api.get('/api/popular-searches/');
        setPopularSearches(response.data.slice(0, 6)); // Get only the top 5 popular searches
      } catch (error) {
        console.error('Error fetching popular searches:', error);
      }
    };

    fetchPopularSearches();
  }, []);

  return (
    <section id="list-topics" className="list-topics">
      <div className="container">
        <div className="list-topics-content">
          <ul>
            {popularSearches.map((search, index) => (
              <li key={index}>
                <div className="single-list-topics-content">
                  <h2><a href="#">{search.query}</a></h2>
                  <p>{search.count} listings</p>
                  <p>{search.location}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ListTopics;
