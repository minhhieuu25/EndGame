import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import CompanysDetails from '../../components/companysdetail/CompanysDetail'

const CompanyDetail = () => {
    return (
        <>
            <CompanysDetails />
        </>
    )
}

export default CompanyDetail
