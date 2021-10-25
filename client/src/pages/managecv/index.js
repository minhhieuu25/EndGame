import React, { useEffect, useState } from 'react'
import ManageCV from '../../components/managecv/ManageCV'
import { useSelector, useDispatch } from 'react-redux'
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
