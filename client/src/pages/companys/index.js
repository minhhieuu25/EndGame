import React from 'react';
import './company.scss'
import SearchJob from '../../components/jobs/SearchJob';
import ListCompany from '../../components/ListCompany';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const Company = () => {

    const { listCompany } = useSelector(state => state)
    const companies = listCompany.companies ? listCompany.companies : []

    return (
        <div className="company-view mb-5" onLoad={window.scrollTo(0, 0)}>
            <SearchJob />
            <div className="container">
                <div className="mt-3 text-1">
                    <Link to='/'>Home</Link><span> / Company</span>
                </div>
                <div className="company-content mt-3 card">
                    <div className="card-body">
                        <h3>Found <span>{companies.length}</span> companies are recruiting</h3>
                        <div className="row">
                            <div className="company-list-ul">
                                <div className="company-list-li row">
                                    <ListCompany />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Company;