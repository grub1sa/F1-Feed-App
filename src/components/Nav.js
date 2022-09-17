import React, { useEffect, useRef, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './Nav.css';
import "../"




const Nav = () => {






    return (
        <>
            <div id="nav">
                <div id="nav-img">
                    <img src={require('../f1.png')}></img>

                </div>

                <nav>
                    <CustomLink to="/Drivers">Drivers</CustomLink>
                    <CustomLink to="/Teams" >Teams</CustomLink>
                    <CustomLink to="/Races" >Races</CustomLink>





                </nav>

            </div>

        </>
    );


}


function CustomLink({ to, children, ...props }) {
    const resolvePath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvePath.pathname, end: false })
    return (
        <Link to={to} {...props}>
            <div className={isActive ? "active" : ""} >
                {children}

            </div>
        </Link>


    );
}

export default Nav;