import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateRole } from '../redux/actions/usersAction';

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    mobile: '',
    avatar: ''
}
const limit = 10
function Profile() {
    const { auth, users } = useSelector(state => state)
    const [data, setData] = useState(initialState)

    const [dataUser, setDataUser] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        selectPage(0)
    }, [dispatch, auth.token])

    useEffect(() => {
        if (users.users) setDataUser(users.users)

    }, [users])

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleUpdate = () => {
        dispatch(updateRole(data, auth))
    }

    const handleView = (user) => {
        setData(user)
    }

    const handleDelete = (user) => {
        dispatch(deleteUser(user, auth))
    }
    //phan trang
    const initDataShow = users.users ? users.users : [];
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
                    <h2>User Profile</h2>

                    <div className="avatar">
                        <img src={data.avatar} alt="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name" className="text-label">Name</label>
                        <input type="text" name="name" id="name" value={data.firstname + ' ' + data.lastname}
                            disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="text-label">Email</label>
                        <input type="email" name="email" id="email" value={data.email}
                            disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobile" className="text-label">PhoneNumber</label>
                        <input type="password" name="mobile" id="mobile"
                            value={data.mobile} disabled />
                    </div>

                    <div className="form-group">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.role}
                                label="role"
                                onChange={e => setData({ ...data, 'role': e.target.value })}
                            >
                                <MenuItem value={'candidate'}>candidate</MenuItem>
                                <MenuItem value={'company'}>company</MenuItem>
                                <MenuItem value={'admin'}>admin</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <em style={{ color: "crimson" }}>
                            * If you update your password here, you will not be able
                            to login quickly using google and facebook.
                        </em>
                    </div>
                    <div className="text-center">
                        <button onClick={handleUpdate}>Update</button>
                    </div>
                </div>
                <div className="col-right">
                    <h2 className="text-center">List Users</h2>

                    <div style={{ overflowX: "auto" }}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataShow.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{currPage * 10 + index}</td>
                                            <td>{user.firstname + ' ' + user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {
                                                    user.role === 'company'
                                                        ? <i className="fas fa-check" title="company"></i>
                                                        : <i className="fas fa-times" title="user"></i>
                                                }
                                            </td>
                                            <td>
                                                {/* <Link to={`/edit_user/${user._id}`}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link> */}
                                                <i className="fas fa-edit" title="Edit"
                                                    onClick={() => handleView(user)}></i>
                                                <i className="fas fa-trash-alt" title="Remove"
                                                    onClick={() => handleDelete(user)} ></i>
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
