import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@mui/icons-material/Edit';
import TimelineIcon from '@mui/icons-material/Timeline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { deleteJob } from '../../redux/actions/listJobAction';
import './ManageJob.scss';
import { AddToQueue } from '@mui/icons-material';
import dateFormat from 'dateformat'

//Ag Grid Reat
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const ManageJobs = () => {

    const defaultColDef = {
        sortable: true,
        editable: true,
        flex: 1, filter: true,
        floatingFilter: true
    }
    const columnDefs = [
        { headerName: "ID", field: "_id" },
        { headerName: "Job title", field: "position" },
        { headerName: "Industry", field: "industry" },
        {
            headerName: "Status", field: "status",
            valueFormatter: params => { return (new Date().getTime() - new Date(params.data.endDate).getTime() < 0) ? dateFormat(params.data.endDate, 'dd/mm/yyyy') : 'Expired' }
        },
        {
            headerName: "Date created", field: "createAt",
            valueFormatter: params => { return dateFormat(params.value, 'dd/mm/yyyy') }
        },
        {
            headerName: "Expried on", field: "endDate",
            valueFormatter: params => { return dateFormat(params.value, 'dd/mm/yyyy') }
        },
        {
            headerName: 'Action',
            cellRendererFramework: (params) => {
                return (
                    <div>
                        <Link to={"/analysis/" + params.data._id}>
                            <TimelineIcon style={{color: '#007bff'}} titleAccess="Analysis" />
                        </Link>
                        <Link to={"/edit-job/" + params.data._id}>
                            <EditIcon style={{color: '#ff9900a3'}} titleAccess="Edit" />
                        </Link>
                        <DeleteOutline titleAccess="Delete" className="manage-job-delete" onClick={e => handleDelete(params.data._id)} />
                    </div>
                )
            }

        },
    ]


    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            width: 100
        },
        {
            field: 'position',
            headerName: 'Job Title',
            width: 150,

        },
        {
            field: 'industry',
            headerName: 'Industry',
            width: 150,

        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            valueFormatter: (params) => { return (new Date().getTime() - new Date(params.row.endDate).getTime() < 0) ? dateFormat(params.row.endDate, 'dd/mm/yyyy') : 'Expired' }
        },
        {
            field: 'createdAt',
            headerName: 'Date created',
            width: 150,
            type: 'date',
            valueFormatter: (params) => { return dateFormat(params.value, 'dd/mm/yyyy') }
        },
        {
            field: 'endDate',
            headerName: 'Expried on',
            width: 150,
            type: 'date',
            valueFormatter: (params) => { return dateFormat(params.value, 'dd/mm/yyyy') }
        },
        {
            field: "action",
            headerName: "Action",
            width: 120,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/analysis/" + params.row._id}>
                            <TimelineIcon titleAccess="Analysis" />
                        </Link>
                        <Link to={"/edit-job/" + params.row._id}>
                            <EditIcon titleAccess="Edit" />
                        </Link>
                        <DeleteOutline titleAccess="Delete" className="manage-job-delete" onClick={e => handleDelete(params.row._id)} />
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
            <div className="card">
                <div className="card-body">
                    <div className="header-manage-job">
                        <div className="list-job-1">
                            <span>List Jobs</span>
                        </div>
                        <div className="btn-new-job">
                            <Link to='/newJob'>
                                <button variant="outlined" type="button" className="btn btn-new-job-1">
                                    <AddToQueue /> Post Job
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="manage-job-container ">
                        {/* <DataGrid
                            rows={jobs}
                            component="div"
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                        /> */}
                        <div className="ag-theme-alpine" style={{ height: 350, width: 1100 }}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                rowData={jobs}
                                defaultColDef={defaultColDef}
                            ></AgGridReact>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ManageJobs
