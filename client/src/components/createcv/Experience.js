import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

const Experience = ({ index, arr, handleDelete, load }) => {
  const initState = {
    nameCompany: '',
    positionCompany: '',
    startDate: '',
    endDate: '',
    descriptionExperience: ''
  }
  const [data, setData] = useState(initState)

  useEffect(() => {
    if (arr[index]) {
      setData(arr[index])
    }
  }, [load])

  const handleInputEducation = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    arr[index] = { ...arr[index], [name]: value }
  }


  return (
    <div className="experience-cv mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3">Experience Details</h3>
          <form>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Name Company</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInputEducation} value={data.nameCompany} name='nameCompany' placeholder="Ex: FPT Software" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Position</label>
              <div className="col-sm-8">
                <input type="email" className="form-control" onChange={handleInputEducation} value={data.positionCompany} name='positionCompany' placeholder="Ex: Ceo" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Time</label>
              <label for="" className="col-sm-1 col-form-label">From</label>
              <div className="col-sm-3">
                <input type="date" className="form-control" onChange={handleInputEducation} value={dateFormat(data.startDate, 'yyyy-mm-dd')} name="startDate" />
              </div>
              <label for="" className="col-sm-1 col-form-label">To Year</label>
              <div className="col-sm-3">
                <input type="date" className="form-control" onChange={handleInputEducation} value={dateFormat(data.endDate, 'yyyy-mm-dd')} name="endDate" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea className="form-control" onChange={handleInputEducation} value={data.descriptionExperience} name='descriptionExperience' placeholder="Description"></textarea>
              </div>
            </div>
          </form>
          <hr />
          <button type="button" class="btn btn-info" onClick={e => handleDelete(index)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Experience
