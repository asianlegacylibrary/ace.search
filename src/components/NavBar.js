import '../assets/sass/nav.scss'
import logo from '../assets/img/logo_acip.png'
import React from 'react'
export const NavBar = () => {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <div className="container">
                        <a className="left brand-logo" href="/">
                            <img height="44px" src={logo} alt="ACIP" />
                        </a>
                        <ul className="right">
                            <li>MENU</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
