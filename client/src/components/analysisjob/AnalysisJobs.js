import { DataGrid } from "@material-ui/data-grid";
import { ArrowDownward } from "@material-ui/icons";
import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import './AnalysisJobs.scss';


const AnalysisJobs = () => {



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
        },
        {
            field: 'aa23',
            headerName: 'Point',
            width: 150,
        },
        {
            field: 'aa1',
            headerName: 'Action',
            width: 120,

        },
    ]
    const { id } = useParams()
    const { allJob, submited } = useSelector(state => state)
    const [jobs, setJobs] = useState([])
    const [post, setPost] = useState({})
    const [cvs, setCvs] = useState([])

    useEffect(() => {
        console.log('1', submited.submited)
        if (allJob.jobs) {
            allJob.jobs.map((element) => {
                if (element._id === id) {
                    setJobs({ ...element })
                }
            });
        }

    }, [])

    useEffect(() => {
        let arr = {}
        let arr1 = []
        if (submited.submited) {
            submited.submited.map((element, index) => {
                if (element.idJob === id) {
                    arr = { ...element }
                }
            })
        }
        setPost(arr)

        if (arr.cv) {
            arr.cv.map((element, index) => {
                arr1 = [...arr1, { ...element, 'id': index }]
            })
        }
        setCvs([...arr1])

    }, [])

    return (
        <div className="analysis-job-view">
            <h2 className="text-center text-2">Analysis Job</h2>
            <div className="container-analysis-job">
                <div className="card">
                    <div className="card-body">
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
                            <span>Status:</span> Active - Pending Approval - Closed
                        </div>
                        <div className="job-day">
                            <span>Total Resume:</span> 30
                        </div>
                        <div className="featured">
                            <div className="featuredItem">
                                <span className="featuredTitle">Total Resume</span>
                                <div className="featuredMoneyContainer">
                                    <span className="featuredMoney">30</span>
                                    <span className="featuredMoneyRate">
                                        -1 <ArrowDownward className="featuredIcon negative" />
                                    </span>
                                </div>
                                <span className="featuredSub">Compared to last day</span>
                            </div>
                            <div className="featuredItem">
                                <span className="featuredTitle">View</span>
                                <div className="featuredMoneyContainer">
                                    <span className="featuredMoney">123</span>
                                    <span className="featuredMoneyRate">
                                        -1 <ArrowDownward className="featuredIcon negative" />
                                    </span>
                                </div>
                                <span className="featuredSub">Compared to last day</span>
                            </div>
                            <div className="featuredItem">
                                <span className="featuredTitle">Resume</span>
                                <div className="featuredMoneyContainer">
                                    <span className="featuredMoney">3</span>
                                    <span className="featuredMoneyRate">
                                        -1 <ArrowDownward className="featuredIcon negative" />
                                    </span>
                                </div>
                                <span className="featuredSub">Compared to last day</span>
                            </div>
                        </div>
                        <div className="chart">
                            <h3 className="chartTitle"></h3>
                            <ResponsiveContainer width="100%" aspect={4 / 1}>
                                <LineChart data="">
                                    <XAxis dataKey="name" stroke="#5550bd" />
                                    <Line type="monotone" dataKey="" stroke="#5550bd" />
                                    <Tooltip />
                                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="list-candidates">
                                    <span>List Candidates</span>
                                </div>
                                <div className="datagrid-table">
                                    <DataGrid
                                        component="div"
                                        pageSize={5}
                                        rows={cvs}
                                        columns={columns}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                        disableSelectionOnClick
                                    />
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
