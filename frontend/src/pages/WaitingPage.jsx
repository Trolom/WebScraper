import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import NavBarGeneral from '../components/NavBarGeneral';

const WaitingPage = () => {
    const location = useLocation();
    const { query, country, location: loc, taskId } = location.state;
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('Pending...');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await api.get(`/api/scrape-status?task_id=${taskId}`);
                if (response.data.state === 'SUCCESS') {
                    setResults(response.data.result);
                    setLoading(false);
                } else if (response.data.state === 'PENDING' || response.data.state === 'STARTED') {
                    setStatus('In Progress...');
                    setTimeout(fetchResults, 5000); // Poll every 5 seconds
                } else {
                    setStatus('Failed');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching task status:', error);
                setStatus('Failed');
                setLoading(false);
            }
        };

        fetchResults();
    }, [taskId]);

    const extractDomain = (url) => {
        try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname.replace('www.', '');
            
            // Handle Google redirect links
            if (domain === 'google.com') {
                const realUrl = new URL(urlObj.searchParams.get('q'));
                return realUrl.hostname.replace('www.', '');
            }
            
            return urlObj.hostname.replace('www.', '');
        } catch (e) {
            console.error('Invalid URL:', url);
            return url;
        }
    };
    
    const renderValue = (value) => {
        if (Array.isArray(value)) {
            return value.length > 0 ? (
                <ul>
                    {value.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <span>No items</span>
            );
        }
    
        if (typeof value === 'object' && value !== null) {
            return (
                <table>
                    <tbody>
                        {Object.entries(value).map(([key, val]) => (
                            <tr key={key}>
                                <td><strong>{key}</strong></td>
                                <td>{renderValue(val)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    
        if (typeof value === 'string' && value.startsWith('http')) {
            const displayDomain = extractDomain(value);
            return <a href={value} target="_blank" rel="noopener noreferrer">{displayDomain}</a>;
        }
    
        return <span>{value}</span>;
    };
    
    const renderResults = () => {
        if (!results || results.length === 0) return <p>No results found.</p>;
    
        // Get the keys from the first result to use as table headers
        const headers = Object.keys(results[0]);
    
        const renderSocialButton = (platform, links) => {
            if (links.length === 0) return null;
    
            const platformClass = platform.toLowerCase();
            return links.map((link, index) => (
                <button
                    key={index}
                    className={`social-button ${platformClass}`}
                    onClick={() => window.open(link, '_blank')}
                >
                    {platform}
                </button>
            ));
        };
    
        return (
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            {headers.map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {headers.map((header) => (
                                    <td key={header}>
                                        {header === 'Facebook' || header === 'Instagram' || header === 'YouTube'
                                            ? renderSocialButton(header, result[header])
                                            : renderValue(result[header])
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    
    
    

    if (loading) {
        return (
            <div>
                <NavBarGeneral />
                <section id="wait" className="wait">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title">
                            <h2>{status}</h2>
                        </div>
                        <div className="section-header">
                            <p>Please wait while we fetch your results.</p>
                        </div>
                    </div>
                </section>
                <Faq />
                <Footer />
            </div>
        );
    }

    if (status === 'Failed' || !results) {
        return (
            <div>
                <NavBarGeneral />
                <section id="wait" className="wait">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title">
                            <h2>{status}</h2>
                        </div>
                        <div className="section-header">
                            <p>There was an error fetching your results. Please try again later.</p>
                        </div>
                    </div>
                </section>
                <Faq />
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <NavBarGeneral />
            <section id="wait" className="wait">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Search Results</h2>
                    </div>
                    <div className="section-header">
                        {renderResults()}
                    </div>
                </div>
            </section>
            <Faq />
            <Footer />
        </div>
    );
};

export default WaitingPage;
