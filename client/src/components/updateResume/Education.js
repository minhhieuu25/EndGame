
import React, { useEffect, useState } from 'react'


const Education = ({ index, arr, handleDelete, load }) => {

  const initState = {
    nameSchool: '',
    major: '',
    startDate: '',
    endDate: '',
    descriptionEducation: ''
  }

  const [data, setData] = useState(arr[index] ? arr[index] : initState)

  useEffect(() => {
    // console.log('edu', data)
    // if (allResume) {
    //   let tmp = {}
    //   allResume.resumes.map(element => {
    //     if (element.idCV === id) {
    //       tmp = { ...element }
    //     }
    //   })
    //   arr[index] = tmp
    //   setData(tmp)
    // }
    // else {
    //   arr[index] = initState
    // }
  }, [load, arr])



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
            <input type="text" className="form-control" onChange={handleInputEducation} defaultValue={data.nameSchool} name='nameSchool' placeholder="Ex: Duy Tan University" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Khoa/ Nganh</label>
          <div className="col-sm-8">
            <input type="email" className="form-control" onChange={handleInputEducation} defaultValue={data.major} name='major' placeholder="Ex: Technology Information" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Time</label>
          <label for="" className="col-sm-1 col-form-label">From</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" onChange={handleInputEducation} name='startDateEducation' />
          </div>
          <label for="" className="col-sm-1 col-form-label">To Year</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" onChange={handleInputEducation} name='endDateEducation' />
          </div>
        </div>
        <div className="row mb-3">
          <label for="" className="col-sm-3 col-form-label">Description</label>
          <div className="col-sm-8">
            <textarea className="form-control" onChange={handleInputEducation} defaultValue={data.descriptionEducation} name='descriptionEducation' placeholder="Description"></textarea>
          </div>
        </div>
      </form>
      {index > 0 && <button type="button" class="btn btn-info" onClick={e => handleDelete(index)}>Delete</button>}
      <hr />
    </>
  )
}

export default Education
