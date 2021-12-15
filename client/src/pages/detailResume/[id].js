import dateFormat from 'dateformat';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Pdf from "react-to-pdf";
import './ViewCV.scss';

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
		educations: [],
		experiences: [],
		avatar: '',
		skill: [],
		language: []
	}


	const { id } = useParams()

	const { submited, auth } = useSelector(state => state)
	const [resume, setResume] = useState(initState)
	const dispatch = useDispatch()

	useEffect(() => {
		let data = {}
		if (submited.submited.cv) {
			submited.submited.cv.map(element => {
				if (element.idCV === id)
					data = { ...element.dataCV }
			})
			setResume({ ...data })
		}
	}, [])

	const handleAccept = () => {
		// dispatch(acceptResume())
	}

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
						{
							resume.experiences && resume.experiences.map(element => (
								<>
									<p>{element.nameCompany} ({dateFormat(element.startDate, 'mm/yyyy')} - {dateFormat(element.endDate, 'mm/yyyy')})</p>
									<p className="p-4-1">{element.descriptionExperience}</p>
								</>
							))
						}
						<br />
						<p className="head-1">Education</p>
						{
							resume.educations && resume.educations.map(element => (
								<>
									<p>{element.nameSchool} ({dateFormat(element.startDate, 'mm/yyyy')} - {dateFormat(element.endDate, 'mm/yyyy')})</p>
									<p className="p-4-1">{element.descriptionEducation}</p>
								</>
							))
						}
					</div>
				</div>
				<div className="clearfix-1"></div>
			</div>

			<div className="text-center">
				{/* <button className="btn btn-primary mr-2">Accept Resume</button>
				<button className="btn btn-primary mr-2">Refuse Resume</button> */}

				<Pdf targetRef={ref} filename="post.pdf">
					{({ toPdf }) => <button className="btn btn-primary" onClick={toPdf}>Download file PDF</button>}
				</Pdf>
			</div>
		</>
	)
}

export default ReviewResume
