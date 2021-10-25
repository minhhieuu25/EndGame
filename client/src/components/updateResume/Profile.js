import React from 'react'
import './createcv.scss'
import dateFormat from 'dateformat'

const Profile = ({ handleInput, changeAvatar, values }) => {
  return (
    <div className="profile-cv" onLoad={window.scrollTo(0, 0)}>
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3">Personal Details</h3>
          <form>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Full Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} defaultValue={values.fullname} name='fullname' placeholder="Ex: Nguyen Van A" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-8">
                <input type="email" className="form-control" onChange={handleInput} defaultValue={values.email} name='email' placeholder="Ex: rankwork@work.com" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Phone</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} defaultValue={values.phoneNumber} name='phoneNumber' placeholder="Ex: 0123456789" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Address</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} defaultValue={values.address} name='address' placeholder="Ex: 1234 Da Nang" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Date of Birth</label>
              <div className="col-sm-8">
                <input type="date" className="form-control" onChange={handleInput} defaultValue={dateFormat(values.dateofBirth, "dd/mm/yyyy")} name='dateofBirth' />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Avatar</label>
              <div className="col-sm-8">
                <input type="file" name="file" id="file_up"
                  accept="image/*" onChange={changeAvatar} class="form-control" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Vi tri ung tuyen</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} defaultValue={values.position} name='position' placeholder="Ex: CEO" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea className="form-control" onChange={handleInput} defaultValue={values.descriptionProfile} name='descriptionProfile' placeholder="Description"></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
