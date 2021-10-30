import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Pdf from "react-to-pdf";
import { useParams, Link, useLocation } from 'react-router-dom'
import './ViewCV.scss'

const ref = React.createRef();

const ReviewResume = () => {

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
		positionCompany: '',
		startDateExperience: '',
		endDateExperience: '',
		descriptionExperience: '',
		avatar: ''
	}

	const dispatch = useDispatch()
	const { id } = useParams()
	const { allResume, auth } = useSelector(state => state)

	const [resume, setResume] = useState(initState)

	useEffect(() => {
		let data = {}
		if (allResume.resumes) {
			allResume.resumes.map(element => {
				if (element._id === id) {
					data = { ...element }
				}
			})
		}
		setResume(data)
	}, [allResume.resumes])

	return (
		<>
			<div className="main-1" ref={ref}>
				<div className="top-section-1">
					<img className="profile-1" alt="avatar" src={resume.avatar} />
					<p className="p1-1">{resume.fullname}</p>
					<p className="p2-1">{resume.position}</p>
				</div>
				<div className="clearfix-1"></div>
				<div className="col-div-4-1">
					<div className="content-box-1" style={{ paddingLeft: '40px' }}>
						<p className="head-1">Contact</p>
						<p className="p3-1"><i className="fa fa-phone" aria-hidden="true"></i> &nbsp;&nbsp;{resume.phoneNumber}</p>
						<p className="p3-1"><i className="fa fa-envelope" aria-hidden="true"></i> &nbsp;&nbsp;{resume.email}</p>
						<p className="p3-1"><i className="fa fa-home" aria-hidden="true"></i> &nbsp;&nbsp;{resume.address}</p>
						<br />
						<p className="head-1">my skills</p>
						<ul className="skills-1">
							{
								resume.skill && resume.skill.map(element => (
									<li><span>{element.title}&nbsp;&nbsp;</span></li>
								))
							}
							{/* <li><span>{resume.skill}</span></li> */}
						</ul>
						<br />
						<p className="head-1">Languages</p>
						{
							resume.language && resume.language.map(element => (
								<p className="p3-1">{element.title}</p>
							))
						}
						{/* <p className="p3-1">{resume.language}</p> */}
					</div>
				</div>
				<div className="line-1"></div>
				<div className="col-div-8-1">
					<div className="content-box-1">
						<p className="head-1">profile</p>
						<p className="p3-1" style={{ fontSize: "14px" }}>{resume.descriptionProfile}</p>
						<br />
						<p className="head-1">EXPERIENCE</p>
						<p>{resume.nameCompany} (2018 - NOW)</p>
						<p className="p-4-1">{resume.descriptionExperience}</p>
						<br />
						<p className="head-1">Education</p>
						<p>{resume.nameSchool} (2018 - NOW)</p>
						<p className="p-4-1" >{resume.descriptionEducation}</p>
					</div>
				</div>
				<div className="clearfix-1"></div>
			</div>
			<div className="text-center">
				<Link className="edit-cv mr-2" to={`/updateResume/${resume._id}`}><button className="btn btn-primary">Edit CV</button></Link>
				<Pdf targetRef={ref} filename="post.pdf">
					{({ toPdf }) => <button className="btn btn-primary" onClick={toPdf}>Download file PDF</button>}
				</Pdf>
			</div>
		</>
	)
}

export default ReviewResume
