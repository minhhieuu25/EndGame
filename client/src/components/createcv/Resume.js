import React, { useEffect, useState } from 'react'
import Profile from './Profile';
import Education from './Education';
import Experience from './Experience';
import Extras from './Extras';
import { Link } from 'react-router-dom'
import { getResume, saveResume } from '../../redux/actions/resumeAction'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../utils/imageUpload';
import { deleteData } from '../../redux/actions/resumeAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

let arrEdu = [];
let arrExp = [];

const Resume = () => {

    const { allResume, auth, dataResume } = useSelector(state => state)
    const [avatar, setAvatar] = useState(dataResume.avatar ? dataResume.avatar : '')
    const [skill, setSkill] = useState(dataResume.skill ? dataResume.skill : [])
    const [language, setLanguage] = useState(dataResume.language ? dataResume.language : [])
    const [education, setEducation] = useState([])
    const [experience, setExperience] = useState([])

    const [loadEdu, setLoadEdu] = useState([1])
    const [loadExp, setLoadExp] = useState([1])



    const initState = {
        fullname: '',
        email: '',
        dateofBirth: '1900-01-01',
        position: '',
        phoneNumber: '',
        address: '',
        descriptionProfile: '',
        // skill: '',
        // language: ''
    }
    const [cvData, setCVData] = useState(initState)

    const {
        fullname,
        email,
        dateofBirth,
        position,
        phoneNumber,
        address,
        descriptionProfile,
        // skill,
        // language 
    } = cvData

    useEffect(() => {
        if (dataResume.resumes)
            setCVData(dataResume.resumes)
        console.log(cvData)
    }, [dataResume])

    const handleInput = e => {
        const { name, value } = e.target
        setCVData({ ...cvData, [name]: value })

    }

    const dispatch = useDispatch()

    const handlePreview = async () => {
        await dispatch(getResume(cvData, arrEdu, arrExp, skill, language, avatar))

    }

    const handleSave = async () => {
        // dispatch(saveResume(cvData, arrEdu, arrExp, skill, language, avatar, auth))
        console.log(arrEdu)
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if (err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: err }
        })
        setAvatar(file)
    }

    const handleDeleteEdu = (i) => {
        
    }

    return (
        <>
            <Profile handleInput={handleInput} changeAvatar={changeAvatar} values={cvData} />
            {
                loadEdu.map((element, index) => (
                    <Education handleInput={handleInput} values={cvData} index={index} arr={arrEdu} handleDelete={handleDeleteEdu} />
                ))
            }
            <div>
                <button type="button" class="btn btn-info" onClick={e => setLoadEdu([...loadEdu, 1])}>Add Education More</button>
            </div>
            {
                loadExp.map((element, index) => (
                    <>
                        <Experience handleInput={handleInput} values={cvData} index={index} arr={arrExp} />

                    </>
                ))
            }
            <div>
                <button type="button" class="btn btn-info" onClick={e => setLoadExp([...loadExp, 1])}>Add Experience More</button>
            </div>
            <Extras handleInput={handleInput} handleSkill={setSkill} handleLanguage={setLanguage} values={cvData}
                dataSkill={skill} dataLanguage={language} />
            <div className="mt-3 mb-5">
                <button type="button" class="btn btn-primary btn-lg mr-3" onClick={handleSave}>Save CV</button>
                <Link to='/viewcv'><button type="button" onClick={handlePreview} class="btn btn-primary btn-lg">Preview</button></Link>
            </div>
        </>
    )
}

export default Resume
