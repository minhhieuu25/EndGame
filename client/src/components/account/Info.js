import React, { useState, useEffect } from 'react'
import Avatar from '../Avatar'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Following from './Following'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Info = ({ id, auth, profile, dispatch }) => {
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user])
        } else {
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])


    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true })
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false })
        }
    }, [showFollowers, showFollowing, onEdit, dispatch])


    return (
        <div className="info">
            {
                userData.map(user => (
                    <div>
                        <div className="info_container" key={user._id}>
                            <Avatar src={user.avatar} size="supper-avatar" />

                            <div className="info_content">
                                <div className="info_content_title">
                                    <h2>{user.username}</h2>
                                    {
                                        user._id === auth.user._id
                                            ? <button className="btn btn-outline-info"
                                                onClick={() => setOnEdit(true)}>
                                                Edit Account
                                            </button>

                                            : <FollowBtn user={user} />
                                    }
                                </div>

                                <div className="follow_btn">
                                    <span className="mr-4" onClick={() => setShowFollowers(true)}>
                                        {user.followers.length} Followers
                                    </span>
                                    <span className="ml-4" onClick={() => setShowFollowing(true)}>
                                        {user.following.length} Following
                                    </span>
                                </div>

                                <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                                <p className="m-0">{user.address}</p>
                                <h6 className="m-0">{user.email}</h6>
                                <a href={user.website} target="_blank" rel="noreferrer">
                                    {user.website}
                                </a>
                                {/* <p>{user.story}</p> */}
                            </div>

                            {
                                onEdit && <EditProfile setOnEdit={setOnEdit} />
                            }

                            {
                                showFollowers &&
                                <Followers
                                    users={user.followers}
                                    setShowFollowers={setShowFollowers}
                                />
                            }
                            {
                                showFollowing &&
                                <Following
                                    users={user.following}
                                    setShowFollowing={setShowFollowing}
                                />
                            }
                        </div>

                        <div className="col-xl-20 order-xl-1" style={{ margin: '20px 0px' }}>
                            <div className="card">
                                {/* <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h3 className="mb-0">Edit profile </h3>
                                        </div>
                                        <div className="col-4 text-right">
                                            <a href="#!" className="btn btn-sm btn-primary">Settings</a>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">Account information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-username">Fullname</label>
                                                        <input type="text" id="input-username" className="form-control" placeholder="Username" defaultValue={user.fullname} />
                                                    </div>
                                                </div>
                                                {/* <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-email">User name</label>
                                                        <input type="email" id="input-email" className="form-control" defaultValue={user.username} />
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-first-name">Email</label>
                                                        <input type="text" id="input-first-name" className="form-control" defaultValue={user.email} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-last-name">Mobile</label>
                                                        <input type="text" id="input-last-name" className="form-control" defaultValue={user.mobile} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">Contact information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-address">Address</label>
                                                        <input id="input-address" className="form-control" placeholder="Home Address" defaultValue={user.address} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-city">Gender</label>
                                                        <input type="text" id="input-city" className="form-control" placeholder="City" defaultValue={user.gender} />
                                                    </div>
                                                </div>
                                                {/* <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-country">Country</label>
                                                        <input type="text" id="input-country" className="form-control" placeholder="Country" defaultValue="United States" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-country">Postal code</label>
                                                        <input type="number" id="input-postal-code" className="form-control" placeholder="Postal code" />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Description */}
                                        <h6 className="heading-small text-muted mb-4">About me</h6>
                                        <div className="pl-lg-4">
                                            <div className="form-group">
                                                <label className="form-control-label">About Me</label>
                                                <textarea rows={4} className="form-control" placeholder="A few words about you ..." defaultValue={user.story} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }
        </div>
    )
}

export default Info
