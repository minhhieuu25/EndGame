import React, { Fragment, useEffect, useState } from 'react';
import logo from '../../images/LogoFPT.png'
import { getAllJob } from '../../redux/actions/listJobAction'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';



const JobsComponent = (props) => {

    return (
        <Fragment>
            <div className="col-sm-9">
                <div className="job-list-name">
                    <Link to={`/jobdetail/${props.idJob}`} >
                        <span class="badge bg-info">New </span>
                        <span title={props.position}> {props.position}</span>
                    </Link>
                </div>
                <div className="job-list-name-company">
                    <Link to={`/companydetail/${props.idCompany}`} >
                        <span title={props.companyName}>{props.companyName}</span>
                    </Link>
                </div>
                <div className="row job-info">
                    <div className="salary col-sm-6">
                        <i class="fas fa-dollar-sign"></i>
                        <span>Salary: {props.minSalary / 1000000}-{props.maxSalary / 1000000} triệu</span>
                    </div>
                    <div className="location col-sm-6">
                        <i class="fas fa-map-marker-alt"></i>
                        <span title={props.address}>Location: {props.address}</span>
                    </div>
                </div>
                <div className="row job-info">
                    <div className="end-date col-sm-6">
                        <i class="far fa-clock"></i>
                        <span title={dateFormat(props.endDate, 'dd/mm/yyyy')}>Expires on: {dateFormat(props.endDate, 'dd/mm/yyyy')}</span>

                    </div>
                    <div className="exp col-sm-6">
                        <i class="fas fa-icicles"></i>
                        <span>Exp: 1 năm</span>
                    </div>
                </div>
            </div>
            <div className="col-sm-3 right-job">
                <img src={props.logo} alt="Logo company" />
            </div>
        </Fragment>
    );
};

export default JobsComponent;