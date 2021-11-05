import React from 'react';
import Resume from '../../components/updateResume/Resume';


const updateResume = () => {
    return (
        <div className="create-cv">
            <div className="create-cv-header">
                <h2 className="text-center text-2 mt-3">Edit online CV</h2>
            </div>
            <div className="container text-center">
                <Resume />
            </div>
        </div>
    );
}

export default updateResume
