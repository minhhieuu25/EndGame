import React from 'react';
import './Banner.scss'
import SearchJob from '../../jobs/SearchJob'

const Banner = () => {
    return (
        <div className="find-jobs-content">
            <div className="container">
                <h2 className="find-jobs-title">Find your job <br />
                    <small>The easiest way to find a dream job in minutes</small>
                </h2>           
                <SearchJob />               
                <div className="find-jobs-keyword mt-2">
                    <p>Popular searches:</p>
                    <ul>
                        <li><a href="/">IT - Sotfware</a></li>
                        <li><a href="/">Auditing</a></li>
                        <li><a href="/">Architeture</a></li>
                        <li><a href="/">Banking</a></li>
                        <li><a href="/">Marketing</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Banner;