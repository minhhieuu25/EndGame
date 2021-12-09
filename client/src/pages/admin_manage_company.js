import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompany } from '../redux/actions/listCompanyAction';

const initialState = {
    companyName: '', address: '', industry: '', info: '', website: '', phoneNumber: '', companySize: '', logo: ''
}
const limit = 10
function Profile() {
    const { auth, users, listCompany } = useSelector(state => state)
    const [data, setData] = useState(initialState)
    const [dataUser, setDataUser] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        selectPage(0)
    }, [dispatch, auth.token, listCompany.companies])

    useEffect(() => {
        if (users.users) setDataUser(users.users)
        // if (listCompany.companies) {
        //     setCompanies(listCompany.companies)
        //     console.log(companies)
        // }

    }, [users, listCompany])

    // const handleChange = e => {
    //     const { name, value } = e.target
    //     setData({ ...data, [name]: value })
    // }

    // const handleUpdate = () => {
    //     dispatch(updateRole(data, auth))
    // }

    const handleView = (company) => {
        setData(company)
    }

    const handleDelete = (company) => {
        dispatch(deleteCompany(company, auth))
    }

    //phan trang
    const initDataShow = listCompany.companies ? listCompany.companies : [];
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
    return (
        <div className="page-admin">
            <div className="profile_page">
                <div className="col-left">
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
                        <label htmlFor="email" className="text-label">Email</label>
                        <input type="email" name="email" id="email" value={data.website}
                            disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="text-label">Company size</label>
                        <input type="text" name="role" id="role"
                            value={data.companySize} disabled />

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
                    </div> */}
                </div>
                <div className="col-right">
                    <h2 className="text-center">List Companies</h2>

                    <div style={{ overflowX: "auto" }}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Website</th>
                                    <th>Tax code</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataShow.map((company, index) => (
                                        <tr key={company.idCompany}>
                                            <td>{currPage * 10 + index}</td>
                                            <td>{company.companyName}</td>
                                            <td>{company.website}</td>
                                            <td>{company.taxCode}</td>
                                            <td>
                                                <i className="fas fa-edit" title="Edit"
                                                    onClick={() => handleView(company)}></i>
                                                <i className="fas fa-trash-alt" title="Remove"
                                                    onClick={() => handleDelete(company)} ></i>
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
