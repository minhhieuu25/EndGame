import React, { useEffect, useState } from 'react'
import './ViewCV.scss'
import Pdf from "react-to-pdf";
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ref = React.createRef();

const ViewCV = () => {

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
		skill: '',
		language: ''
	}
	const { dataResume } = useSelector(state => state)

	const [resume, setResume] = useState(dataResume.resumes ? dataResume.resumes : initState)

	useEffect(() => {
		if (dataResume.resumes)
			setResume(dataResume.resumes)
	}, [dataResume])



	return (
		<>
			<div className="main-1" ref={ref} onLoad={window.scrollTo(0, 0)}>
				<div className="top-section-1">
					<img className="profile-1" alt="avatr" src={dataResume.avatar} />
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
							<li><span>{resume.skill}</span></li>
						</ul>
						<br />
						<p className="head-1">Languages</p>
						<p className="p3-1">{resume.language}</p>
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
			<div className="text-center mb-5">
				<Link className="edit-cv mr-2" to={'/createCV'}><button className="btn btn-primary btn-lg">Edit CV</button></Link>
				<Pdf targetRef={ref} filename="post.pdf">
					{({ toPdf }) => <button className="btn btn-primary btn-lg" onClick={toPdf}>Download file PDF</button>}
				</Pdf>
			</div>
		</>

	)
}

export default ViewCV
