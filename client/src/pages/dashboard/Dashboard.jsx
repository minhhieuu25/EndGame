import Chart from '../../components/chart/Chart'
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./dashboard.css";
import { userData } from "./dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Sidebar from "../../components/sidebar/Sidebar";
import '../manage/manage.scss'

export default function Dashboard() {
  return (
    <>
      <div className="manage_container" onLoad={window.scrollTo(0, 0)}>
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>

    </>
  );
}
