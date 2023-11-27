import {useState, useEffect, useRef} from 'react';

function Navbar() {

    return(
        <nav className="navbar">
            <p className="navbar__title">Spotify Dev Tools and Analysis</p>
            <NavbarItem item="Track Analysis" />
            <NavbarItem item="Track Comparison" />
            <NavbarItem item="Artist Analysis" />
            <NavbarItem item="Artist Comparison" />
            <NavbarItem item="Custom" />
        </nav>
    )
}

function NavbarItem({item}) {

    function handleClick() {
        console.log("Changing to: ", item)
    }

    return(
        <div className="navbar__item" onClick={handleClick}>
            <p>{item}</p>
        </div>
    )   
}
export default Navbar;