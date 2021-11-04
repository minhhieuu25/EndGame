import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MessageAuth = () => {

    const [typeContent, setTypeContent] = useState(false)
    const { auth } = useSelector(state => state)

    return (
        <>
            {auth.token ?
                <div className="message-auth">
                    <div className="card">
                        <div className="header-message" onClick={() => setTypeContent(!typeContent)}>
                            <span>Message</span>
                            <span className="right-header">
                                <Link to="/message"><i className="fab fa-facebook-messenger"></i></Link>
                                {typeContent ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                            </span>
                        </div>
                        <div className="content-message" style={{ display: `${typeContent ? 'block' : 'none'}` }}>
                            <span>Connect with others on RankWorks by beginning a new conversation.</span>
                            <Link to="/message">
                                <button className="btn btn-new">New message</button>
                            </Link>
                        </div>
                    </div>
                </div> : null
            }
        </>
    )
}

export default MessageAuth
