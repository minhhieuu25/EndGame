import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { followCompany, unFollowCompany } from '../redux/actions/profileCompanyAction'
import { refreshToken } from '../redux/actions/authAction'
import { useParams } from 'react-router'
import { getDataAPI } from '../utils/fetchData'

import './FollowBtn.scss'
import Company from '../pages/companys'



const FollowCompanyBtn = ({ company }) => {
    const [followed, setFollowed] = useState(false)
    // const id = useParams()

    const { auth, profile, socket, listCompany } = useSelector(state => state)
    const dispatch = useDispatch()


    const [load, setLoad] = useState(false)


    useEffect(() => {
        if (auth.user.followCompany.find(item => item === company.idCompany)) {
            return setFollowed(true)
        }

        return () => setFollowed(false)
    }, [auth.user.followCompany, company.idCompany, dispatch, listCompany])

    const handleFollow = async () => {
        if (load) return;

        setFollowed(true)
        setLoad(true)
        await dispatch(followCompany({ company, auth, socket }))

        setLoad(false)
    }

    const handleUnFollow = async () => {
        if (load) return;

        setFollowed(false)
        setLoad(true)
        await dispatch(unFollowCompany({ company, auth, socket }))
        setLoad(false)
    }

    return (
        <>
            {
                followed
                    ? <button type="button" className="btn btn-unfollow mt-3"
                        onClick={handleUnFollow}>
                        <i class="far fa-heart"></i> Unfollow
                    </button>
                    : <button type="button" className="btn btn-follow mt-3"
                        onClick={handleFollow}>
                        <i class="far fa-heart"></i> Follow
                    </button>
            }
        </>
    )
}

export default FollowCompanyBtn
