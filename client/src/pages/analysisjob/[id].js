import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import AnalysisJobs from '../../components/analysisjob/AnalysisJobs';
import '../manage/manage.scss'

const AnalysisJob = () => {
    return (
        <div className="manage_container" onLoad={window.scrollTo(0, 0)}>
            <Sidebar />
            <AnalysisJobs />
        </div>
    )
}

export default AnalysisJob
