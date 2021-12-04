import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { upgradeAccount } from '../../redux/actions/authAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { checkImage } from '../../utils/imageUpload';
import Profile from './Profile';



const CompanyInfor = () => {

    const { auth, socket } = useSelector(state => state)
    const [logo, setLogo] = useState('')
    const [companySize, setSize] = useState('10-')

    const initState = {
        companyName: '',
        address: '',
        industry: '',
        info: '',
        website: '',
        email: '',
        phoneNumber: '',
        taxCode: ''
    }
    const [company, setCompany] = useState(initState)

    const handleInput = e => {
        const { name, value } = e.target
        setCompany({ ...company, [name]: value })
        console.log(company)
    }

    const dispatch = useDispatch()

    const changeAvatar = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if (err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: err }
        })
        setLogo(file)
    }

    const handleUpgrade = () => {
        dispatch(upgradeAccount(company, logo, companySize, auth, socket))
    }
    return (
        <>
            <Profile handleInput={handleInput} changeAvatar={changeAvatar} values={company} setSize={setSize} />
            <div className="mt-3 mb-5">
                <button type="button" class="btn btn-lg btn-primary mr-3" onClick={handleUpgrade}>Upgrade</button>
                <Link to='/nhatuyendung'><button type="button" class="btn btn-lg btn-primary">Cancel</button></Link>
            </div>
        </>
    )
}

export default CompanyInfor
