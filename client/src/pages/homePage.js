import React, { useEffect } from 'react'

import Bannner from '../components/homePage/Banner/Banner'
import Evaluate from '../components/homePage/Evaluate/Evaluate'
import JobIndustry from '../components/homePage/JobIndustry/JobIndustry'
import JobType from '../components/homePage/JobType/JobType'
import TopCompany from '../components/homePage/TopCompany/TopCompany'


let scroll = 0;

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
