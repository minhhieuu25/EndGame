import dateFormat from 'dateformat'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import FollowCompanyBtn from '../FollowJobBtn'
import SearchJob from '../jobs/SearchJob'
import SubmitCVModal from '../submitcvmodal/SubmitCVModal'
import './JobsDetail.scss'
import ShareModal from '../ShareModal'
import { BASE_URL } from '../../utils/config'

const JobsDetail = () => {


    const { id } = useParams()
    const [job, setJob] = useState({})
    const [ShowSubmitCV, setShowSubmitCV] = useState(false)

    const { allJob, auth, socket } = useSelector(state => state)
    const [typeShare, setTypeShare] = useState(false)
    const jobs = allJob.jobs ? allJob.jobs : allJob.searchJob ? allJob.searchJob : []

    const checkId = (id) => {
        jobs.forEach(element => {
            if (element._id === id) {
                setJob({ ...element })
            }
        });
    }

    useEffect(() => {
        checkId(id)
        console.log(job)
    }, [id, auth.token, allJob])


    return (
        <div className="job-detail-view mb-5" onLoad={window.scrollTo(0, 0)}>
            <SearchJob />
            <div className="container">
                <div className="mt-3 text-1">
                    <Link to='/'>Home</Link><span> / </span><Link to='/jobs'>Jobs</Link><span> / {job.position}</span>
                </div>
                <div className="card mt-3 job-content">
                    <div className="card-body">
                        <h3 className="card-title">{job.position}</h3>
                        <div className="name-company mb-2">
                            <Link title={job.companyName} to={`/companydetail/${job.idCompany}`}>{job.companyName}</Link>
                        </div>

                        <div className="row">
                            <div className="col-sm-8">
                                <div className="card job-content-2">
                                    <div className="card-body row">
                                        <div className="col-sm-6">
                                            <div className="content-detail">
                                                <div className="icon-left">
                                                    <i className="fas fa-dollar-sign"></i>
                                                </div>
                                                <div className="info-detail">
                                                    <span className="title-3">Salary:</span>
                                                    <span>{job.minSalary / 1000000}-{job.maxSalary / 1000000} Million</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="content-detail">
                                                <div className="icon-left">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div className="info-detail">
                                                    <span className="title-3">Location:</span>
                                                    <span>{job.address}</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="content-detail">
                                                <div className="icon-left">
                                                    <i className="fas fa-user"></i>
                                                </div>
                                                <div className="info-detail">
                                                    <span className="title-3">Level:</span>
                                                    <span>{job.level}</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="content-detail">
                                                <div className="icon-left">
                                                    <i className="far fa-id-card"></i>
                                                </div>
                                                <div className="info-detail">
                                                    <span className="title-3">Job type:</span>
                                                    <span>{job.jobType}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="content-detail">
                                                <div className="icon-left">
                                                    <i className="fas fa-bars"></i>
                                                </div>
                                                <div className="info-detail">
                                                    <span className="title-3">Job Category:</span>
                                                    <span>{job.industry}</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="content-detail">
                                                <div className="icon-left">
                                                    <i className="fas fa-briefcase"></i>
                                                </div>
                                                <div className="info-detail">
                                                    <span className="title-3">Exp requirements:</span>
                                                    <span>{job.experience}</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="content-detail">
                                                <div className="icon-left">
                                                    <i className="far fa-clock"></i>
                                                </div>
                                                <div className="info-detail">
                                                    <span className="title-3">Date created:</span>
                                                    <span>{dateFormat(job.createdAt, 'dd/mm/yyyy')}</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="content-detail">
                                                <div className="icon-left">
                                                    <i className="far fa-clock"></i>
                                                </div>
                                                <div className="info-detail">
                                                    <span className="title-3">Expires on:</span>
                                                    <span>{dateFormat(job.endDate, 'dd/mm/yyyy')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                {auth.isCompany ?
                                    <div className="job-btn">
                                        <button type="button" className="btn btn-info btn-lg mb-3" onClick={() => setShowSubmitCV(true)} disabled={true}><i className="far fa-paper-plane"></i> APPLY NOW</button>
                                        {
                                            ShowSubmitCV &&
                                            <SubmitCVModal
                                                setShowSubmitCV={setShowSubmitCV}
                                                job={job} />
                                        }
                                        <FollowCompanyBtn job={job} />
                                        {/* <button type="button" disabled={true} className="btn btn-secondary btn-lg mt-3" ><i className="fas fa-share-alt" ></i> Share Job</button> */}
                                        <button type="button" className="btn btn-secondary btn-lg mt-3" onClick={() => setTypeShare(!typeShare)}><i className="fas fa-share-alt"></i> Share Job</button>
                                        <div className="item-share" style={{ display: `${typeShare ? 'block' : 'none'}` }}>
                                            <ShareModal url={`${BASE_URL}/jobdetail/${job._id}`} />
                                        </div>
                                    </div> :
                                    <div className="job-btn">
                                        <button type="button" className="btn btn-info btn-lg mb-3" onClick={() => setShowSubmitCV(true)}><i className="far fa-paper-plane"></i> APPLY NOW</button>
                                        {
                                            ShowSubmitCV &&
                                            <SubmitCVModal
                                                setShowSubmitCV={setShowSubmitCV}
                                                job={job} />
                                        }
                                        <FollowCompanyBtn job={job} />
                                        {/* <button type="button" className="btn btn-secondary btn-lg mt-3"><i className="fas fa-share-alt"></i> Share Job</button> */}
                                        <button type="button" className="btn btn-secondary btn-lg mt-3" onClick={() => setTypeShare(!typeShare)}><i className="fas fa-share-alt"></i> Share Job</button>
                                        <div className="item-share" style={{ display: `${typeShare ? 'block' : 'none'}` }}>
                                            <ShareModal url={`${BASE_URL}/jobdetail/${job._id}`} />
                                        </div>
                                    </div>
                                }
                            </div>

                        </div>
                        <div className="job-desription">
                            <h5 className="mt-3 text-uppercase">Job Description</h5>
                            <div className="job-desription-content">
                                <span>
                                    {/* 1/ C??NG T??C QU???N L?? CHUNG <br />
                                    - Qu???n l??, ??i???u h??nh to??n b??? ho???t ?????ng c???a Ph??ng trong l??nh v???c kinh doanh;<br />
                                    - X??y d???ng, tr??nh duy???t v?? tri???n khai th???c hi???n k??? ho???ch kinh doanh h??ng th??ng, qu??, n??m c???a c??ng ty;<br />
                                    - Tham gia x??y d???ng h??? th???ng qu???n tr??? nh??n s???, x??y d???ng h??? th???ng quy tr??nh theo quy ?????nh c???a c??ng ty<br />
                                    - T??? ch???c, tri???n khai v?? gi??m s??t nh??n vi??n th???c hi???n k??? ho???ch kinh doanh; theo d??i;<br />
                                    - T??? ch???c v?? qu???n l?? h??? th???ng d??? li???u Kh??ch h??ng c???a C??ng ty;<br />
                                    - B??o c??o k???t qu??? doanh h??ng th??ng ho???c khi c?? y??u c???u;<br />
                                    - H??ng th??ng, h??ng qu??, ????nh gi?? hi???u qu??? c??ng vi???c c???a ph??ng Kinh doanh g???i cho Gi??m ?????c;<br />
                                    - L??n k??? ho???ch ????o t???o, tuy???n d???ng Nh??n s??? & ng??n s??ch d??? tr?? cho c??c ho???t ?????ng c???a Ph??ng;<br />
                                    - Ph???i h???p v???i Ph??ng Marketing tri???n khai k??? ho???ch MKT nh???m ph???c v??? ho???t ?????ng b??n h??ng */}
                                    {
                                        job.description
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="job-requirements">
                            <h5 className="mt-3 text-uppercase">JOB REQUIREMENTS</h5>
                            <div className="job-requirements-content">
                                <span>
                                    {/* 1. Y??u c???u s??? d???ng th??nh th???o c??c ph???n m???m thi???t k??? Autocad<br />
                                    2. C?? kinh nghi???m l??m QS 1 n??m tr??? l??n<br />
                                    3. T??? m???, c???n th???n<br />
                                    4. C?? tinh th???n h???c h???i v?? c???u ti???n<br />
                                    5. C?? th??? l??m t??ng ca<br />
                                    6. C?? mong mu???n g???n b?? l??u d??i v???i c??ng ty */}
                                    {job.requirement}
                                    <br />
                                    <h5 className="mt-3 text-uppercase">Skill</h5>
                                    {job.skill && job.skill.map(element => (
                                        <span>- {element.title}<br /></span>
                                    ))}
                                </span>
                            </div>
                        </div>
                        <div className="job-req-doc">
                            <h5 className="mt-3 text-uppercase">Rusume Requirements</h5>
                            <div className="job-req-doc-content">
                                <span>
                                    - Resume <br />
                                    - Job application <br />
                                    - Health certificate (can be added when matriculation)
                                </span>
                            </div>
                        </div>
                        <div className="job-benefits">
                            <h5 className="mt-3 text-uppercase">BENEFITS</h5>
                            <div className="job-benefits-content">
                                <span>
                                    {/* - L????ng th???a thu???n t??? 12-15 tri???u. <br />
                                    - L??m vi???c t??? th??? 2 ?????n th??? 7 h??ng tu???n gi??? h??nh ch??nh.<br />
                                    - ????ng b???o hi???m theo quy ?????nh nh?? n?????c.<br />
                                    - Ch??? ????? l????ng th?????ng, hi???u, h???, sinh nh???t , th?????ng ho??n th??nh c??ng vi???c. */}
                                    {job.benefit}
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="job-contact-info">
                            <h5 className="mt-3 text-uppercase">CONTACT INFO</h5>
                            <div className="job-req-doc-content">
                                <span>
                                    {/* Ng?????i li??n h???: Ms. Thanh <br /> */}
                                    Address: {job.address}<br />
                                    H???n n???p h??? s??: {dateFormat(job.endDate, 'dd/mm/yyyy')}
                                </span>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobsDetail
