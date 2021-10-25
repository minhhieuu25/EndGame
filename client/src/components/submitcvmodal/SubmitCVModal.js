import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import './SubmitCVModal.scss'
import { submitCV } from '../../redux/actions/resumeAction'

const SubmitCVModal = ({ setShowSubmitCV, job }) => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { auth, allResume, socket, allJob } = useSelector(state => state)
    const [resumes, setResumes] = useState([])
    const [selected, setSelected] = useState('')
    const [idCompany, setIdCompany] = useState('')
    useEffect(() => {
        if (allResume.resumes) {
            setResumes(allResume.resumes)
            setSelected(allResume.resumes[0]._id)
        }
        if (allJob.jobs) {
            allJob.jobs.map(element => {
                if (element._id === id)
                    setIdCompany(element.idCompany)
            })
        }
        if (allJob.searchJob) {
            allJob.searchJob.map(element => {
                if (element._id === id)
                    setIdCompany(element.idCompany)
            })
        }
    }, [allResume.resumes])

    const handleOnChange = (e) => {
        setSelected(e.target.value)
    }

    const handleSubmit = () => {
       
        dispatch(submitCV(id, idCompany, selected, auth, socket))
        setShowSubmitCV(false)
    }

    return (
        <div className="submit-cv" onLoad={window.scrollTo(0, 0)}>
            <div className="submit-cv-box">
                <h4 className="text-center font-weight-bold">Apply Now</h4>
                <hr />
                <h6>You are applying for:</h6>
                <div className="card">
                    <div className="card-body">
                        <span className="name-job"> {job.position}</span>
                    </div>
                </div>
                <hr />
                <h6>You have <span>2</span> resume on RankWorks. Please select a resume to apply for:</h6>
                <div className="mt-3 list-cv-data">
                    {resumes.map((data, index) => (
                        <>
                            <input type="radio"
                                name="vote"
                                value={data._id}                          
                                id={data._id}
                                key={index}
                                checked={selected === data._id}
                                onChange={handleOnChange} />                              
                            <label key={index} htmlFor={data._id} title={data.position}>{data.position}</label>
                        </>

                    ))}
                </div>
                <div className="button-submit-cv text-center">
                    <button type="button" class="btn btn-submit-cv" onClick={handleSubmit}><i className="far fa-paper-plane" ></i> Send</button>
                </div>
                <hr />
                <div className="button-no-cv mt-4">
                    <p className="font-weight-bold">If you do not have a resume file:</p>
                    <button type="button" className="btn btn-new-cv-1 text-uppercase"><i className="fas fa-pen-alt"></i> Create CV online</button>
                </div>
                <div className="close-submit" onClick={() => setShowSubmitCV(false)}>
                    &times;
                </div>
            </div>
        </div>
    )
}

export default SubmitCVModal
