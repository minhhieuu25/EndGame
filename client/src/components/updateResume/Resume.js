import React, { useEffect, useState } from 'react'
import Profile from './Profile';
import Education from './Education';
import Experience from './Experience';
import Extras from './Extras';
import { Link, useParams } from 'react-router-dom'
import { getResume, updateResume } from '../../redux/actions/resumeAction'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../utils/imageUpload';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';



const Resume = () => {

    const { allResume, auth } = useSelector(state => state)
    const { id } = useParams()


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
    }
    const [cvData, setcvData] = useState(allResume.resumes ? allResume.resumes.filter(element => id === element._id) : initState)
    const [avatar, setAvatar] = useState(allResume.resumes.filter(element => id === element._id).avatar)
    const [skill, setSkill] = useState([])
    const [language, setLanguage] = useState([])

    useEffect(() => {
        if (allResume.resumes) {
            const cv = allResume.resumes.filter(element => element._id === id)
            setSkill(cv[0].skill)
            setLanguage(cv[0].language)
            setcvData({ ...cv[0] })
        }

    }, [allResume.resumes])

    const handleInput = e => { //[]
        const { name, value } = e.target
        
        setcvData({ ...cvData, [name]: value })

    }

    const dispatch = useDispatch()

    const handlePreview = async () => {
        await dispatch(getResume(cvData, skill, language, avatar))

    }

    const handleUpdate = async () => {
        await dispatch(updateResume(id, cvData, skill, language, avatar, auth))

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
            <Extras handleInput={handleInput} handleData={setSkill} handleLanguage={setLanguage} values={cvData} />
            <div className="mt-3">
                <button type="button" class="btn btn-primary mr-3" onClick={handleUpdate}>Update CV</button>
                <Link to={`/reviewResume/${id}`}><button type="button" onClick={handlePreview} class="btn btn-primary">Preview</button></Link>
            </div>
        </>
    )
}

export default Resume
