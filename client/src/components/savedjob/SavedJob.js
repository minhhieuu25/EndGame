import React from 'react'
import { Link } from 'react-router-dom'
import './SavedJob.scss'

const SavedJob = () => {
    return (
        <div className="saved-job-view container">
            <h3 className="text-center mt-3">Manage Saved Jobs</h3>
            <div className="saved-job-content card mt-3">
                <div className="card-body">
                    <div className="saved-job-list">
                        <div className="list-jobs">
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
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedJob
