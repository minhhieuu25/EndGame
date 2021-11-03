import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ManageCV from '../../components/managecv/ManageCV'
import { getAllResume } from '../../redux/actions/resumeAction'

const ManageCVs = () => {

    const { auth } = useSelector(state => state)


    const dispatch = useDispatch()
    useEffect(async () => {
        await dispatch(getAllResume(auth))
    }, [])

    return (
        <>
            <ManageCV />
        </>
    )
}

export default ManageCVs
