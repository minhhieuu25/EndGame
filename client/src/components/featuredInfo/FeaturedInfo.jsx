import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function FeaturedInfo() {

  const { allJob, auth, submited } = useSelector(state => state)
  const [jobs, setJobs] = useState(allJob.jobs ? allJob.jobs.filter(element => element.idCompany === auth.user._id) : [])

  useEffect(() => {
    if (allJob.jobs) {
      const arr = allJob.jobs.filter(element => element.idCompany === auth.user._id)
      setJobs(arr)
    }
  }, [allJob.jobs])



  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Job total</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{jobs.length}</span>
          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative" />
          </span> */}
        </div>
        <span className="featuredSub">Total of job that you posted</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Jobs Expired</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{jobs.filter(data => new Date() < new Date(data.endDate)).length}</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span> */}
        </div>
        <span className="featuredSub">Total of job that unexpired</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Resume</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          {/* <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span> */}
        </div>
        <span className="featuredSub">Total of Resume</span>
      </div>
    </div>
  );
}
