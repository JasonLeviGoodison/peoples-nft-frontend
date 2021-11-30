import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ConfirmationModal from './ConfirmationModal';
import "./Entries.css"

const Entries = ({metamask}) => {
  const [entries, setEntries] = useState(null)
  const [clickedEntry, setClickedEntry] = useState(0);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  if (metamask == false) {
    alert("please log in to metamask");
    window.location = "/"
  }

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
      <ConfirmationModal entry={clickedEntry} isOpen={openConfirmation} setIsOpen={setOpenConfirmation}/>
      <h1> Choose wisely, you can only vote on one design </h1>
      <h3> Voting is: closed (until we have more entries) </h3>
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
  );
}

export default Entries;