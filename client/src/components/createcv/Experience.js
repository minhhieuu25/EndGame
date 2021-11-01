import React, { useState } from 'react'

const Experience = ({ handleInput, values, index, arr }) => {

  const [data, setData] = useState({})

  const handleInputEducation = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    arr[index] = data
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
                <input type="text" className="form-control" onChange={handleInputEducation} defaultValue={values.nameCompany} name='nameCompany' placeholder="Ex: FPT Software" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Position</label>
              <div className="col-sm-8">
                <input type="email" className="form-control" onChange={handleInputEducation} defaultValue={values.positonCompany} name='positonCompany' placeholder="Ex: Ceo" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Time</label>
              <label for="" className="col-sm-1 col-form-label">From</label>
              <div className="col-sm-3">
                <input type="date" className="form-control" onChange={handleInputEducation} name="startDate" />
              </div>
              <label for="" className="col-sm-1 col-form-label">To Year</label>
              <div className="col-sm-3">
                <input type="date" className="form-control" onChange={handleInputEducation} name="endDate" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea className="form-control" onChange={handleInputEducation} defaultValue={values.descriptionExperience} name='descriptionExperience' placeholder="Description"></textarea>
              </div>
            </div>
          </form>
          {/* <hr />
          <div>
            <button type="button" class="btn btn-info">Add Experience More</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Experience
