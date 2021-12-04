import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import './SubmitCVModal.scss'
import { submitCV } from '../../redux/actions/resumeAction'
import { Link } from 'react-router-dom'

const SubmitCVModal = ({ setShowSubmitCV, job }) => {

    const dispatch = useDispatch()
    // const { id } = useParams()
    const { auth, allResume, socket, allJob } = useSelector(state => state)
    const [resumes, setResumes] = useState([])
    const [selected, setSelected] = useState({})
    const [idCompany, setIdCompany] = useState('')
    useEffect(() => {
        if (allResume.resumes) {
            setResumes(allResume.resumes)
            setSelected(allResume.resumes[0])
        }
        if (allJob.jobs) {
            allJob.jobs.map(element => {
                if (element._id === job._id)
                    setIdCompany(element.idCompany)
            })
        }
        if (allJob.searchJob) {
            allJob.searchJob.map(element => {
                if (element._id === job._id)
                    setIdCompany(element.idCompany)
            })
        }
    }, [allResume.resumes])

    const handleOnChange = (data) => {
        setSelected(data)
    }

    const handleSubmit = () => {
        dispatch(submitCV(job._id, job.endDate, idCompany, selected, auth, socket))
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
                <h6>You have <span>{resumes.length}</span> resume on RankWorks. Please select a resume to apply for:</h6>
                <div className="mt-3 list-cv-data">
                    {resumes.map((data, index) => (
                        <>
                            <input type="radio"
                                name="vote"
                                value={data}
                                id={data._id}
                                key={index}
                                checked={selected._id === data._id}
                                onChange={e => handleOnChange(data)} />
                            <label key={index} htmlFor={data._id} title={data.position}>{data.position}</label>
                        </>

                    ))}
                </div>
                <div className="button-submit-cv text-center">
                    {resumes.length > 0 ? <button type="button" class="btn btn-submit-cv" onClick={handleSubmit}><i className="far fa-paper-plane" ></i> Send</button> : <h6>Please create CV</h6>}
                </div>
                <hr />
                <div className="button-no-cv mt-4">
                    <p className="font-weight-bold">If you do not have a resume file:</p>
                    <Link to={'/createCV'}><button type="button" className="btn btn-new-cv-1 text-uppercase"><i className="fas fa-pen-alt"></i> Create CV online</button></Link>
                </div>
                <div className="close-submit" onClick={() => setShowSubmitCV(false)}>
                    &times;
                </div>
            </div>
        </div>
    )
}

export default SubmitCVModal
