import React, { useEffect, useState } from 'react';
import './TopCompany.scss'
import LogoShinHan from '../../../images/LogoShinHan.png'
import LogoFPT from '../../../images/LogoFPT.png'
import LogoTech from '../../../images/LogoTech.png'
import LogoLG from '../../../images/logoLG.png'
import { useSelector } from 'react-redux';


const TopCompany = () => {

    const { topCompany } = useSelector(state => state)
    const [top, setTop] = useState(topCompany.topcompany ? topCompany.topcompany : [])

    useEffect(() => {
        if (topCompany.topcompany)
            setTop([...topCompany.topcompany])
    }, [topCompany.topcompany])

    return (
        <div className="company-best mt-5">
            <div className="container">
                <h2 className="text-center">Top Companies</h2>
                <h2 className="text-center text-2"></h2>
                {
                    top.map(element => (
                        <div className="row mt-3">
                            <div className="col-sm-3 col-6 company-block">
                                <a href="" target="_blank">
                                    <div className="company-box card">
                                        <img src={element._id.logo} />
                                        <div className="company-box-content">
                                            <div className="company-name text-uppercase">{element._id.companyName}</div>
                                            <span className="company-tag text-uppercase">New Job</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))
                }
                {/* <div className="row mt-3">
                    <div className="col-sm-3 col-6 company-block">
                        <a href="" target="_blank">
                            <div className="company-box card">
                                <img src={LogoFPT} />
                                <div className="company-box-content">
                                    <div className="company-name text-uppercase">Đại học FPT</div>
                                    <span className="company-tag text-uppercase">New Job</span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-sm-3 col-6 company-block">
                        <a href="" target="_blank">
                            <div className="company-box card">
                                <img src={LogoShinHan} />
                                <div className="company-box-content">
                                    <div className="company-name text-uppercase">ShinHan Bank</div>
                                    <span className="company-tag text-uppercase">New Job</span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-sm-3 col-6 company-block">
                        <a href="" target="_blank">
                            <div className="company-box card">
                                <img src={LogoTech} />
                                <div className="company-box-content">
                                    <div className="company-name text-uppercase">Techcombank</div>
                                    <span className="company-tag text-uppercase">New Job</span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-sm-3 col-6 company-block">
                        <a href="" target="_blank">
                            <div className="company-box card">
                                <img src={LogoLG} />
                                <div className="company-box-content">
                                    <div className="company-name text-uppercase">LG</div>
                                    <span className="company-tag text-uppercase">New Job</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default TopCompany;