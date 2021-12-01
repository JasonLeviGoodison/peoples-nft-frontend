import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ConfirmationModal from './ConfirmationModal';
import "./Entries.css"
import WalletCard from './WalletCard';

const Entries = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [entries, setEntries] = useState(null)
  const [clickedEntry, setClickedEntry] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);


  useEffect(() => {
    getEntries()
  }, [])

  const getEntries = async () => {
    var response = await fetch('http://localhost:3000/entries/getall');
    var results = await response.json()
    console.log(results)
    setEntries(results)
  }

  const voteForEntryClicked = (index) => {
    return () => {
      setClickedEntry(index);
      setOpenConfirmation(true);
    }
  }

  return (
    <div>
      <WalletCard setConnectedWallet={setConnectedWallet}/>
      {connectedWallet &&
        <div>
          <ConfirmationModal entry={clickedEntry} isOpen={openConfirmation} setIsOpen={setOpenConfirmation}/>
          {/*<h1> Choose wisely, you can only vote on one design </h1>*/}
          <h3> Voting will open when we have all 100 entries ({entries.length} / 100) </h3>
          <div className="grid-container">
            {entries && entries.map((entry, index) => {
              //<Entry entry={entry}/>
              return (
                <div style={{display: 'flex', flexDirection: 'column',   border: "1px solid rgba(0, 0, 0, 0.8)"}}>
                  <img className="grid-element" src={"https://ipfs.io/" + entry.url}/>
                  <div className="element-info">
                    Entry: {index + 1}
                    <Button onClick={voteForEntryClicked(index + 1)}> Vote </Button>
                  </div>
                </div>)
            })}
          </div>
        </div>
      }
    </div>
  );
}

export default Entries;