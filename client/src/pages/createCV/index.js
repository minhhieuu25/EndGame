import React from 'react';
import Resume from '../../components/createcv/Resume';

const CreateCV = () => {
    return (
        <div className="create-cv">
            <div className="create-cv-header">
                <h2 className="text-center text-2 mt-3">Create online CV</h2>
            </div>
            <div className="container text-center">
                <Resume />
            </div>
        </div>
    );
};

export default CreateCV;