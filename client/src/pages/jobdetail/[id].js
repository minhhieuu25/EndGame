import React, { useEffect, useState } from 'react'

import Info from '../../components/profileCompany/Info'
import Posts from '../../components/profileCompany/Posts'
import Saved from '../../components/profileCompany/Saved'

import { useSelector, useDispatch, useStore } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import JobsDetail from '../../components/jobsdetail/JobsDetail'


const JobDetail = () => {
    return (
        <>
            <JobsDetail />
        </>
    )
}
export default JobDetail
