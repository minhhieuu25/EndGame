import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTypeJob } from '../../../redux/actions/homeJobAction';
import './JobType.scss';


const JobType = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        try {
            // dispatch(getAllJob())
            dispatch(getTypeJob())
        } catch (err) {
            console.log(err)
        }
    }, [])

    const { homeJobReducer } = useSelector(state => state)



    const jobIntership = homeJobReducer.jobInternship ? homeJobReducer.jobInternship : []
    const jobPartTime = homeJobReducer.jobPartTime ? homeJobReducer.jobPartTime : []
    const jobFullTime = homeJobReducer.jobFullTime ? homeJobReducer.jobFullTime : []


    return (
        <div className="job-best mt-5">
            <div className="container">
                <h2 className="text-center">The Best Jobs</h2>
                <h2 className="text-center text-2"></h2>
                <div className="row">
                    <div className="col-sm-4 mt-3">
                        <div className="job-box card">
                            <div className="text-title text-uppercase card-header">
                                <i className="far fa-clock"></i>Intership
                            </div>
                            <div className="list-job card-body">
                                {
                                    jobIntership.map((job) => (
                                        <>
                                            <div className="job-over-item row">
                                                <div className="col-3">
                                                    <img src={job.logo} alt='' />
                                                </div>
                                                <div className="col-9">
                                                    <div className="name-job">
                                                        <Link to={`/jobdetail/${job._id}`}>
                                                            <span title={job.position}>{job.position}</span>
                                                        </Link>
                                                    </div>
                                                    <div className="name-company">
                                                        <Link to={`/companydetail/${job.idCompany}`}>
                                                            <span title={job.companyName}>{job.companyName}</span>
                                                        </Link>
                                                    </div>
                                                    <div className="row job-info">
                                                        <div className="salary col-6">
                                                            <i className="fas fa-dollar-sign"></i>
                                                            <span>{job.minSalary / 1000000}-{job.maxSalary / 1000000} M</span>
                                                        </div>
                                                        <div title={job.address} className="location col-6">
                                                            <i className="fas fa-map-marker-alt"></i>{job.address}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 mt-3">
                        <div className="job-box card">
                            <div className="text-title text-uppercase card-header">
                                <i className="fas fa-stopwatch"></i>Part-time
                            </div>
                            <div className="list-job card-body">
                                {
                                    jobPartTime.map((job) => (
                                        <>
                                            <div className="job-over-item row">
                                                <div className="col-3">
                                                    <img src={job.logo} alt='' />
                                                </div>
                                                <div className="col-9">
                                                    <div className="name-job">
                                                        <Link to={`/jobdetail/${job._id}`}>
                                                            <span title={job.position}>{job.position}</span>
                                                        </Link>
                                                    </div>
                                                    <div className="name-company">
                                                        <Link to={`/companydetail/${job.idCompany}`}>
                                                            <span title={job.companyName}>{job.companyName}</span>
                                                        </Link>
                                                    </div>
                                                    <div className="row job-info">
                                                        <div className="salary col-6">
                                                            <i className="fas fa-dollar-sign"></i>
                                                            <span>{job.minSalary / 1000000}-{job.maxSalary / 1000000} M</span>
                                                        </div>
                                                        <div className="location col-6">
                                                            <i className="fas fa-map-marker-alt"></i>
                                                            <span title={job.address}>{job.address}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 mt-3">
                        <div className="job-box card">
                            <div className="text-title text-uppercase card-header">
                                <i className="fas fa-stopwatch"></i>Full-time
                            </div>
                            <div className="list-job card-body">
                                {
                                    jobFullTime.map((job) => (
                                        <>
                                            <div className="job-over-item row">
                                                <div className="col-3">
                                                    <img src={job.logo} alt='' />
                                                </div>
                                                <div className="col-9">
                                                    <div className="name-job">
                                                        <Link to={`/jobdetail/${job._id}`}>
                                                            <span title={job.position}>{job.position}</span>
                                                        </Link>
                                                    </div>
                                                    <div className="name-company">
                                                        <Link to={`/companydetail/${job.idCompany}`}>
                                                            <span title={job.companyName}>{job.companyName}</span>
                                                        </Link>
                                                    </div>
                                                    <div className="row job-info">
                                                        <div className="salary col-6">
                                                            <i className="fas fa-dollar-sign"></i>
                                                            <span>{job.minSalary / 1000000}-{job.maxSalary / 1000000} M</span>
                                                        </div>
                                                        <div className="location col-6">
                                                            <i className="fas fa-map-marker-alt"></i>
                                                            <span title={job.address}>{job.address}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default JobType;