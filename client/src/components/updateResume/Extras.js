import React from 'react'
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const Extras = ({ handleInput, handleData, handleLanguage, values }) => {

  const topSkill = [
    { title: 'JavaScript' },
    { title: 'Problem-Solving Skills' },
    { title: 'Planning and Organizational Skills' },
    { title: 'Data Analysis' },
    { title: 'Adaptability' },]

  const topLanguage = [
    { title: "English" },
    { title: "Japanses" },
    { title: "Chineses" },
    { title: "Korean Laguage" },
    { title: "Other" }
  ]
  const onTagsChange = (event, values) => {

    handleData(values)
  }
  const onTagsChangeLanguage = (event, values) => {
    handleLanguage(values)
  }



  return (
    <div className="extras-cv mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3">Extras Details</h3>
          <form>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Skill</label>
              <div className="col-sm-8">
                {/* <input type="text" className="form-control" onChange={handleInput} value={values.skill} name='skill' placeholder="Ex: Java" /> */}
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={topSkill}
                  onChange={onTagsChange}
                  defaultValue={values.skill}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="limitTags" placeholder="Skill" />
                  )}
                />
              </div>
            </div>
            <hr />
            <div className="mb-3">
              <button type="button" class="btn btn-info">Add Skill More</button>
            </div>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Language</label>
              <div className="col-sm-8">
                {/* <input type="text" className="form-control" onChange={handleInput} defaultValue={values.language} name='language' placeholder="Ex: English" /> */}
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={topLanguage}
                  onChange={onTagsChangeLanguage}
                  defaultValue={values.language}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="limitTags" placeholder="Skill" />
                  )}
                />
              </div>
            </div>
            <hr />
            <div>
              <button type="button" class="btn btn-info">Add Language More</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Extras
