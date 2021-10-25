import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { followJob, unFollowJob, followCompany, unFollowCompany } from '../redux/actions/profileCompanyAction'
import { refreshToken } from '../redux/actions/authAction'
import './FollowBtn.scss'


const FollowCompanyBtn = ({ job }) => {
    const [followed, setFollowed] = useState(false)

    const { auth, profile, socket } = useSelector(state => state)
    const dispatch = useDispatch()



    const [load, setLoad] = useState(false)



    useEffect(() => {

        if (auth.user.followJob.find(item => item === job._id)) {
            return setFollowed(true)
        }

        return () => setFollowed(false)
    }, [auth.user.followJob, job._id, dispatch])

    const handleFollow = async () => {
        if (load) return;

        setFollowed(true)
        setLoad(true)
        await dispatch(followJob({ job, auth, socket }))

        setLoad(false)
    }

    const handleUnFollow = async () => {
        if (load) return;

        setFollowed(false)
        setLoad(true)
        await dispatch(unFollowJob({ job, auth, socket }))
        // await dispatch(unfollow({ users: profile.users, company, auth, socket }))
        setLoad(false)
    }

    return (
        <>
            {
                followed
                    ? <button className="btn btn-unfollow mt-3"
                        onClick={handleUnFollow}>
                        <i class="far fa-heart"></i> Unfollow Job
                    </button>
                    : <button className="btn btn-follow mt-3"
                        onClick={handleFollow}>
                        <i class="far fa-heart"></i> Follow Job
                    </button>
            }
        </>
    )
}

export default FollowCompanyBtn
