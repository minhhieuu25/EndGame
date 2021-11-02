import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteResume } from '../../redux/actions/resumeAction';
import './ManageCV.scss';




const ManageCV = () => {

    const { allResume, auth } = useSelector(state => state)

    const dispatch = useDispatch()
    const [resumes, setResume] = useState([])

    useEffect(() => {
        if (allResume.resumes) {
            setResume(allResume.resumes)
        }

    }, [allResume])


    const handleDelete = (id) => {

        dispatch(deleteResume(id, auth))
    }


    return (
        <div className="manage-cv container" onLoad={window.scrollTo(0, 0)}>
            <h3 className="text-center mt-3">Quản lý hồ sơ</h3>
            <div className="manage-cv-content card mt-3">
                <div className="card-body">
                    <div className="manage-cv-warn">
                        <p className="">Bạn được phép tạo tối đa 02 hồ sơ</p>
                    </div>
                    {
                        resumes.map((element) => (
                            <div className="manage-cv-list">
                                <div className="list-cv">
                                    <span className="name-cv"><i className="fas fa-pen-alt"></i>HỒ SƠ 1: {element.position}</span>
                                    <span className="font-weight-bold mt-3">Mã hồ sơ: NTV{element._id}</span>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold">Loại hồ sơ: </span><span> Hồ sơ tạo trực tuyến</span>
                                        </div>
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold">Tình trạng: </span><span> Chờ duyệt</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold">Ngày tạo: </span><span> {dateFormat(element.updatedAt, 'dd/mm/yyyy')}</span>
                                        </div>
                                        <div className="col-sm-4">
                                            <span className="font-weight-bold">Lượt xem: </span><span> 0</span>
                                        </div>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" for="flexCheckDefault">
                                            Cho phép nhà tuyển dụng tìm kiếm hồ sơ và liên lạc với bạn
                                        </label>
                                    </div>
                                    <div className="btn-manage-cv mt-3">
                                        <Link to={`/reviewResume/${element._id}`}><button type="button" className="btn btn-manage-cv-1 mr-3"><i className="far fa-eye"></i> Xem trước</button></Link>
                                        <Link to={`/updateResume/${element._id}`}><button type="button" className="btn btn-manage-cv-1 mr-3"><i className="far fa-edit"></i> Chỉnh sửa</button></Link>
                                        <button type="button" className="btn btn-manage-cv-1" onClick={() => handleDelete(element._id)}><i className="far fa-trash-alt"></i> Xóa hồ sơ</button>
                                    </div>
                                </div>
                                <hr />
                            </div>

                        ))
                    }
                    <div className="button-no-cv mt-4">
                        <p className="font-weight-bold">Nếu bạn chưa có file hồ sơ:</p>
                        <Link to={`createcv`}><button type="button" className="btn btn-new-cv-1 text-uppercase"><i className="fas fa-pen-alt"></i> Tạo hồ sơ bằng form khai trực tuyến</button></Link>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ManageCV
