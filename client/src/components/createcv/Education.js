import React from 'react'

const Education = ({ handleInput, values }) => {
  return (
    <div className="education-cv mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3">Education Details</h3>
          <form>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} defaultValue={values.nameSchool} name='nameSchool' placeholder="Ex: Duy Tan University" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Khoa/ Nganh</label>
              <div className="col-sm-8">
                <input type="email" className="form-control" onChange={handleInput} defaultValue={values.major} name='major' placeholder="Ex: Technology Information" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Time</label>
              <label for="" className="col-sm-1 col-form-label">From</label>
              <div className="col-sm-3">
                <input type="date" className="form-control" onChange={handleInput} name='startDateEducation' />
              </div>
              <label for="" className="col-sm-1 col-form-label">To Year</label>
              <div className="col-sm-3">
                <input type="date" className="form-control" onChange={handleInput} name='endDateEducation' />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea className="form-control" onChange={handleInput} defaultValue={values.descriptionEducation} name='descriptionEducation' placeholder="Description"></textarea>
              </div>
            </div>
          </form>
          <hr />
          <div>
            <button type="button" class="btn btn-info">Add Education More</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education
