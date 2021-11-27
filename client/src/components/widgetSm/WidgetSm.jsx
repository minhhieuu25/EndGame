import "./widgetSm.css";
import { Visibility } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function WidgetSm() {

  const { auth, submited } = useSelector(state => state)
  const [newSubmit, setNewSubmit] = useState([])

  useEffect(() => {
    if (submited.submitedByCompany) {
      let arr = []
      submited.submitedByCompany.map(element => {
        arr = [...arr, ...element.cv]
      })

      arr.sort((a, b) => {
        return new Date(b.dateSubmit) - new Date(a.dateSubmit);
      })

      if (arr.length <= 4) {
        setNewSubmit(arr)
      }
      else {
        setNewSubmit([arr[0], arr[1], arr[2], arr[3], arr[4]])
      }
    }
  }, [submited.submitedByCompany])


  // const getNewSubmit = (arr) => {
  //   arr.sort((a, b) => {
  //     return new Date(b.dateSubmit) - new Date(a.dateSubmit);
  //   })
  //   console.log('arr sort', arr)
  // }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">

        {
          newSubmit.map((element, index) => (
            <li className="widgetSmListItem">
              <img
                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{element.fullname}</span>
                <span className="widgetSmUserTitle">{element.dataCV.position}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        }

        {/* <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li> */}
      </ul>
    </div>
  );
}
