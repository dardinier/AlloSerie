import React from "react";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img className="navbar-brand__logo" src="/assets/images/logo.png" width="40" height="40" />
          <div className="navbar-brand__title">Allo Série</div>
        </a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Episodes</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
