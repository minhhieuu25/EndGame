import React, { useEffect, useState } from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import '../createjob/CreateJob.scss'

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

const topSkill = [
    { title: 'JavaScript' },
    { title: 'Problem-Solving Skills' },
    { title: 'Planning and Organizational Skills' },
    { title: 'Data Analysis' },
    { title: 'Adaptability' },
    { title: 'ReactJs' },
    { title: 'VueJs' },
    { title: 'Sql Server' },
    { title: 'MongooDB' },
    { title: 'C/C++' },
    { title: 'React Native' },
    { title: 'Python' },
    { title: 'PHP' },
    { title: 'Java' },
    { title: 'Switf' },
    { title: 'C#' },
    { title: 'Ruby' },
    { title: "Other" }
];

const level = [
    { level: 'basic', point: '1' },
    { level: 'intermediate', point: '3' },
    { level: 'competently', point: '5' },
];

const AddSkill = ({ index, load, handleDeleteSkill, arr }) => {

    const initState = {
        title: 'JavaScript',
        point: '1'
    }
    const [data, setData] = useState(initState)

    useEffect(() => {
        if (!data) {
            arr[index] = initState
            setData(initState)
            console.log('arr', arr)
        }
    }, [load])




    const handleInput = (event) => {
        arr[index] = { ...data, 'point': event.target.value }
        setData({ ...data, 'point': event.target.value })
        console.log(arr)
    }

    // useEffect(() => {
    //     // if (!arrSkill[0]) {
    //     //     arrSkill[0] = { 'skill': topSkill[0].title, 'level': level[0] }
    //     // }
    //     console.log(load)
    // }, [])
    return (
        <div className="add-skill">
            <Autocomplete
                value={data}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        arr[index] = {
                            ...data,
                            title: newValue,
                        }
                        setData({
                            ...data,
                            title: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        arr[index] = {
                            ...data,
                            title: newValue.inputValue,
                        }
                        setData({
                            ...data,
                            title: newValue.inputValue,
                        });
                    } else {
                        arr[index] = { ...arr[index], 'title': newValue.title ? '' : newValue.title }
                        setData(newValue);
                    }
                }}

                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            title: `Add "${inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={topSkill}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                }}
                renderOption={(props, option) => <li {...props}>{option.title}</li>}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="Skill" />
                )}
            />

            {/* &emsp; */}
            <NativeSelect id="select"
                onChange={handleInput}
            >
                {
                    level.map(element => (
                        <option value={element.point}>{element.level}</option>
                    ))
                }
            </NativeSelect>         
            {index > 0 && <button type="button" onClick={e => handleDeleteSkill(index)} class="btn btn-primary btn-save">Delete</button>}
        </div>

    );
};

export default AddSkill;