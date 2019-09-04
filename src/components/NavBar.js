import '../assets/sass/nav.scss'
import logo from '../assets/img/logo_acip.png'
import cloth from '../assets/img/yellow-stacks-focus.jpg'
import cloth1 from '../assets/img/purple-dark-stacks-beauty.jpg'
import cloth2 from '../assets/img/purple-dark-stacks-beauty-crop.jpg'
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
