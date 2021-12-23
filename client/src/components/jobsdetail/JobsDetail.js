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
                                    {/* 1/ CÔNG TÁC QUẢN LÝ CHUNG <br />
                                    - Quản lý, điều hành toàn bộ hoạt động của Phòng trong lĩnh vực kinh doanh;<br />
                                    - Xây dựng, trình duyệt và triển khai thực hiện kế hoạch kinh doanh hàng tháng, quý, năm của công ty;<br />
                                    - Tham gia xây dựng hệ thống quản trị nhân sự, xây dựng hệ thống quy trình theo quy định của công ty<br />
                                    - Tổ chức, triển khai và giám sát nhân viên thực hiện kế hoạch kinh doanh; theo dõi;<br />
                                    - Tổ chức và quản lý hệ thống dữ liệu Khách hàng của Công ty;<br />
                                    - Báo cáo kết quả doanh hàng tháng hoặc khi có yêu cầu;<br />
                                    - Hàng tháng, hàng quý, đánh giá hiệu quả công việc của phòng Kinh doanh gửi cho Giám đốc;<br />
                                    - Lên kế hoạch đào tạo, tuyển dụng Nhân sự & ngân sách dự trù cho các hoạt động của Phòng;<br />
                                    - Phối hợp với Phòng Marketing triển khai kế hoạch MKT nhằm phục vụ hoạt động bán hàng */}
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
                                    {/* 1. Yêu cầu sử dụng thành thạo các phần mềm thiết kế Autocad<br />
                                    2. Có kinh nghiệm làm QS 1 năm trở lên<br />
                                    3. Tỷ mỷ, cẩn thận<br />
                                    4. Có tinh thần học hỏi và cầu tiến<br />
                                    5. Có thể làm tăng ca<br />
                                    6. Có mong muốn gắn bó lâu dài với công ty */}
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
                                    {/* - Lương thỏa thuận từ 12-15 triệu. <br />
                                    - Làm việc từ thứ 2 đến thứ 7 hàng tuần giờ hành chính.<br />
                                    - Đóng bảo hiểm theo quy định nhà nước.<br />
                                    - Chế độ lương thưởng, hiếu, hỉ, sinh nhật , thưởng hoàn thành công việc. */}
                                    {job.benefit}
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="job-contact-info">
                            <h5 className="mt-3 text-uppercase">CONTACT INFO</h5>
                            <div className="job-req-doc-content">
                                <span>
                                    {/* Người liên hệ: Ms. Thanh <br /> */}
                                    Address: {job.address}<br />
                                    Hạn nộp hồ sơ: {dateFormat(job.endDate, 'dd/mm/yyyy')}
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
