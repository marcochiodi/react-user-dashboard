import React from "react";
import logo from '../../assets/logoPrima.png'

export default function Header() {
  return (
    <nav className="navbar w-100 bg-purple">
      <a className="navbar-brand" href="https://www.prima.it/" target="_blank">
        <img src={logo} alt="Logo" width={120} />
      </a>
    </nav>
  );
}