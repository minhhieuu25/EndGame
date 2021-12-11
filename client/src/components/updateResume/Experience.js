import React, { useEffect, useState } from 'react'

const Experience = ({ index, arr, handleDelete, load }) => {

  const initState = {
    nameCompany: '',
    positionCompany: '',
    startDate: '',
    endDate: '',
    descriptionExperience: ''
  }

  const [data, setData] = useState(arr[index] ? arr[index] : initState)

  useEffect(() => {
    if (arr[index]) {
      setData(arr[index])
    }
  }, [load, arr])

  const handleInputEducation = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    arr[index] = { ...arr[index], [name]: value }
  }

  return (
    <>
      <form>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Name Company</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" onChange={handleInputEducation} defaultValue={data.nameCompany} name='nameCompany' placeholder="Ex: FPT Software" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Position</label>
          <div className="col-sm-8">
            <input type="email" className="form-control" onChange={handleInputEducation} defaultValue={data.positionCompany} name='positonCompany' placeholder="Ex: Ceo" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Time</label>
          <label for="" className="col-sm-1 col-form-label">From</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" />
          </div>
          <label for="" className="col-sm-1 col-form-label">To Year</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Description</label>
          <div className="col-sm-8">
            <textarea className="form-control" onChange={handleInputEducation} defaultValue={data.descriptionExperience} name='descriptionExperience' placeholder="Description"></textarea>
          </div>
        </div>
      </form>
      {index > 0 && <button type="button" class="btn btn-info" onClick={e => handleDelete(index)}>Delete</button>}
      <hr />
    </>
  )
}

export default Experience
