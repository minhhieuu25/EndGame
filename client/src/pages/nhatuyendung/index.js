import React from 'react';
import './nhatuyendung.scss'
import img1 from './img_cty1.png'
import img2 from './img_cty2.png'
import img3 from './img_cty3.png'
import img0 from './home-teamworks.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const NhaTuyenDung = () => {

    const { auth } = useSelector(state => state)

    return (
        <div className="for-employers pb-5" onLoad={window.scrollTo(0, 0)}>
            <div className="banner-employers">
                <div className="container header-1">
                    <div className="row content-banner">
                        <div className="col-sm-6 content-1">
                            <h3 id="section-header-0">Helping Your Business Move Up</h3>
                            <p id="section-header-1">Get Your Job Matched With The Right Candidate</p>
                        </div>
                        <div className="col-sm-6 img-header">
                            <img src={img0} alt="" />
                        </div>
                    </div>
                </div>
                {!auth.isCompany && !auth.isAdmin &&
                    <div className="become-employers">
                        <Link to={`/becomeCompany`}>Become Employers</Link>
                    </div>
                }
                {auth.token ?
                    <></>
                    :
                    <div className="become-employers">
                        <Link to={`/login`}>Become Employers</Link>
                    </div>
                }
            </div>
            {/* <div className="container nutnhan">
                <a href="#1" className="text-center">
                    nhấn vào
                </a>
            </div> */}
            <section id="1" className="container home-company-content mt-5">
                <div id="section-header-2">
                    <h3 className="text-center">WHAT WE OFFER</h3>
                    <p className="text-center">We provide a variety of services which help employers connect with more talents, so they can hire faster</p>
                </div>
                <div id="section-1" className="row">
                    <div className="col-sm-6 img-1">
                        <img src={img1} alt="" />
                    </div>
                    <div className="col-sm-6 detail">
                        <h4>Post Job</h4>
                        <ul>
                            <li><i class="far fa-check-square"></i> 100% Satisfaction guaranteed</li>
                            <li><i class="far fa-check-square"></i> Post a job and recieve applications quickly</li>
                            <li><i class="far fa-check-square"></i> Manage your application online easily</li>
                        </ul>
                    </div>
                </div>
                <div id="section-2" className="row">
                    <div className="col-sm-6 detail-1">
                        <h4>Search Resume</h4>
                        <ul>
                            <li><i class="far fa-check-square"></i> 30-day unlimited access to professionals database</li>
                            <li><i class="far fa-check-square"></i> Get results that precisely match people with your jobs</li>
                            <li><i class="far fa-check-square"></i> Proactively search for candidates and start hiring today</li>
                        </ul>
                    </div>
                    <div className="col-sm-6 img-1 text-right">
                        <img className="text-end" src={img2} alt="" />
                    </div>
                </div>
                <div id="section-3" className="row">
                    <div className="col-sm-6 img-1">
                        <img src={img3} alt="" />
                    </div>
                    <div className="col-sm-6 detail">
                        <h4>Employer Branding</h4>
                        <ul>
                            <li><i class="far fa-check-square"></i> More than 7 million job seekers visit RankWorks a month</li>
                            <li><i class="far fa-check-square"></i> Employer logos and banners have been optimized to attract the most qualified candidates</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NhaTuyenDung;