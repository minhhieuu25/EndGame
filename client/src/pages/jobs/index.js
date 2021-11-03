import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import JobsComponent from '../../components/jobs/JobsComponent';
import SearchJob from '../../components/jobs/SearchJob';
import './job.scss';

const limit = 5

const Job = () => {
    const { allJob, auth } = useSelector(state => state)
    const initDataShow = allJob.jobs ? allJob.jobs : allJob.searchJob ? allJob.searchJob : [];
    const [dataShow, setDataShow] = useState(initDataShow)

    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(refreshToken())
        // dispatch(getAllJob())
        selectPage(0)
    }, [dispatch, auth.token, allJob.searchJob, allJob.jobs])

    let pages = 1
    let range = []

    if (limit !== undefined) {
        let page = Math.floor(initDataShow.length / Number(limit))
        pages = initDataShow.length % Number(limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]
    }

    const [currPage, setCurrPage] = useState(0)

    const selectPage = page => {
        const start = Number(limit) * page
        const end = start + Number(limit)

        setDataShow(initDataShow.slice(start, end))

        setCurrPage(page)
    }

    return (
        <div className="job-view mb-5" onLoad={window.scrollTo(0, 0)}>
            <SearchJob />
            <div className="container">
                <div className="mt-3 text-1">
                    <Link to='/'>Home</Link><span> / Jobs</span>
                </div>
                <div className="job-content mt-3 card">
                    <div className="card-body">
                        <h3>Found <span>{initDataShow.length}</span> matching jobs</h3>
                        <div className="row">
                            <div className="job-list card-body">
                                {
                                    dataShow.map((item, index) => (
                                        <>
                                            <div className="job-list-li row" key={index}>
                                                <JobsComponent
                                                    position={item.position}
                                                    companyName={item.companyName}
                                                    address={item.address}
                                                    minSalary={item.minSalary}
                                                    maxSalary={item.maxSalary}
                                                    idJob={item._id}
                                                    idCompany={item.idCompany}
                                                    endDate={item.endDate}
                                                    logo={item.logo}
                                                />
                                            </div>
                                            <hr />
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            pages > 1 ? (
                                <div className="table__pagination">
                                    {
                                        range.map((item, index) => (
                                            <div key={index} className={`table__pagination-item ${currPage === index ? 'active' : ''}`} onClick={() => selectPage(index)}>
                                                {item + 1}
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Job;