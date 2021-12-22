import { DataGrid } from "@material-ui/data-grid";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { getListSubmitedForCompany, setStatus, deleteCV } from "../../redux/actions/sumitedAction";
import './AnalysisJobs.scss';
import { DeleteOutline } from "@material-ui/icons";

//select
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

//Ag Grid Reat
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const AnalysisJobs = () => {

    const defaultColDef = {
        sortable: true,
        editable: true,
        flex: 1, filter: true,
        floatingFilter: true
    }
    const columnDefs = [
        { headerName: "ID", field: "id" },
        { headerName: "Full name", field: "fullname" },
        {
            headerName: "Apply on", field: "dateSubmit",
            valueFormatter: params => { return dateFormat(params.data.dateSubmit, 'dd/mm/yyyy') }
        },
        {
            headerName: 'Status',
            cellRendererFramework: (params) => {
                return (
                    <div>
                        <FormControl fullWidth sx={{ height: 20 }}>
                            <NativeSelect
                                defaultValue={params.data.status}
                                onChange={e => handleOnChange(e, params.data.idCV, params.data.idCandidate)}
                            >
                                <option value={'Waiting'}>Waiting</option>
                                <option value={'Accept'}>Accept</option>
                                <option value={'Refuse'}>Refuse</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                )
            }
        },
        {
            field: 'point',
            headerName: 'Point',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            cellRendererFramework: (params) => {
                return (
                    <>
                        <Link to={"/detailResume/" + params.data.idCV} query={{ testvalue: "hello" }}>
                            <ReadMoreIcon />
                        </Link>
                        {/* <DeleteOutline titleAccess="Delete" className="manage-job-delete" onClick={e => handleDeleteCV(params.data.idCV)} /> */}
                    </>
                );
            },
        },
    ]

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'fullname',
            headerName: 'Full name',
            width: 150,
        },
        {
            field: 'dateSubmit',
            headerName: 'Apply on',
            width: 150,
            valueFormatter: (params) => { return dateFormat(params.value, 'dd/mm/yyyy') }

        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return (
                    <FormControl fullWidth sx={{ height: '40px' }}>
                        <NativeSelect
                            style={{ height: '100%' }}
                            defaultValue={params.row.status}
                            onChange={e => handleOnChange(e, params.row.idCV, params.row.idCandidate)}
                        // inputProps={{
                        //     name: 'age',
                        //     id: 'uncontrolled-native',
                        // }}
                        >
                            <option value={'Waiting'}>Waiting</option>
                            <option value={'Accept'}>Accept</option>
                            <option value={'Refuse'}>Refuse</option>
                        </NativeSelect>
                    </FormControl>

                )
            }
        },
        {
            field: 'point',
            headerName: 'Point',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/detailResume/" + params.row.idCV} query={{ testvalue: "hello" }}>
                            <ReadMoreIcon />
                        </Link>

                        {/* <Link to={"/edit-job/" + params.row._id}>
                            <EditIcon titleAccess="Edit" />
                        </Link>
                        <DeleteOutline titleAccess="Delete" className="manage-job-delete" onClick={e => handleDelete(params.row._id)} /> */}

                    </>
                );
            },
        },
    ]
    const { id } = useParams()
    const { allJob, submited, auth, socket } = useSelector(state => state)
    const [jobs, setJobs] = useState([])
    const [post, setPost] = useState({})
    const [cvs, setCvs] = useState([])
    const [totalCVToday, setCvToday] = useState(0)
    const [totalCVYesterday, setCvYesterday] = useState(0)
    const dispatch = useDispatch()

    const handleDeleteCV = (idCV) => {
        dispatch(deleteCV(id, idCV, auth))
    }

    useEffect(() => {
        dispatch(getListSubmitedForCompany(id, auth))
        if (allJob.jobs) {
            allJob.jobs.map((element) => {
                if (element._id === id) {
                    setJobs({ ...element })
                }
            });
        }

    }, [dispatch, id])

    useEffect(() => {
        let arr = {}
        let arr1 = []
        if (submited.submited) {
            arr = { ...submited.submited }
        }
        setPost(arr)
        if (arr.cv) {
            arr.cv.map((element, index) => {
                arr1 = [...arr1, { ...element, 'id': index }]
            })
        }
        setCvs([...arr1])
        calTotalCVToday(arr1)
        calTotalCVYesterday(arr1)
    }, [submited.submited])

    const calTotalCVToday = (cvs) => {
        const arr = cvs.filter(element => dateFormat(element.dateSubmit, 'dd/mm/yyyy') === dateFormat(new Date(), 'dd/mm/yyyy'))
        setCvToday(arr.length)
    }
    const calTotalCVYesterday = (cvs) => {
        const arr = cvs.filter(element => dateFormat(element.dateSubmit, 'dd/mm/yyyy') === dateFormat(new Date(Date.now() - 864e5), 'dd/mm/yyyy'))
        setCvYesterday(arr.length)
    }

    const handleOnChange = (e, idCV, idCandidate) => {
        dispatch(setStatus(jobs._id, idCV, idCandidate, e.target.value, auth, socket))
    }

    return (
        <div className="analysis-job-view">
            <h2 className="text-center text-2">Detail Job</h2>
            <div className="container-analysis-job">
                <div className="card">
                    <div className="card-body">
                        <div className="ml-3">
                            <div className="job-title">
                                <span>Job Title: {jobs.position}</span>
                            </div>
                            <div className="job-day">
                                <span>Date created:</span> {dateFormat(jobs.createdAt, 'dd/mm/yyyy')}
                            </div>
                            <div className="job-day">
                                <span>Expires on:</span> {dateFormat(jobs.endDate, 'dd/mm/yyyy')}
                            </div>
                            <div className="job-day">
                                {/* <span>Status:</span> Active - Pending Approval - Closed */}
                                <span>Status:</span> {new Date(jobs.endDate).getTime() < new Date().getTime() ? 'Closed' : 'Active'}
                            </div>
                            <div className="job-day mb-3">
                                <span>Total Resume:</span> {cvs.length}
                            </div>
                        </div>
                        <div className="featured">
                            <div className="featuredItem">
                                <span className="featuredTitle">Total Resume</span>
                                <div className="featuredMoneyContainer">
                                    <span className="featuredMoney">{totalCVToday}</span>
                                    <span className="featuredMoneyRate">
                                        {totalCVToday - totalCVYesterday} {totalCVToday - totalCVYesterday > 0 ? <ArrowUpward className="featuredIcon negative" style={{ color: "green" }} /> : <ArrowDownward className="featuredIcon negative" />}
                                    </span>
                                </div>
                                <span className="featuredSub">Compared to last day</span>
                            </div>
                            <div className="featuredItem">
                                <span className="featuredTitle">View</span>
                                <div className="featuredMoneyContainer">
                                    <span className="featuredMoney">{jobs.jobFollower ? jobs.jobFollower.length : 0}</span>
                                    {/* <span className="featuredMoneyRate">
                                        -1 <ArrowDownward className="featuredIcon negative" />
                                    </span> */}
                                </div>
                                <span className="featuredSub">Compared to last day</span>
                            </div>
                            <div className="featuredItem">
                                <span className="featuredTitle">Selected resume</span>
                                <div className="featuredMoneyContainer">
                                    <span className="featuredMoney">{cvs.filter(element => element.status === 'Accept').length}</span>
                                    {/* <span className="featuredMoneyRate">
                                        <ArrowDownward className="featuredIcon negative" />
                                    </span> */}
                                </div>
                                {/* <span className="featuredSub">Compared to last day</span> */}
                            </div>
                        </div>
                        {/* <div className="chart">
                            <h3 className="chartTitle"></h3>
                            <ResponsiveContainer width="100%" aspect={4 / 1}>
                                <LineChart data="">
                                    <XAxis dataKey='name' stroke="#5550bd" />
                                    <Line type="monotone" dataKey="Total Resume" stroke="#5550bd" />
                                    <Tooltip />
                                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div> */}
                        <div className="card mt-5" >
                            <div className="card-body">
                                <div className="list-candidates">
                                    <span>List Candidates</span>
                                </div>
                                <div className="datagrid-table">
                                    {/* <DataGrid
                                        component="div"
                                        pageSize={5}
                                        rows={cvs}
                                        columns={columns}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                        disableSelectionOnClick
                                    /> */}
                                    <div className="ag-theme-alpine" style={{ height: 350, width: 1100 }}>
                                        <AgGridReact
                                            columnDefs={columnDefs}
                                            rowData={cvs}
                                            defaultColDef={defaultColDef}
                                        ></AgGridReact>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalysisJobs
