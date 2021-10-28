import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { searchJob } from '../../redux/actions/listJobAction';
import { useParams, useLocation, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const SearchJob = () => {

    const options = [
        {
            label: 'All locations',
            value: 'All locations'
        },
        {
            label: 'Ha Noi',
            value: 'Ha Noi'
        },
        {
            label: 'Da Nang',
            value: 'Da Nang'
        },
        {
            label: 'TP. Ho Chi Minh',
            value: 'TP. Ho Chi Minh'
        }
    ]
    const [address, setAddress] = useState('All locations')
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()


    const handleSearch = () => {

        dispatch(searchJob(search, address))

    }

    const handleOnchange = (e) => {
        setAddress(e.target.value)
    }
    return (
        <div className="job-search">
            <div className="container">
                <div className="form-row">
                    <div className="col-lg-7 col-md-6">
                        <div className="find-jobs-search">
                            <input type="text" id="txtTuKhoa" className="form-control"
                                placeholder="Keywords, titles,..." autoComplete="off" onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="find-jobs-select">
                            <select className="form-control dropdown" onChange={handleOnchange}>
                                {options.map((element) => (
                                    <option value={element.value}>{element.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3">
                        <div className="find-jobs-button">
                            <Link to='/jobs' >
                                <button type="button" className="btn btn-primary btn-tim-viec" onClick={handleSearch}>
                                    FIND JOB
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchJob;