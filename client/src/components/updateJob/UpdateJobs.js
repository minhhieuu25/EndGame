import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import dateFormat from 'dateformat'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import '../../pages/manage/manage.scss'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateJob } from '../../redux/actions/listJobAction'
import { checkImage } from '../../utils/imageUpload'
import Sidebar from '../sidebar/Sidebar'
import AddSkill from './AddSkill'
import './CreateJob.scss'

let arrSkill = []
const UpdateJobs = () => {
    const dataLevel = [
        "Interns",
        "Fresher",
        "Experienced",
    ]
    const dataTypeJob = [
        "Full-time",
        "Past-time",
        "Internship",
        "Freelancer",
        "Seasonal",
        "Other"
    ]
    const dataSize = [
        "10-",
        "10-24",
        "25-99",
        "100-499",
        "500-999",
        "1000-4999"
    ]
    const topSkill = [
        { title: 'JavaScript' },
        { title: 'Problem-Solving Skills' },
        { title: 'Planning and Organizational Skills' },
        { title: 'Data Analysis' },
        { title: 'Adaptability' },
        { title: "Other" }
    ];
    const { allJob, auth, theme, socket } = useSelector(state => state)
    const { id } = useParams()
    const dispatch = useDispatch()
    const [level, setLevel] = useState('')
    const [jobType, setJobType] = useState('')
    const [companySize, setSize] = useState('10-')
    const [skill, setSkill] = useState([])
    const [endDate, setEndDate] = useState('')

    const initState = {
        companyName: '', position: '', industry: '', address: '', description: '', requirement: '', companySize: '', infoCompany: '', benefit: ''
    }
    const [jobData, setJobData] = useState(initState)
    // const { idCompany, companyName, position, industry, address, description, requirement, minSalary, maxSalary, infoCompany, benefit } = jobData

    const [logo, setLogo] = useState('')
    const [image, setImage] = useState('')

    const handleInput = e => {
        const { name, value } = e.target
        setJobData({ ...jobData, [name]: value })
    }

    const changeLogo = (e) => {
        const file = e.target.files[0]
        const err = checkImage(file)
        if (err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: err }
        })
        setLogo(file)
    }
    const changeImage = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if (err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: err }
        })

        setImage(file)
    }
    const onTagsChangeSkill = (event, values) => {
        setSkill(values)
    }

    const [load, setLoad] = useState([1])

    const handleDeleteSkill = (i) => {
        arrSkill.splice(i, 1)
        load.splice(i, 1)
        let tmp = [...load]
        setLoad(tmp)
    }

    const handleUpdate = () => {
        dispatch(updateJob(id, jobData, level, jobType, companySize, skill, logo, image, auth, socket))
    }

    useEffect(() => {
        let data = {}
        if (allJob.jobs) {
            allJob.jobs.map(element => {
                if (element._id === id) {
                    data = { ...element }
                    // setLevel(element.level)
                    // setJobType(element.jobType)
                    setSkill([...element.skill])
                    setEndDate(dateFormat(element.endDate, 'yyyy-mm-dd'))
                }
            })
        }
        setLevel(data.level)
        setJobType(data.jobType)
        arrSkill = [...data.skill]
        setLoad([...data.skill])
        setJobData(data)
    }, [allJob.jobs])

    return (
        <>
            <div className="manage_container">
                <Sidebar />

                <div className="create-job">
                    <div className="create-job-header">
                        <h2 className="text-center text-2">Edit Post</h2>
                    </div>
                    <div className="container-create-job">
                        <div className="profile-account card">
                            <div className="card-body">
                                <h4 className="text-center mb-4">Job</h4>
                                <form>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Job Title</label>
                                        <div className="col-sm-8">
                                            <input type="" className="form-control" id="position" name='position' defaultValue={jobData.position} onChange={handleInput} placeholder="Eg. Senior UX Designer" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Job Level</label>
                                        <div className="col-sm-8">
                                            <select className="form-control" id="" placeholder="" name='level' value={level} onChange={e => setLevel(e.target.value)}>
                                                {
                                                    dataLevel.map((element) => (
                                                        <option value={element}>{element}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Job Type</label>
                                        <div className="col-sm-8">

                                            <select className="form-control" id="" placeholder="" name='level' value={jobType} onChange={e => setLevel(e.target.value)}>
                                                {/* <select className="form-control" id="" placeholder="" value={jobType} name='jobType' onChange={e => setJobType(e.target.value)}> */}
                                                {
                                                    dataTypeJob.map((element) => (
                                                        <option value={element}>{element}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label" >Job Category</label>
                                        <div className="col-sm-8">
                                            <input type="" className="form-control" id="" placeholder="Nhập ngành nghề" defaultValue={jobData.industry} name='industry' onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Working Location</label>
                                        <div className="col-sm-8">
                                            <input type="" name='address' onChange={handleInput} className="form-control" defaultValue={jobData.address} id="" placeholder="123 Đà Nẵng" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Description</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" name='description' onChange={handleInput} defaultValue={jobData.description} placeholder="Nhập mô tả công việc"></textarea>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Requirements</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" name='requirement' onChange={handleInput} defaultValue={jobData.requirement} placeholder="Nhập yêu cầu công việc"></textarea>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Skill Tags</label>
                                        {
                                            console.log(load)
                                        }

                                        <div className="col-sm-8">

                                            {
                                                load.map((data, index) => (
                                                    <AddSkill index={index} load={load} handleDeleteSkill={handleDeleteSkill} arr={load} />
                                                ))
                                            }
                                            <button type="button" onClick={e => setLoad([...load, 1])} class="btn btn-primary btn-save">Add skill</button>
                                            {/* <Autocomplete
                                                multiple
                                                limitTags={2}
                                                id="multiple-limit-tags"
                                                options={topSkill}
                                                onChange={onTagsChangeSkill}
                                                defaultValue={skill}
                                                getOptionLabel={(option) => option.title}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="limitTags" placeholder="Skill" />
                                                )}
                                            /> */}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Salary Range</label>
                                        <div className="col-sm-4">
                                            <input type="" name='minSalary' onChange={handleInput} defaultValue={jobData.minSalary} className="form-control" id="" placeholder="Ví dụ: 2000000" />
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="" name='maxSalary' onChange={handleInput} defaultValue={jobData.maxSalary} className="form-control" id="" placeholder="Ví dụ: 5000000" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Date-end</label>
                                        <div className="col-sm-8">
                                            <input type="date" value={endDate} className="form-control" />
                                        </div>
                                    </div>
                                </form>
                                <hr />
                                <h4 className="text-center mb-4">Your Company</h4>
                                <form>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Company Name</label>
                                        <div className="col-sm-8">
                                            <input type="" name='companyName' onChange={handleInput} defaultValue={jobData.companyName} className="form-control" id="" placeholder="Ví dụ: RankWorks" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Company Size</label>
                                        <div className="col-sm-8">
                                            <select className="form-control" id="" name='companySize' defaultValue={jobData.companySize} onChange={(e) => setSize(e.target.value)} placeholder="">
                                                {
                                                    dataSize.map((element) => (
                                                        <option value={element}>{element}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {/* <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Địa Chỉ Công Ty</label>
                                <div className="col-sm-8">
                                    <input type="" className="form-control" id="" placeholder="Ví dụ: 123 Đà Nẵng" />
                                </div>
                            </div> */}
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Company Profile</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" name='infoCompany' defaultValue={jobData.infoCompany} onChange={handleInput} placeholder="Thông tin công ty..."></textarea>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label for="" className="col-sm-3 col-form-label">Benefits</label>
                                        <div className="col-sm-8">
                                            <input type="" className="form-control" name='benefit' defaultValue={jobData.benefit} onChange={handleInput} id="" placeholder="Ví dụ: Lương tháng 13" />
                                        </div>
                                    </div>
                                </form>
                                <div className="text-center">
                                    <button type="submit" onClick={handleUpdate} class="btn btn-primary btn-save">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdateJobs
