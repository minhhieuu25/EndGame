import React from 'react'
import ManageJobs from "../../components/managejob/ManageJob";
import Sidebar from '../../components/sidebar/Sidebar';
import '../manage/manage.scss'
const ManageJob = () => {
    return (
        <>
            <div className="manage_container" onLoad={window.scrollTo(0, 0)}>
                <Sidebar />
                <ManageJobs />
            </div>

        </>
    )
}

export default ManageJob
