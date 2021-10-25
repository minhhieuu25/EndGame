import React from 'react';
import CompanyInfor from '../../components/becomeCompany/CompanyInfor';

const BecomeCompany = () => {
    return (
        <div className="create-cv">
            <div className="create-cv-header">
                <h2 className="text-center text-2 mt-3">Regiter to Company</h2>
            </div>
            <div className="container text-center">
                <CompanyInfor />
            </div>
        </div>
    );
};

export default BecomeCompany;