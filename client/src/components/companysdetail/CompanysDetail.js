import React, { useEffect, useState } from 'react'
import './CompanysDetail.scss'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FollowCompanyBtn from '../FollowCompanyBtn'
import dateFormat from 'dateformat';
import BtnSaveJob from './BtnSaveJob'
import ShareModal from '../ShareModal'
import { BASE_URL } from '../../utils/config'


import logo from '../../images/LogoFPT.png'

const CompanysDetails = () => {

    const { id } = useParams()
    const [company, setCompany] = useState({})

    const { listCompany, auth, allJob } = useSelector(state => state)

    const companies = listCompany.companies ? listCompany.companies : []
    const [jobs, setJobs] = useState([])

    const checkId = (id) => {
        companies.forEach(element => {
            if (element.idCompany === id) {
                setCompany({ ...element })
            }
        });
    }

    const checkJob = () => {
        if (allJob.jobs) {
            const tmp = allJob.jobs.filter(element => element.idCompany === id)
            setJobs([...tmp])
        }
    }

    useEffect(() => {
        checkId(id)
        checkJob()

    }, [id, auth.token, listCompany, allJob])

    //follow


    return (
        <div className="company-detail-view mb-5" onLoad={window.scrollTo(0, 0)}>
            <div className="container">
                <div className="mt-3 text-1">
                    <Link to='/'>Home</Link><span> / </span><Link to='/companys'>Company</Link><span> / {company.companyName}</span>
                </div>
                <div className="company-detail-content mt-3">
                    <div className="row">
                        <div className="col-sm-2 logo-company text-center">
                            <img src={company.logo} alt="logo-company" />
                        </div>
                        <div className="col-sm-7 info-company">
                            <h4 className="name-company">{company.companyName}</h4>
                            <p className="location-company"><i className="fas fa-map-marker-alt"></i> Address: {company.address}</p>
                            <p className="web-company"><i className="fas fa-globe"></i> Website: {company.website}</p>
                            <p className="info-detail">{company.info}</p>
                        </div>
                        <div className="col-sm-3 btn-1 text-center">
                            <FollowCompanyBtn company={company} />
                            <button type="button" className="btn btn btn-light-1 mt-3"><i className="fas fa-share-alt"></i> Share Company</button>
                            <ShareModal url={`${BASE_URL}/companydetail/${company.idCompany}`} />
                        </div>
                    </div>
                </div>
                <div className="vacancie-recruiting mt-3">
                    <h2 className="text-center">Related jobs.</h2>
                    <div className="container">
                        <div className="card">
                            <ul className="card-body">
                                <h3 className="card-title">Found <span>{jobs.length}</span> jobs for this company.</h3>
                                {
                                    jobs.map((element) => (
                                        <>
                                            <li className="content-vacancie-recruiting row mt-3">
                                                <div className="col-sm-9">
                                                    <Link to={`/jobdetail/${element._id}`}><span title={element.position} className="card-title">{element.position}</span></Link>
                                                    <div className="job-info row">
                                                        <div className="col-sm-4 salary">
                                                            <i className="fas fa-dollar-sign"></i><span> Salary: {element.minSalary / 1000000}-{element.maxSalary / 1000000} Triệu</span>
                                                        </div>
                                                        <div className="col-sm-4 location">
                                                            <i className="fas fa-map-marker-alt"></i><span title={element.address}> Location: {element.address}</span>
                                                        </div>
                                                        <div className="col-sm-4 end-date">
                                                            <i className="far fa-clock"></i><span title={dateFormat(element.endDate, 'dd/mm/yyyy')}> Deadline: {dateFormat(element.endDate, 'dd/mm/yyyy')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <BtnSaveJob job={element} />
                                            </li>
                                            <hr />
                                        </>

                                    ))
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default CompanysDetails