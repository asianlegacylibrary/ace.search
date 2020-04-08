import '../assets/sass/header.scss'
import React from 'react'
import NavBar from './NavBar'
import Sidebar from './NavSidebar'

export default () => {
    return (
        <header>
            <NavBar />
            <Sidebar />
        </header>
    )
}
