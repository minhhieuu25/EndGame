import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'
import EditProfileCompany from './EditProfileCompany'

const Info = ({ id, auth, profile, dispatch }) => {
    const [companyData, setCompanyData] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const { listCompany } = useSelector(state => state)


    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    useEffect(() => {
        // if (id === auth.user._id) {
        //     setCompanyData([auth.user])
        // } else {
        //     const newData = listCompany.companies.filter(user => user._id === id)
        //     setCompanyData(newData)
        // }


        const newData = listCompany.companies.filter(company => id === company.idCompany)

        setCompanyData(newData)

        // dispatch(getProfileCompany(id, auth))

    }, [id, auth, listCompany.companies])


    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true })
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false })
        }
    }, [showFollowers, showFollowing, onEdit, dispatch])


    return (
        <div className="info" onLoad={window.scrollTo(0, 0)}>
            {
                companyData.map(company => (
                    <div className="info_container" key={company.idCompany}>
                        <Avatar src={company.logo} size="supper-avatar" />

                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>{company.companyName}</h2>
                                <button className="btn btn-outline-info"
                                    onClick={() => setOnEdit(true)}>
                                    Edit Profile Company
                                </button>
                            </div>
                            <div className="follow_btn">
                                <span className="mr-4" onClick={() => setShowFollowers(true)}>
                                    {auth.user.followersCompany.length} Followers
                                </span>
                                {/* <span className="ml-4" onClick={() => setShowFollowing(true)}>
                                    {company.following.length} Following
                                </span> */}
                            </div>

                            {/* <h6>{company.companyName} <span className="text-danger">{company.phoneNumber}</span></h6>
                            <p className="m-0">{company.address}</p> */}
                            <h6 className="m-0">{company.email}</h6>
                            <a href={company.website} target="_blank" rel="noreferrer">
                                {company.website}
                            </a>
                            <p>{auth.user.email}</p>
                        </div>

                        {
                            onEdit && <EditProfileCompany data={company} setOnEdit={setOnEdit} />
                        }

                        {/* {
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
                        } */}

                        {/* company */}
                        <div className="col-xl-12 order-xl-1" style={{ margin: '20px auto' }}>
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
                                        <h6 className="heading-small text-muted mb-4">Company information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-companyName">Company Name</label>
                                                        <input type="text" id="input-companyName" className="form-control" defaultValue={company.companyName} placeholder="Company Name" readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-industry">Industry</label>
                                                        <input type="text" id="input-industry" className="form-control" defaultValue={company.industry} placeholder="Industry" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-company-size">Company Size</label>
                                                        <input type="text" id="input-company-size" className="form-control" defaultValue={company.companySize} placeholder="Company Size" readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-website">Website</label>
                                                        <input type="text" id="input-website" className="form-control" defaultValue={company.website} placeholder="Website" readOnly />
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
                                                        <input id="input-address" className="form-control" placeholder="Home Address" readOnly defaultValue={company.address} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="input-phone-number">Phone Number</label>
                                                        <input type="text" id="input-phone-number" defaultValue={company.phoneNumber} className="form-control" readOnly placeholder="Phone number" />
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
                                        <h6 className="heading-small text-muted mb-4">About company</h6>
                                        <div className="pl-lg-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Description about company</label>
                                                <textarea rows={4} className="form-control" placeholder="A few words about your company ..." readOnly defaultValue={company.info} />
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
