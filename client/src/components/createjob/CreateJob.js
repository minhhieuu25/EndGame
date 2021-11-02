import React, { useEffect, useState } from 'react'
import './CreateJob.scss'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { createJob } from '../../redux/actions/listJobAction'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dateFormat from 'dateformat'



const CreateJob = () => {

    const dataLevel = [
        "Interns",
        "Fresher",
        "Experienced",
    ]
    const dataTypeJob = [
        "Full-time",
        "Part-time",
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
        { title: 'ReactJs' },
        { title: 'VueJs' },
        { title: 'Sql Server' },
        { title: "Other" }
    ];

    const { auth, theme, listCompany, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const [level, setLevel] = useState('Interns')
    const [jobType, setJobType] = useState('Full-time')
    const [companySize, setSize] = useState('10-')
    const initState = {
        companyName: '', position: '', industry: '', address: '', description: '', requirement: '', minSalary: 0,
        maxSalary: 0, companySize: '', infoCompany: '', benefit: '', endDate: ''
    }
    const [jobData, setJobData] = useState(initState)
    const [companyData, setCompanyData] = useState({})
    const { idCompany, companyName, position, industry, address, description, requirement, minSalary, maxSalary,
        infoCompany, benefit, endDate } = jobData

    const [skill, setSkill] = useState([])
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

    const handleCreate = () => {
        dispatch(createJob(jobData, level, jobType, skill, companySize, logo, image, auth, socket))
    }
    const onTagsChangeSkill = (event, values) => {
        setSkill(values)
    }

    useEffect(() => {
        let company = {}
        let date = new Date()
        if (listCompany.companies) {
            listCompany.companies.map(element => {
                if (element.idCompany === auth.user._id)
                    company = { ...element }
            })
        }
        // setCompanyData(company)

        setJobData({ ...jobData, ['endDate']: dateFormat(date, 'yyyy-mm-dd'), ['companyName']: company.companyName, ['infoCompany']: company.info, ['companySize']: company.companySize })
        console.log(jobData)
    }, [])
    return (

        <div className="create-job" >
            <div className="create-cv-header">
                <h2 className="text-center text-2">Post Job</h2>
            </div>
            <div className="container-create-job">
                <div className="profile-account card">
                    <div className="card-body">
                        <h4 className="text-center mb-4">The Job</h4>
                        <form>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Job Title</label>
                                <div className="col-sm-8">
                                    <input type="" className="form-control" id="position" name='position' onChange={handleInput} placeholder="Eg. Senior UX Designer" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Job Level</label>
                                <div className="col-sm-8">
                                    <select className="form-control" id="" placeholder="" name='level' defaultValue='Interns' onChange={e => setLevel(e.target.value)}>
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
                                    <select className="form-control" id="" placeholder="" defaultValue='Full-time' name='jobType' onChange={e => setJobType(e.target.value)}>
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
                                    <input type="" className="form-control" id="" placeholder="Nhập ngành nghề" name='industry' onChange={handleInput} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Working Location</label>
                                <div className="col-sm-8">
                                    <input type="" name='address' onChange={handleInput} className="form-control" id="" placeholder="123 Đà Nẵng" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Description</label>
                                <div className="col-sm-8">
                                    <textarea className="form-control" name='description' onChange={handleInput} placeholder="Nhập mô tả công việc"></textarea>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Requirements</label>
                                <div className="col-sm-8">
                                    <textarea className="form-control" name='requirement' onChange={handleInput} placeholder="Nhập yêu cầu công việc"></textarea>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Skill Tags</label>
                                <div className="col-sm-8">
                                    {/* <input type="" name='skill' onChange={handleInput} className="form-control" id="" placeholder="Ví dụ: JavaScript, C++, ...." /> */}
                                    <Autocomplete
                                        multiple
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        options={topSkill}
                                        onChange={onTagsChangeSkill}
                                        defaultValue={skill}
                                        getOptionLabel={(option) => option.title}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Skill tag" placeholder="Skill" />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Salary Range</label>
                                <div className="col-sm-4">
                                    <input type="" name='minSalary' onChange={handleInput} className="form-control" id="" placeholder="Ví dụ: 2000000" />
                                </div>
                                <div className="col-sm-4">
                                    <input type="" name='maxSalary' onChange={handleInput} className="form-control" id="" placeholder="Ví dụ: 5000000" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Benefits</label>
                                <div className="col-sm-8">
                                    <input type="" className="form-control" name='benefit' onChange={handleInput} id="" placeholder="Ví dụ: Lương tháng 13" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Date-end</label>
                                <div className="col-sm-8">
                                    <input type="date" className="form-control" value={jobData.endDate} name='endDate' onChange={handleInput} />
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

                            {/* <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Company Logo</label>
                                <div className="col-sm-8">
                                    <input type="file" class="form-control" accept="image/*" onChange={changeLogo} aria-label="Upload" />
                                </div>
                            </div> */}
                            {/* <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Company Photos</label>
                                <div className="col-sm-8">
                                    <input type="file" onChange={changeImage} accept="image/*" class="form-control" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                </div>
                            </div> */}
                        </form>
                        <div className="text-center">
                            <button type="" onClick={handleCreate} class="btn btn-primary btn-save">Post Job</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateJob
