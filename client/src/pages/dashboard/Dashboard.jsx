import Chart from '../../components/chart/Chart'
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./dashboard.css";
import { userData } from "./dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Sidebar from "../../components/sidebar/Sidebar";
import '../manage/manage.scss'

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dateFormat from 'dateformat';



export default function Dashboard() {

  let dataChart = [
    {
      name: "Jan",
      "Total Resume": 0,
    },
    {
      name: "Feb",
      "Total Resume": 0,
    },
    {
      name: "Mar",
      "Total Resume": 0,
    },
    {
      name: "Apr",
      "Total Resume": 0,
    },
    {
      name: "May",
      "Total Resume": 0,
    },
    {
      name: "Jun",
      "Total Resume": 0,
    },
    {
      name: "Jul",
      "Total Resume": 0,
    },
    {
      name: "Agu",
      "Total Resume": 0,
    },
    {
      name: "Sep",
      "Total Resume": 0,
    },
    {
      name: "Oct",
      "Total Resume": 0,
    },
    {
      name: "Nov",
      "Total Resume": 0,
    },
    {
      name: "Dec",
      "Total Resume": 0,
    },
  ];

  const { auth, submited } = useSelector(state => state)
  const [data, setData] = useState([])

  useEffect(() => {
    if (submited.submitedByCompany) {
      let arr = []
      submited.submitedByCompany.map(element => {
        arr = [...arr, ...element.cv]
      })
      arr.map(element => {
        let month = parseInt(dateFormat(element.dateSubmit, 'mm'))
        dataChart[month - 1]['Total Resume'] = dataChart[month - 1]['Total Resume'] + 1
      })
      setData(data)
    }
  }, [submited.submitedByCompany])


  return (
    <>
      <div className="manage_container" onLoad={window.scrollTo(0, 0)}>
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <Chart data={dataChart} title="Resume submited Analytics" grid dataKey="Total Resume" />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>

    </>
  );
}
