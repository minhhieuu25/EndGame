import React from 'react'
import { Link } from 'react-router-dom'
import './AppliedJob.scss'

const AppliedJob = () => {
    return (
        <div className="applied-job-view container" onLoad={window.scrollTo(0, 0)}>
            <h3 className="text-center mt-3">Manage Applied Jobs</h3>
            <div className="applied-job-content card mt-3">
                <div className="card-body">
                    <div className="applied-job-list">
                        <div className="list-jobs">
                            <div className="row">
                                <div className="col-sm-9">
                                    <div className="name-job">
                                        <Link><span>FullStack Developer ReactJS</span></Link>
                                    </div>
                                    <div className="name-company">
                                        <Link><span >FPT Software Da nang</span></Link>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold">Status: </span><span style={{ color: 'green' }}> Approved</span>
                                        </div>
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold">Applied on: </span><span> 01-11-2021</span>
                                        </div>
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold text-danger">Expired: </span><span> 21-11-2021</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="btn-applied-job mt-3">
                                        <button type="button" className="btn btn-applied-job-1"><i className="far fa-trash-alt"></i> Delete</button>
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

export default AppliedJob
