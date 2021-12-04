import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileCompany } from '../../redux/actions/profileCompanyAction'
import { checkImage } from '../../utils/imageUpload'
// import './Edit.scss'

const EditProfileCompany = ({ data, setOnEdit }) => {
    const initState = {
        companyName: data.companyName, address: data.address, companySize: data.companySize, website: data.website, info: data.info, phoneNumber: data.phoneNumber, taxCode: data.taxCode,
    }
    const [companyData, setCompanyData] = useState(initState)
    const [logo, setLogo] = useState(data.logo)

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [auth.user])


    const changeLogo = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if (err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: err }
        })
        setLogo(file)
    }

    const handleInput = e => {
        const { name, value } = e.target
        setCompanyData({ ...companyData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProfileCompany({ companyData, logo, auth }))
        console.log(companyData)
        console.log(logo)
    }

    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close"
                onClick={() => setOnEdit(false)}>
                Close
            </button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img src={(typeof logo) !== 'string' ? URL.createObjectURL(logo) : data.logo}
                        alt="avatar" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                    {/* <img src={data.logo}
                        alt="avatar" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} /> */}
                    {/* {console.log(typeof logo)} */}
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                            accept="image/*" onChange={changeLogo} />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="fullname">Name Company</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                            name="companyName" value={companyData.companyName} onChange={handleInput} />
                        <small className="text-danger position-absolute"
                            style={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
                            {/* {companyName.length}/25 */}
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" name="phoneNumber" value={companyData.phoneNumber}
                        className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={companyData.address}
                        className="form-control" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label>Company Size</label>
                    <input type="text" className="form-control" name='companySize' value={companyData.companySize} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label>Website</label>
                    <input type="text" className="form-control" name="website" value={companyData.website} onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label>Tax code</label>
                    <input type="text" className="form-control" name="taxCode" value={companyData.taxCode} onChange={handleInput} />
                </div>


                <div className="form-group">
                    <label htmlFor="info">Description</label>
                    <textarea name="info" value={companyData.info} cols="30" rows="4"
                        className="form-control" onChange={handleInput} />

                    <small className="text-danger d-block text-right">
                        {/* {info.length}/200 */}
                    </small>
                </div>


                <button className="btn btn-info w-100" type="submit">Save</button>
                <div className="close-submit" onClick={() => setOnEdit(false)}>
                    &times;
                </div>
            </form>
        </div>
    )
}

export default EditProfileCompany
