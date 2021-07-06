import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"

export const Navbar = () => {
    const {logout, isLogin} = useContext(AuthContext)
    return (
        <nav>
            <div className="nav-wrapper blue">
                {isLogin
                    ? <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to='/contacts'>Contacts</Link></li>
                        <li><Link to='/favorites'>Favorites</Link></li>
                        <li><Link to='/' onClick={logout}>Logout</Link></li>
                    </ul>
                    : <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to='/'>Login</Link></li>
                    </ul>
                }
            </div>
        </nav>
    )
}