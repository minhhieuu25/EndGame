import React from 'react';
import { Link } from 'react-router-dom';
import logojob from '../../../images/logo-job.png';
import logobanhang from '../../../images/logojobindustry/logobanhang.png';
import logodientu from '../../../images/logojobindustry/logodientu.png';
import logoitmang from '../../../images/logojobindustry/logoit-mang.png';
import logoketoan from '../../../images/logojobindustry/logoketoan.png';
import logomarketing from '../../../images/logojobindustry/logomarketing.png';
import logonganhang from '../../../images/logojobindustry/logonganhang.png';
import logonhansu from '../../../images/logojobindustry/logonhansu.png';
import logonoithat from '../../../images/logojobindustry/logonoithat.png';
import logoquangcao from '../../../images/logojobindustry/logoquangcao.png';
import logotaichinh from '../../../images/logojobindustry/logotaichinh.png';
import logoxaydung from '../../../images/logojobindustry/logoxaydung.png';
import './JobIndustry.scss';


const JobIndustry = () => {

    return (
        <div className="job-important mt-5">
            <div className="container">
                <h2 className="text-center">Job Industries</h2>
                <h2 className="text-center text-2"></h2>
                <div className="slide-carousel mt-5">
                    <div id="carouselJobIndustry" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active row no-gutters">
                                <div className="row industry-card">
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logojob} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">IT - Software</span>
                                                        <span className="job-tag">44 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logotaichinh} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Finance / Investment</span>
                                                        <span className="job-tag">87 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logobanhang} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Sales</span>
                                                        <span className="job-tag">24 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logomarketing} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Marketing</span>
                                                        <span className="job-tag">83 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item row no-gutters">
                                <div className="row industry-card">
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logoitmang} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Networking</span>
                                                        <span className="job-tag">52 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logonganhang} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Banking</span>
                                                        <span className="job-tag">23 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logodientu} alt="" />
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Electrical /  Electronic</span>
                                                        <span className="job-tag">74 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logoxaydung} alt="" />
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Civl / Construction</span>
                                                        <span className="job-tag">123 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item row no-gutters">
                                <div className="row industry-card">
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logoquangcao} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Advertising / PR</span>
                                                        <span className="job-tag">12 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logonoithat} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Architeture</span>
                                                        <span className="job-tag">67 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logoketoan} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Auditing</span>
                                                        <span className="job-tag">7 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="box">
                                            <Link to="">
                                                <div className="box-job">
                                                    <img src={logonhansu} alt=""/>
                                                    <div className="box-content">
                                                        <span className="job-name text-uppercase">Human Resource</span>
                                                        <span className="job-tag">52 Jobs</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselJobIndustry" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselJobIndustry" role="button" data-slide="next">
                            <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default JobIndustry;