import React, { useEffect, useState } from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import './CreateJob.scss'

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
    { title: "Other" }
];

const level = [
    { level: 'First', point: '5' },
    { level: 'Second', point: '4' },
    { level: 'Third', point: '3' },
];

const AddSkill = ({ index, load, handleDeleteSkill, arr }) => {

    const initState = {
        title: 'JavaScript',
        point: '5'
    }
    const [data, setData] = useState(arr[index])

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
        console.log(arr[index])
    }

    // useEffect(() => {
    //     // if (!arrSkill[0]) {
    //     //     arrSkill[0] = { 'skill': topSkill[0].title, 'level': level[0] }
    //     // }
    //     console.log(load)
    // }, [])
    return (

        <div className='add-skill mt-3'>
            <Autocomplete
                className="mr-3"
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
                        arr[index] = { ...arr[index], 'title': newValue.title ? newValue.title : '' }
                        setData(newValue);
                        console.log(arr[index])
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
                    <TextField {...params} label="Free solo with text demo" />
                )}
            />

            {/* &emsp; */}
            <NativeSelect id="select"
                className="mr-3 high-23"
                onChange={handleInput}
            >
                {
                    level.map(element => (
                        <option value={element.point}>{element.level}</option>
                    ))
                }
            </NativeSelect>
            &emsp;
            {index > 0 && <button type="button" onClick={e => handleDeleteSkill(index)} class="btn btn-info">Delete</button>}
        </div>

    );
};

export default AddSkill;