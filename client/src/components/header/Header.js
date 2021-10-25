import React from 'react'
import { Link } from 'react-router-dom'
import MenuLeft from './MenuLeft'
import MenuRight from './MenuRight'
import MenuRightAuth from './MenuRightAuth'
import logo from './logo.png';
import { useSelector, useDispatch } from 'react-redux'


const Header = () => {
    const { auth, status, modal, call } = useSelector(state => state)

    return (
        <div className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <Link to="/" className="logo">
                        <img className='logo' src={logo} alt='logo' onClick={() => window.scrollTo({ top: 0 })} />
                    </Link>
                    <div className="header-content">
                        <MenuLeft />
                        {auth.token ? <MenuRightAuth /> : <MenuRight />}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header
