/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import WalletCard from './WalletCard';
import Submit from './upload/Submit';

function NewSubmission(props) {

  const [title, setTitle] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(null);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  console.log()

  return (
    <div className="Card" style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
        <WalletCard setConnectedWallet={setConnectedWallet}/>
        {connectedWallet &&
          <div style={{ margin: 'auto', textAlign: 'left' }}>
              <form>
              <h2 style={{ textAlign: 'center', paddingBottom: 25 }}>New Submission</h2>
              <fieldset style={{ display: 'flex', flexDirection: 'column' }}>
                <label>
                  <input name="name" onChange={handleChange} placeholder="Title" style={{ width: '100%'}}/>
                </label>
              </fieldset>
            </form>
            <Submit style={{ margin: 'auto' }} title={title} address={connectedWallet}/>
          </div>
        }
        <span style={{width: 250, marginLeft: 'auto', marginRight: 'auto', marginTop: 100}}> <h3>Tip:</h3> Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive</span>
    </div>
  );
}

export default NewSubmission;
