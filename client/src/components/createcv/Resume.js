import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { getResume, saveResume } from '../../redux/actions/resumeAction';
import { checkImage } from '../../utils/imageUpload';
import Education from './Education';
import Experience from './Experience';
import Extras from './Extras';
import Profile from './Profile';
import AddSkill from './AddSkill'


let arrEdu = [];
let arrExp = [];
let arrSkill = [];

const Resume = () => {

    const { dataResume, auth } = useSelector(state => state)
    const [avatar, setAvatar] = useState(dataResume.avatar ? dataResume.avatar : '')
    const [skill, setSkill] = useState(dataResume.skill ? dataResume.skill : [])
    const [language, setLanguage] = useState(dataResume.language ? dataResume.language : [])

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
    }
    const [cvData, setCVData] = useState(initState)

    useEffect(() => {
        if (dataResume.resumes)
            setCVData(dataResume.resumes)
    }, [dataResume])

    const handleInput = e => {
        const { name, value } = e.target
        setCVData({ ...cvData, [name]: value })

    }

    const dispatch = useDispatch()

    const handlePreview = async () => {
        // await dispatch(getResume(cvData, arrEdu, arrExp, arrSkill, language, avatar))
        console.log(arrEdu)
    }

    const handleSave = async () => {
        dispatch(saveResume(cvData, arrEdu, arrExp, arrSkill, language, avatar, auth))
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
        arrEdu.splice(i, 1)
        const tmp = loadEdu.splice(i, 1)
        setLoadEdu(tmp)
    }
    const handleDeleteExp = (i) => {
        arrExp.splice(i, 1)
        const tmp = loadExp.splice(i, 1)
        setLoadExp(tmp)
    }

    return (
        <>
            <Profile handleInput={handleInput} changeAvatar={changeAvatar} values={cvData} />
            {
                loadEdu.map((element, index) => (
                    <Education index={index} arr={arrEdu} handleDelete={handleDeleteEdu} load={loadEdu} />
                ))
            }
            <div>
                <button type="button" class="btn btn-info" onClick={e => setLoadEdu([...loadEdu, 1])}>Add Education More</button>
            </div>
            {
                loadExp.map((element, index) => (
                    <>
                        <Experience index={index} arr={arrExp} handleDelete={handleDeleteExp} load={loadExp} />

                    </>
                ))
            }
            <div>
                <button type="button" class="btn btn-info" onClick={e => setLoadExp([...loadExp, 1])}>Add Experience More</button>
            </div>
            <Extras handleInput={handleInput} handleSkill={setSkill} handleLanguage={setLanguage} values={cvData}
                // dataSkill={skill} 
                dataSkill={arrSkill}
                dataLanguage={language} />
            <div className="mt-3 mb-5">
                <button type="button" class="btn btn-primary btn-lg mr-3" onClick={handleSave}>Save CV</button>
                <Link to='/viewcv'><button type="button" onClick={handlePreview} class="btn btn-primary btn-lg">Preview</button></Link>
            </div>
        </>
    )
}

export default Resume
