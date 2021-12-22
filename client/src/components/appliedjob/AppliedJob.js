import dateFormat from 'dateformat'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './AppliedJob.scss'
import { unSubmit, getListSubmited } from '../../redux/actions/sumitedAction'

const AppliedJob = () => {

    const { allJob, submited, auth } = useSelector(state => state)
    const [dataJob, setDataJob] = useState([])
    const [dataSubmited, setDataSubmited] = useState([])
    const dispatch = useDispatch()

    const handleDelete = (idJob) => {
        dispatch(unSubmit(idJob, auth))
    }

    useEffect(() => {
        dispatch(getListSubmited(auth))
        const jobs = allJob.jobs ? allJob.jobs : []
        const jobSubmited = submited.submited ? submited.submited : []
        let arr = []
        jobs.filter(dataJob => {
            jobSubmited.map(dataCv => {
                if (dataJob._id === dataCv.idJob) {
                    let tmp = { ...dataJob }
                    dataCv.cv.map(element => {
                        if (element.idCandidate === auth.user._id)
                            tmp = { ...tmp, "status": element.status, 'dateSubmit': element.dateSubmit }
                    })
                    arr = [...arr, tmp]
                }
            })
        })
        setDataJob([...arr])
        setDataSubmited(submited.submited)
    }, [submited])

    return (
        <div className="applied-job-view container" onLoad={window.scrollTo(0, 0)}>
            <h3 className="text-center mt-3">Manage Applied Jobs</h3>
            <div className="applied-job-content card mt-3">
                <div className="card-body">
                    {
                        dataJob.map(element => (
                            <div className="applied-job-list">
                                <div className="list-jobs">
                                    <div className="row">
                                        <div className="col-sm-9">
                                            <div className="name-job">
                                                <Link to={`/jobdetail/${element._id}`}><span>{element.position}</span></Link>
                                            </div>
                                            <div className="name-company">
                                                <Link to={`/companydetail/${element.idCompany}`}><span >{element.companyName}</span></Link>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <span className="font-weight-bold">Status: </span><span style={{ color: 'green' }}>{element.status}</span>
                                                </div>
                                                <div className="col-sm-4">
                                                    <span className="font-weight-bold">Applied on: </span><span>{dateFormat(element.dateSubmit, 'dd/mm/yyyy')}</span>
                                                </div>
                                                <div className="col-sm-4">
                                                    <span className="font-weight-bold text-danger">Expired: </span><span> {dateFormat(element.endDate, 'dd/mm/yyyy')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="btn-applied-job mt-3">
                                                <button type="button" className="btn btn-applied-job-1" onClick={e => handleDelete(element._id)}><i className="far fa-trash-alt"></i> Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default AppliedJob
