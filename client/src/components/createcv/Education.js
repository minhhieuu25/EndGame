import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

const Education = ({ index, arr, handleDelete, load }) => {

  const initState = {
    nameSchool: '',
    major: '',
    startDate: '',
    endDate: '',
    descriptionEducation: ''
  }

  const [data, setData] = useState(initState)

  useEffect(() => {
    if (arr[index]) {
      setData(arr[index])
    }
  }, [load])



  const handleInputEducation = e => {
    const { name, value } = e.target
    arr[index] = { ...arr[index], [name]: value }
    setData({ ...data, [name]: value })
  }

  return (
    <>
      <form>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Name</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" onChange={handleInputEducation} value={data.nameSchool} name='nameSchool' placeholder="Ex: Duy Tan University" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Major</label>
          <div className="col-sm-8">
            <input type="email" className="form-control" onChange={handleInputEducation} value={data.major} name='major' placeholder="Ex: Technology Information" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Time</label>
          <label for="" className="col-sm-1 col-form-label">From</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" onChange={handleInputEducation} value={dateFormat(data.startDate, 'yyyy-mm-dd')} name='startDate' />
          </div>
          <label for="" className="col-sm-1 col-form-label">To Year</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" onChange={handleInputEducation} value={dateFormat(data.endDate, 'yyyy-mm-dd')} name='endDate' />
          </div>
        </div>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Description</label>
          <div className="col-sm-8">
            <textarea className="form-control" onChange={handleInputEducation} value={data.descriptionEducation} name='descriptionEducation' placeholder="Description"></textarea>
          </div>
        </div>
      </form>
      {index > 0 && <button type="button" class="btn btn-info" onClick={e => handleDelete(index)}>Delete</button>}
      <hr />
    </>
  )
}

export default Education
