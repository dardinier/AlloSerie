import React from "react";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img src="/assets/images/logo.png" width="50" height="50" />
          Allo Série
        </a>
      </nav>
    );
  }
}

export default Header;
