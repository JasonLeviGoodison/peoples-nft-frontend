/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Submit from './upload/Submit';

function NewSubmission(props) {

  const [title, setTitle] = useState(null);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className="Card" style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
      <form style={{ margin: 'auto', textAlign: 'left' }}>
        <h2 style={{ textAlign: 'center', paddingBottom: 25 }}>New Submission</h2>
        <fieldset style={{ display: 'flex', flexDirection: 'column' }}>
          <label>
            <input name="name" onChange={handleChange} placeholder="Title" style={{ width: '100%'}}/>
          </label>
        </fieldset>
      </form>
      <Submit style={{ margin: 'auto' }} title={title}/>
    </div>
  );
}

export default NewSubmission;
