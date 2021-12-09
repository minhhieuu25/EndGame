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


let arrExp = []
let arrEdu = []
let arrSkill = []
const Resume = () => {

    const { allResume, auth } = useSelector(state => state)
    const { id } = useParams()



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
    const [cvData, setcvData] = useState(allResume.resumes ? allResume.resumes.filter(element => id === element._id) : initState)
    const [avatar, setAvatar] = useState(allResume.resumes ? allResume.resumes.filter(element => id === element._id).avatar : '')
    const [skill, setSkill] = useState([])
    const [language, setLanguage] = useState([])

    useEffect(() => {
        if (allResume.resumes) {
            const cv = allResume.resumes.filter(element => element._id === id)
            setSkill(cv[0].skill)
            setLanguage(cv[0].language)
            setcvData({ ...cv[0] })
            setLoadEdu(cv[0].educations)
            setLoadExp(cv[0].experiences)
            arrEdu = cv[0].educations
            arrExp = cv[0].experiences
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

            {/* <Education handleInput={handleInput} values={cvData} />
            <Experience handleInput={handleInput} values={cvData} />
            <Extras handleInput={handleInput} handleData={setSkill} handleLanguage={setLanguage} values={cvData} /> */}
            <Extras handleInput={handleInput} handleSkill={setSkill} handleLanguage={setLanguage} values={cvData}
                // dataSkill={skill} 
                dataSkill={arrSkill}
                dataLanguage={language} />
            <div className="mt-3">
                <button type="button" class="btn btn-primary mr-3" onClick={handleUpdate}>Update CV</button>
                <Link to={`/reviewResume/${id}`}><button type="button" onClick={handlePreview} class="btn btn-primary">Preview</button></Link>
            </div>
        </>
    )
}

export default Resume
