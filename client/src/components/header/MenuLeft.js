import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const MenuLeft = () => {

    const navLinks = [
        { label: 'Jobs', title: 'Jobs', path: '/jobs' },
        { label: 'Companies', title: 'Companies', path: '/companys' },
    ]

    const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }

    return (
        <div className="menu left">
            <ul className="navbar-nav flex-row">
                {

                    navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="">{link.title}</span>
                            </Link>
                        </li>
                    ))
                }
                {!auth.isCompany && !auth.isAdmin &&
                    <li className={`nav-item px-2 ${isActive('/createCV')}`} >
                        <Link className="nav-link" to='/createCV'>
                            <span className="">Create CV</span>
                        </Link>
                    </li>
                }

            </ul>
        </div>

    )
}

export default MenuLeft
