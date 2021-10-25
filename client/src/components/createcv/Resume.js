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


const Resume = () => {

    const { allResume, auth, dataResume } = useSelector(state => state)
    const [avatar, setAvatar] = useState(dataResume.avatar ? dataResume.avatar : '')
    const [skill, setSkill] = useState(dataResume.skill ? dataResume.skill : [])
    const [language, setLanguage] = useState(dataResume.language ? dataResume.language : [])

    const initState = {
        fullname: '',
        email: '',
        dateofBirth: '1900-01-01',
        images: '',
        position: '',
        phoneNumber: '',
        address: '',
        descriptionProfile: '',
        nameSchool: '',
        major: '',
        startDateEducation: '',
        endDateEducation: '',
        descriptionEducation: '',
        nameCompany: '',
        positonCompan: '',
        startDateExperience: '',
        endDateExperience: '',
        descriptionExperience: '',
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
        nameSchool,
        major,
        startDateEducation,
        endDateEducation,
        descriptionEducation,
        nameCompany,
        positonCompany,
        startDateExperience,
        endDateExperience,
        descriptionExperience,
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
        console.log(cvData)
    }

    const dispatch = useDispatch()

    const handlePreview = async () => {
        await dispatch(getResume(cvData, skill, language, avatar))

    }

    const handleSave = async () => {

        dispatch(saveResume(cvData, skill, language, avatar, auth))
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if (err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: err }
        })
        setAvatar(file)
    }

    return (
        <>
            <Profile handleInput={handleInput} changeAvatar={changeAvatar} values={cvData} />
            <Education handleInput={handleInput} values={cvData} />
            <Experience handleInput={handleInput} values={cvData} />
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
