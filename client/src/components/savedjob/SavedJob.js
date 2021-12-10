import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './SavedJob.scss'
import dateFormat from 'dateformat'
import SubmitCVModal from '../submitcvmodal/SubmitCVModal'
import FollowCompanyBtn from '../FollowJobBtn'

const SavedJob = () => {
    const { auth, allJob } = useSelector(state => state)
    const [infoSavedJob, setSavedJob] = useState([])
    const [ShowSubmitCV, setShowSubmitCV] = useState(false)
    useEffect(() => {
        const jobs = allJob.jobs ? allJob.jobs : []
        const savedJob = auth.user.followJob ? auth.user.followJob : []
        let arr = []
        jobs.filter(element => {
            savedJob.map(idJob => {
                if (element._id === idJob) {
                    arr = [...arr, element]
                }
            })
        })
        setSavedJob([...arr])
    }, [auth.user])

    return (
        <div className="saved-job-view container">
            <h3 className="text-center mt-3">Manage Saved Jobs</h3>
            <div className="saved-job-content card mt-3">
                <div className="card-body">
                    <div className="saved-job-list">
                        {
                            infoSavedJob.map(element => (
                                <div className="list-jobs">
                                    <div className="row">
                                        <div className="col-sm-9">
                                            <div className="name-job">
                                                <Link to={`/jobdetail/${element._id}`}><span>{element.position}</span></Link>
                                            </div>
                                            <div className="name-company">
                                                <Link to={`/companydetail/${element.idCompany}`}><span >{element.companyName}</span></Link>
                                            </div>
                                            <div className="row mt-1">
                                                <div className="col-sm-4">
                                                    <span className="font-weight-bold">Salary: </span><span> {element.minSalary / 1000000} - {element.maxSalary / 1000000} Million</span>
                                                </div>
                                                <div className="col-sm-4">
                                                    <span className="font-weight-bold">Location: </span><span> {element.address}</span>
                                                </div>
                                                <div className="col-sm-4">
                                                    <span className="font-weight-bold text-danger">Expired: </span><span> {dateFormat(element.endDate, 'dd/mm/yyyy')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="btn-saved-job mt-3">
                                                {/* <Link><button type="button" className="btn btn-apply-job"><i className="far fa-paper-plane"></i> Apply</button></Link>
                                                <button type="button" className="btn btn-unsave-job"><i className="far fa-heart"></i> Unsave</button> */}
                                                <button type="button" className="btn btn-apply-job" onClick={() => setShowSubmitCV(true)}><i className="far fa-paper-plane"></i> Apply</button>
                                                {
                                                    ShowSubmitCV &&
                                                    <SubmitCVModal
                                                        setShowSubmitCV={setShowSubmitCV}
                                                        job={element} />
                                                }
                                                <FollowCompanyBtn job={element} />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />

                                </div>
                            ))
                        }

                        {/* <div className="list-jobs">
                            <div className="row">
                                <div className="col-sm-9">
                                    <div className="name-job">
                                        <Link><span>FullStack Developer ReactJS</span></Link>
                                    </div>
                                    <div className="name-company">
                                        <Link><span >FPT Software Da nang</span></Link>
                                    </div>
                                    <div className="row mt-1">
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold">Salary: </span><span> 12 - 15 Million</span>
                                        </div>
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold">Location: </span><span> Da Nang</span>
                                        </div>
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold text-danger">Expired: </span><span> 21-11-2021</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="btn-saved-job mt-3">
                                        <Link><button type="button" className="btn btn-apply-job"><i className="far fa-paper-plane"></i> Apply</button></Link>
                                        <button type="button" className="btn btn-unsave-job"><i className="far fa-heart"></i> Unsave</button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedJob
