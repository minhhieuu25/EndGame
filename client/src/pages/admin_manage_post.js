import ReadMoreIcon from '@mui/icons-material/ReadMore';
import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompany } from '../redux/actions/listCompanyAction';
import { deleteJobForAdmin } from '../redux/actions/usersAction';
// import { updateRole } from '../redux/actions/usersAction';
import { createNotify } from '../redux/actions/notifyAction';
import { GLOBALTYPES } from '../redux/actions/globalTypes';


const initialState = {
    // companyName: '', address: '', industry: '', info: '', website: '', phoneNumber: '', companySize: '', logo: ''
    companyName: '', address: '', position: '', industry: '', minSalary: 0, maxSalary: 0, endDate: '', logo: '', createdAt: ''
}
const limit = 7
function Profile() {
    const { auth, listCompany, allJob, socket } = useSelector(state => state)
    const [data, setData] = useState(initialState)
    const [listJob, setList] = useState(allJob.jobs ? allJob.jobs : [])

    const dispatch = useDispatch()

    useEffect(() => {
        selectPage(0)
    }, [dispatch, auth.token, allJob])

    useEffect(() => {
        // if (users.users) setDataUser(users.users)
        // if (listCompany.companies) {
        //     setCompanies(listCompany.companies)
        //     console.log(companies)
        // }
        console.log(listJob)
    }, [allJob])

    // const handleChange = e => {
    //     const { name, value } = e.target
    //     setData({ ...data, [name]: value })
    // }

    // const handleUpdate = () => {
    //     dispatch(updateRole(data, auth))
    // }

    const handleView = (job) => {
        setData(job)
    }

    const handleDelete = (job) => {
        dispatch(deleteJobForAdmin(job, auth, socket))
        // console.log(job)
    }
    //phan trang
    const initDataShow = allJob.jobs ? allJob.jobs : [];
    const [dataShow, setDataShow] = useState(initDataShow)
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
    const handleAlert = (job) => {
        // Notify
        const msg = {
            id: job._id,
            text: 'Alert your post',
            recipients: [job.idCompany],
            url: `/jobdetail/${job._id}`,
            // content: 'Alert your post',
            // image: post.images[0].url
        }
        dispatch(createNotify({ msg, auth, socket }))
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: 'Alert success!'
            }
        })
    }
    return (
        <div className="page-admin">
            <div className="profile_page">
                {/* <div className="col-left">
                    <h2>Company Info</h2>

                    <div className="avatar">
                        <img src={data.logo} alt="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name" className="text-label">Company Name</label>
                        <input type="text" name="name" id="name" value={data.companyName}
                            disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="text-label">Job title</label>
                        <input type="email" name="email" id="email" value={data.position}
                            disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="text-label">Description</label>
                        <input type="text" name="role" id="role"
                            value={data.description} disabled />

                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_password" className="text-label">Phone Number</label>
                        <input type="text" name="cf_password" id="cf_password"
                            value={data.phoneNumber} disabled />
                    </div>

                    {/* <div>
                        <em style={{ color: "crimson" }}>
                            * If you update your password here, you will not be able
                            to login quickly using google and facebook.
                        </em>
                    </div>
                    <div className="text-center">
                        <button onClick={handleUpdate}>Update</button>
                    </div>
                </div> */}
                <div className="col-right">
                    <h2 className="text-center">MODERATOR POST</h2>

                    <div style={{ overflowX: "auto" }}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Company Name</th>
                                    <th>Job title</th>
                                    <th>Salary</th>
                                    <th>Create date</th>
                                    <th>End date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listJob.map((job, index) => (
                                        <tr key={job.idCompany}>
                                            <td>{currPage * 10 + index}</td>
                                            <td>{job.companyName}</td>
                                            <td>{job.position}</td>
                                            <td>{job.minSalary / 1000000}-{job.maxSalary / 1000000} Million</td>
                                            <td>{dateFormat(job.createdAt, 'dd/mm/yyyy')}</td>
                                            <td>{dateFormat(job.endDate, 'dd/mm/yyyy')}</td>
                                            <td>

                                                <i className="fas fa-edit" title="Edit"
                                                    onClick={() => handleView(job)}></i>
                                                <i className="fas fa-trash-alt mr-2" title="Remove"
                                                    onClick={() => handleDelete(job)} ></i>
                                                <i class="fas fa-exclamation-triangle" title='Alert'
                                                    onClick={() => handleAlert(job)}></i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
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
    )
}

export default Profile
