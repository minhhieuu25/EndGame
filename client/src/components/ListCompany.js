import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ListCompany = () => {
    const dispatch = useDispatch()



    const { listCompany } = useSelector(state => state)
    const companies = listCompany.companies ? listCompany.companies : []

    useEffect(() => {
        // dispatch(getListCompany())
    }, [listCompany.companies])

    return (
        <>
            {
                companies.map((item, index) => (
                    < div className="col-sm-3 company-block" >
                        <Link to={`/companydetail/${item.idCompany}`} >
                            <div className="company-box">
                                <img src={item.logo ? item.logo : 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'} />
                                <div className="company-box-content">
                                    <div className="company-name text-uppercase">
                                        <span>{item.companyName}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div >
                ))
            }
        </>
    );
};

export default ListCompany;