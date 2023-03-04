import React, { useContext, useEffect, useState } from 'react';
import './Input.css'
import { TextField, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

async function handleSubmit(event, text, title, name) {
  event.preventDefault();

  try {
    const response = await fetch('http://localhost:8080/api/createPost', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Content: text,
        Title: title,
        Author: name,
      }),
    });

    if (response.status === 401) {
      //
      throw new Error('You are not authorized for post creation');
    }

    if (!response.ok) {
      throw new Error('Error while creating the post');
    }

    return response;
  } catch (error) {
    return 
    // Handle the error appropriately, for example:
    // Show an error message to the user
    // Or log the error to an error tracking service
  }
}


  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: 'SOME CATEGORIES FOR THE FUTURE',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
const InputForm = () => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const userData = useSelector((state) => state.auth.username);

    return (
      <form className='input-form' onSubmit={(e) => handleSubmit(e, text,title, userData)}>
        <div className='input-group'>
          <h1>Create Post</h1>  
        </div>
        <div className='text-field-group'>
          <TextField id="title-form" className='mu-textfield' label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField
          id="outlined-select-currency"
          select
          label=""
          defaultValue="EUR"
          sx={{backgroundColor: 'aliceblue'}}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div> 
        <div className='textarea-group'>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
export default InputForm;