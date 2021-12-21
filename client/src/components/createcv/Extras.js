import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddSkill from './AddSkill'

let arrSkill = []

const Extras = ({ handleInput, handleSkill, handleLanguage, values, dataSkill, dataLanguage }) => {

  const topSkill = [
    { title: 'JavaScript' },
    { title: 'Problem-Solving Skills' },
    { title: 'Planning and Organizational Skills' },
    { title: 'Data Analysis' },
    { title: 'Adaptability' },
    { title: "Other" }
  ];

  const topLanguage = [
    { title: "English" },
    { title: "Japanses" },
    { title: "Chineses" },
    { title: "Korean Laguage" },
    { title: "Other" }
  ]
  const onTagsChangeSkill = (event, values) => {

    handleSkill(values)

  }
  const onTagsChangeLanguage = (event, values) => {
    handleLanguage(values)
  }

  const [load, setLoad] = useState([1])

  const handleDeleteSkill = (i) => {
    dataSkill.splice(i, 1)
    load.splice(i, 1)
    let tmp = [...load]
    setLoad(tmp)
  }


  return (
    <div className="extras-cv mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3">Extras Details</h3>
          <form>
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label mt-4">Skill</label>
              <div className="col-sm-8">
                {
                  load.map((data, index) => (
                    <AddSkill index={index} load={load} handleDeleteSkill={handleDeleteSkill} arr={dataSkill} />
                  ))
                }
                <button type="button" onClick={e => setLoad([...load, 1])} class="btn btn-add-skill btn-info mt-3">Add Skill More</button>
              </div>
            </div>
            <hr />
            <div className="row mb-3">
              <label for="" className="col-sm-3 col-form-label">Language</label>
              <div className="col-sm-8">
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={topLanguage}
                  onChange={onTagsChangeLanguage}
                  defaultValue={dataLanguage}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Language" placeholder="Language" />
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Extras
