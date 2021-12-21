import React from 'react'
import './profile.scss'

const dataSize = [
  "10-",
  "10-24",
  "25-99",
  "100-499",
  "500-999",
  "1000-4999"
]

const Profile = ({ handleInput, changeAvatar, values, setSize }) => {

  return (
    <div className="profile-cv">
      <div className="card">
        <div className="card-body">
          <form>
            <div></div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Name Company</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} name='companyName' placeholder="Ex: ABC" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Company Size</label>
              <div className="col-sm-8">
                <select className="form-control" id="" name='companySize' onChange={(e) => setSize(e.target.value)} placeholder="">
                  {
                    dataSize.map((element) => (
                      <option value={element}>{element}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-8">
                <input type="email" className="form-control" onChange={handleInput} name='email' placeholder="Ex: rankwork@work.com" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Phone Number</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} name='phoneNumber' placeholder="Ex: 0123456789" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Website</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} name='website' placeholder="Ex: abc@gmail.com" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Tax Code</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} name='taxCode' placeholder="" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Address</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} name='address' placeholder="Ex: 1234 Da Nang" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Logo</label>
              <div className="col-sm-8">
                <input type="file" name="file" id="file_up"
                  accept="image/*" onChange={changeAvatar} class="form-control" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Industry</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" onChange={handleInput} name='industry' placeholder="Ex: CEO" />
              </div>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Infomation of Company</label>
              <div className="col-sm-8">
                <textarea className="form-control" onChange={handleInput} name='info' placeholder="Description"></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
