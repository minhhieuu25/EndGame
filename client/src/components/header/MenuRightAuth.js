import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'
import NotifyModal from '../NotifyModal'
import Notification from "./notification.svg";
import Message from "./message.svg";

const MenuRightAuth = () => {
    const navLinks = [
        { label: 'FOR EMPLOYERS', title: 'FOR EMPLOYERS', path: '/nhatuyendung' },
    ]

    const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }

    return (
        <div className="menu">
            <ul className="navbar-nav flex-row">
                <li className="nav-item dropdown" style={{ opacity: 1 }} >
                    <span className="nav-link position-relative" id="navbarDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="material-icons"
                            style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>
                            notifications_active
                        </span>
                        <span className="notify_length">{notify.data.length}</span>
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                        style={{ transform: 'translateX(75px)' }}>
                        <NotifyModal />
                    </div>
                </li>

                {/* message */}
                <li className="nav-item dropdown" style={{ opacity: 1 }} >
                    <Link className="" to='/message'>
                        <img src={Message} className="iconImg" alt="" />
                    </Link>
                </li>

                {/* done message */}

                <li className="nav-item dropdown" style={{ opacity: 1 }} >
                    <span className="nav-link dropdown-toggle" id="navbarDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium-avatar" />
                        {auth.user.lastname}
                    </span>
                    <div className="dropdown-menu dropdown_menu-6" aria-labelledby="navbarDropdown" style={{ zIndex: '1000' }}>

                        <Link className="dropdown-item" to={`/account/${auth.user._id}`}>
                            <i className="fas fa-user-cog"></i> Account Setting</Link>

                        {/* isUser moi hien  */}
                        {!auth.isCompany && !auth.isAdmin && <>
                            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                                <i className="fas fa-user"></i> Profile Candidate</Link>
                            <Link className="dropdown-item" to={`/managecv`}>
                                <i className="fas fa-tasks"></i> Manage CV</Link>
                        </>}

                        {/* isCompany moi hien  */}
                        {auth.isCompany && <>
                            <Link className="dropdown-item" to={`/profileCompany/${auth.user._id}`}>
                                <i className="fas fa-user"></i> Profile Company</Link>
                            <Link className="dropdown-item" to={`/dashboard`}>
                                <i className="fas fa-tasks"></i> Manage Company</Link>
                        </>}

                        {/* isAdmin moi hien */}
                        {auth.isAdmin && <>
                            <Link className="dropdown-item" to={`/users`}>
                                <i className="fas fa-tasks"></i> Manage Users</Link>
                            <Link className="dropdown-item" to={`/manage_companies`}>
                                <i className="fas fa-tasks"></i> Manage Companies</Link>
                        </>}


                        {/* <label htmlFor="theme" className="dropdown-item"
                            onClick={() => dispatch({
                                type: GLOBALTYPES.THEME, payload: !theme
                            })}>

                            {theme ? 'Light mode' : 'Dark mode'}
                        </label> */}

                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item logout" to="/"
                            onClick={() => dispatch(logout())}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </Link>
                    </div>
                </li>

                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="font-weight-bold" style={{ color: '#fff' }}>{link.title}</span>
                            </Link>
                        </li>
                    ))
                }

            </ul>
        </div>

    )
}

export default MenuRightAuth
