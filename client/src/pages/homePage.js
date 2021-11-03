import React from 'react'
import Bannner from '../components/homePage/Banner/Banner'
import Evaluate from '../components/homePage/Evaluate/Evaluate'
import JobIndustry from '../components/homePage/JobIndustry/JobIndustry'
import JobType from '../components/homePage/JobType/JobType'
import TopCompany from '../components/homePage/TopCompany/TopCompany'

const HomePage = () => {
    return (<>
        <Bannner />
        <TopCompany />
        <JobType />
        <JobIndustry />
        <Evaluate />
    </>
    )

}

export default HomePage
