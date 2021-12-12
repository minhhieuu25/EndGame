import React, { useState } from 'react'
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddSkill from './AddSkill';


const Extras = ({ handleInput, handleSkill, handleLanguage, values, dataSkill, dataLanguage }) => {

  const initState = [
    {
      title: 'JavaScript',
      level: 'basic'
    }
  ]
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

  const [load, setLoad] = useState(values.skill ? values.skill : initState)

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
              <label for="" className="col-sm-3 col-form-label mt-3">Skill</label>
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
                    <TextField {...params} label="Language" placeholder="Skill" />
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
