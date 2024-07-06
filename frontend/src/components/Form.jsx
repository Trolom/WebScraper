import React, { useState, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import LoadingIndicator from './LoadingIndicator';
import AuthContext from '../AuthContext';

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const isLogin = method === "login";
  const formTitle = isLogin ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const payload = isLogin ? { username, password } : { username, email, password };

    try {
      const res = await api.post(route, payload);
      if (isLogin) {
        login(res.data.access);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="subscription">
      <div className="container">
        <div className="subscribe-title text-center">
          <h2>{formTitle}</h2>
          <p>
            Find B2B Leads for your business in any industry across all countries. Receive hundreds of leads in just a few minutes.
          </p>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="subscription-input-group">
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <input
                    className="subscription-input-form"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />
                )}
                {isLogin && (
                  <input
                    className="subscription-input-form"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />
                )}
                {!isLogin && (
                  <input
                    className="subscription-input-form"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                )}
                <input
                  className="subscription-input-form"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                {loading && <LoadingIndicator />}
                <button type="submit" className="appsLand-btn subscribe-btn">
                  {formTitle}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
