import React, { useState } from "react";
import Image from "../images/Logo2.png";
import User from "../images/person.svg";
import { Link } from "react-router-dom";

function Navbar({ username }) {
  const [activeItem, setActiveItem] = useState(0);

  const handleClick = (index) => {
    setActiveItem(index);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fs-5">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img className="logoNav" src={Image} alt="" height={75} />
        </a>
        <div className="navbar-collapse" id="navbarSupportedContent mobileNav">
          <ul className="navbar-nav me-auto p-1 mb-5 mb-lg-0">
            <li className={`nav-item p-3 ${activeItem === 0 ? "active" : ""}`}>
              <Link
                className="nav-link"
                onClick={() => handleClick(0)}
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className={`nav-item p-3 ${activeItem === 1 ? "active" : ""}`}>
              <Link
                className="nav-link"
                onClick={() => handleClick(1)}
                to="/expense"
              >
                Expenses/Saving
              </Link>
            </li>
          </ul>
          <div className="d-flex p-2">
            <img
              className="mb-auto my-auto userimg p-0"
              src={User}
              alt="User"
              height={35}
            />
            <h4 className="fs-4 p-2 user">{username}</h4>
            <button className="btn btn-secondary fs-5" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
