import '../assets/sass/nav.scss'
import logo from '../assets/img/logo_acip.png'
import React from 'react'

export default () => {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <div className="container">
                        <a className="left brand-logo" href="/">
                            <img src={logo} alt="ACIP" />
                        </a>
                        <a
                            className="btn right sidenav-trigger show-on-large valign-wrapper"
                            data-target="slide-out"
                            href="#!"
                        >
                            <i className="fal fa-bars" />
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}
