import React, { useEffect, useState } from 'react'
import './ManageJob.scss'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useStore } from 'react-redux'

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
    // {
    //     field: 'createdate',
    //     headerName: 'updatedAt',
    //     // type: 'number',
    //     width: 170,
    //     editable: true,
    // },
    // {
    //     field: 'dateend',
    //     headerName: 'Date end',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 170,
    // },
    // {
    //     field: 'totalsubmit',
    //     headerName: 'Total Submit CV',
    //     width: 200,
    //     editable: true,
    // },
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
                    <DeleteOutline className="manage-job-delete" />
                </>
            );
        },
    },
];

// const rows = [
//     { id: 1, jobtitle: 'Snow', active: 'Jon', createdate: '13/10/2021' },
//     { id: 2, jobtitle: 'Lannister', active: 'Cersei', createdate: '13/10/2021' },
//     { id: 3, jobtitle: 'Lannister', active: 'Jaime', createdate: '13/10/2021' },
//     { id: 4, jobtitle: 'Stark', active: 'Arya', createdate: '13/10/2021' },
//     { id: 5, jobtitle: 'Targaryen', active: 'Daenerys', createdate: null },
//     { id: 6, jobtitle: 'Melisandre', active: null, createdate: '13/10/2021' },
//     { id: 7, jobtitle: 'Clifford', active: 'Ferrara', createdate: '13/10/2021' },
//     { id: 8, jobtitle: 'Frances', active: 'Rossini', createdate: '13/10/2021' },
//     { id: 9, jobtitle: 'Roxie', active: 'Harvey', createdate: '13/10/2021' },
// ];



const ManageJobs = () => {

    const { allJob, auth } = useSelector(state => state)
    const [jobs, setJobs] = useState([])

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
                {console.log('job', jobs)}
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
