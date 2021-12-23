import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import dateFormat from 'dateformat'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { createJob } from '../../redux/actions/listJobAction'
// import { checkImage } from '../../utils/imageUpload'
import './CreateJob.scss'


import AddSkill from './AddSkill'


let arrSkill = []
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
    const dataExp = [
        "Not required",
        "1-2 years",
        "4-5 years",
        "5 years or more"
    ]


    const { auth, listCompany, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const [level, setLevel] = useState('Interns')
    const [jobType, setJobType] = useState('Full-time')
    const [companySize, setSize] = useState('10-')
    const [experience, setExp] = useState("Not required")
    const initState = {
        position: '', industry: '', address: '', description: '', requirement: '', minSalary: 0,
        maxSalary: 0, benefit: '', endDate: ''
    }
    const [jobData, setJobData] = useState(initState)

    const [skill, setSkill] = useState([])
    const [logo, setLogo] = useState('')
    const [image, setImage] = useState('')

    const [load, setLoad] = useState([1])

    const handleDeleteSkill = (i) => {
        arrSkill.splice(i, 1)
        load.splice(i, 1)
        let tmp = [...load]
        setLoad(tmp)
    }

    const handleInput = e => {
        const { name, value } = e.target
        setJobData({ ...jobData, [name]: value })

    }


    const handleCreate = () => {
        const result = dispatch(createJob(jobData, level, jobType, experience, arrSkill, companySize, logo, image, auth, socket))

    }
    const onTagsChangeSkill = (e, value) => {
        setSkill([value])
        console.log(skill)
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

    }, [])
    return (

        <div className="create-job" >
            <div className="container-create-job mt-1 mb-4">
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
                                    <input type="" className="form-control" id="" placeholder="Ex: Infomation technology" name='industry' onChange={handleInput} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Working Location</label>
                                <div className="col-sm-8">
                                    <input type="" name='address' onChange={handleInput} className="form-control" id="" placeholder="123 Da Nang" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Description</label>
                                <div className="col-sm-8">
                                    <textarea className="form-control" name='description' onChange={handleInput} placeholder="Description about job"></textarea>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Requirements</label>
                                <div className="col-sm-8">
                                    <textarea className="form-control" name='requirement' onChange={handleInput} placeholder="Requirement about job"></textarea>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Experience</label>
                                <div className="col-sm-8">
                                    <select className="form-control" id="" placeholder="" defaultValue='Not required' name='jobType' onChange={e => setExp(e.target.value)}>
                                        {
                                            dataExp.map((element) => (
                                                <option value={element}>{element}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label mt-3">Skill Tags</label>
                                <div className="col-sm-8">
                                    {
                                        load.map((data, index) => (
                                            <AddSkill index={index} load={load} handleDeleteSkill={handleDeleteSkill} arr={arrSkill} />
                                        ))
                                    }
                                    <button type="button" onClick={e => setLoad([...load, 1])} class="btn btn-info mt-3 btn-add-skill-1">Add Skill More</button>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Salary Range</label>
                                <div className="col-sm-4">
                                    <input type="" name='minSalary' onChange={handleInput} className="form-control" id="" placeholder="Ex: 2000000" />
                                </div>
                                <div className="col-sm-4">
                                    <input type="" name='maxSalary' onChange={handleInput} className="form-control" id="" placeholder="Ex: 5000000" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="" className="col-sm-3 col-form-label">Benefits</label>
                                <div className="col-sm-8">
                                    <input type="" className="form-control" name='benefit' onChange={handleInput} id="" placeholder="Ex: Competitive remuneration package" />
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
        </div >
    )
}

export default CreateJob
