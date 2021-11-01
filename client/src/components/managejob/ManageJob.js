import React, { useEffect, useState } from 'react'
import './ManageJob.scss'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useStore, useDispatch } from 'react-redux'
import { deleteJob } from '../../redux/actions/listJobAction';



const ManageJobs = () => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'position',
            headerName: 'Job Title',
            width: 150,
            editable: true,
        },
        {
            field: 'industry',
            headerName: 'Industry',
            width: 150,
            editable: true,
        },
        {
            field: 'companyName',
            headerName: 'Company Name',
            width: 150,
            editable: true,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/edit-job/" + params.row._id}>
                            <button className="manage-job-edit">Edit</button>
                        </Link>
                        <DeleteOutline className="manage-job-delete" onClick={e => handleDelete(params.row._id)} />
                    </>
                );
            },
        },
    ];



    const { allJob, auth } = useSelector(state => state)
    const [jobs, setJobs] = useState([])
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteJob({ id, auth }))
        // console.log(id)
    }

    useEffect(() => {
        let arr = []
        if (allJob.jobs) {
            allJob.jobs.map((obj, index) => {
                if (obj.idCompany === auth.user._id) {
                    arr = [...arr, { id: index, ...obj }]
                }
            })
        }

        setJobs(arr)
    }, [allJob.jobs])




    return (
        <div className="manage-job" onLoad={window.scrollTo(0, 0)}>
            <div className="manage-job-header">
                <h2 className="text-center text-2">Manage Jobs</h2>
            </div>
            <div className="manage-job-container">
                <DataGrid
                    rows={jobs}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>
    )
}

export default ManageJobs
