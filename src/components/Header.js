import React from 'react';
import LogoIcon from "../assets/images/Vkraft.png";

const Header = ({ title }) => {
    return (
        <header className="header">
            <img src={LogoIcon} alt="Kraft Software Solutions" className="logo" />
            <h1 className="title">{title}</h1>
        </header>
    );
}

export default Header;
