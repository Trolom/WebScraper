import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

const HeaderTop = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <header id="header-top" className="header-top">
      <ul>
        <li>
          <div className="header-top-left">
            <ul>
              <li className="select-opt">
                <select name="language" id="language">
                  <option value="default">EN</option>
                  <option value="Bangla">BN</option>
                  <option value="Arabic">AB</option>
                </select>
              </li>
              <li className="select-opt">
                <select name="currency" id="currency">
                  <option value="usd">USD</option>
                  <option value="euro">Euro</option>
                  <option value="bdt">BDT</option>
                </select>
              </li>
              <li className="select-opt">
                <a href="#"><span className="lnr lnr-magnifier"></span></a>
              </li>
            </ul>
          </div>
        </li>
        <li className="head-responsive-right pull-right">
          <div className="header-top-right">
            <ul>
              {isAuthenticated ? (
                <>
                  <li className="header-top-contact">
                    Hello, {user.username}
                  </li>
                  <li className="header-top-contact">
                    <button onClick={logout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="header-top-contact">
                    <a href="/login">Sign In</a>
                  </li>
                  <li className="header-top-contact">
                    <a href="/register">Register</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default HeaderTop;
