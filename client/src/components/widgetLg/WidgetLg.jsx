import "./widgetLg.css";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { getAllSubmitedForCompany } from '../../redux/actions/sumitedAction';
import dateFormat from 'dateformat'
import { DataGrid } from "@material-ui/data-grid";

export default function WidgetLg() {

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    {
      field: 'position',
      headerName: 'Job title',
      width: 150,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 150,
      valueFormatter: (params) => { return dateFormat(params.value, 'dd/mm/yyyy') }

    },
    {
      field: 'submited',
      headerName: 'Submited',
      width: 150,
    },
    {
      field: 'selected',
      headerName: 'Selected',
      width: 120,
    },
  ]

  const { allJob, submited, auth } = useSelector(state => state)
  const [myJobs, setMyJobs] = useState(allJob.jobs ? allJob.jobs.filter(element => element.idCompany === auth.user._id) : [])
  const [mySubmited, setMySubmited] = useState(submited.submitedByCompany ? submited.submitedByCompany : [])
  const [post, setPost] = useState([])
  const dispatch = useDispatch()


  useEffect(() => {
    let arr = {}
    let arr1 = []
    if (submited.submitedByCompany) {
      arr = [...submited.submitedByCompany]
    }

    myJobs.map((element) => {
      let countSubmited = 0
      let countSelected = 0
      arr.map((data, index) => {
        if (element._id === data.idJob) {
          if (data.cv[0]) {
            data.cv.map(cv => {
              countSubmited++;
              if (cv.status === 'Accept') {
                countSelected++;
              }
            })
          }
        }
      })
      arr1 = [...arr1, { ...element, 'submited': countSubmited, 'selected': countSelected }]
    })
    setPost(arr1)
    console.log(arr1)
  }, [submited.submitedByCompany])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">List Job</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Job title</th>
          <th className="widgetLgTh">Date end</th>
          <th className="widgetLgTh text-center">Total submited</th>
          <th className="widgetLgTh text-center">Total selected</th>
        </tr>
        {
          post.map((element, index) => (
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                {/* <img
                  src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=""
                  className="widgetLgImg"
                /> */}
                <span className="widgetLgName">{element.position}</span>
              </td>
              <td className="widgetLgDate">{(new Date().getTime() - new Date(element.endDate).getTime() < 0) ? dateFormat(element.endDate, 'dd/mm/yyyy') : 'Expired'}</td>
              <td className="widgetLgAmount text-center">{element.submited}</td>
              <td className="widgetLgAmount text-center">{element.selected}</td>
            </tr>
          ))
        }
      </table>
    </div>
  );
}
