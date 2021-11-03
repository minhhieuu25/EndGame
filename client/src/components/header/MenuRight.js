import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const MenuRight = () => {
    const navLinks = [
        { label: 'Register', title: 'Register', path: '/register' },
        { label: 'Login', title: 'Login', path: '/login' },
        { label: 'FOR EMPLOYERS', title: 'FOR EMPLOYERS', path: '/nhatuyendung' }
    ]

    const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }

    return (
        <div className="menu right">
            <ul className="navbar-nav flex-row">
                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="font-weight-bold">{link.title}</span>
                            </Link>
                        </li>
                    ))
                }

            </ul>
        </div>

    )
}

export default MenuRight
