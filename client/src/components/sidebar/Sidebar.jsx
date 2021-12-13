import {
  AddToQueue, ChatBubbleOutline, DynamicFeed, LineStyle, MailOutline, PermIdentity,
  PlayCircleOutline, QueuePlayNext, Report, Timeline,
  TrendingUp, WorkOutline
} from '@mui/icons-material';
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/dashboard" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                DashBoard
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            {/* <Link to="/userList" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link> */}
            {/* <Link to="/cvmanage" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                CV 
              </li>
            </Link>           */}
            <Link to="/newJob" className="link">
              <li className="sidebarListItem">
                <AddToQueue className="sidebarIcon" />
                Post Job
              </li>
            </Link>
            <Link to="/managejob" className="link">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage Jobs
              </li>
            </Link>
            {/* <Link to="/newList" className="link">
              <li className="sidebarListItem">
                <QueuePlayNext className="sidebarIcon" />
                Add 
              </li>
            </Link> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li> */}
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li> */}
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
