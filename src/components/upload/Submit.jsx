import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Dropzone from '../dropzone/Dropzone';
import * as submissionApi from '../../api/submissionApi';
import * as routes from '../../routes/routes';
import './Submit.css';
import { Web3Provider } from '@ethersproject/providers';
import { Redirect } from 'react-router-dom'
import { useWeb3 } from '@openzeppelin/network/react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Submit(props) {

  const [file, setFile] = useState(null);
  const [address, setAddress] = useState(props.address);
  const [title, setTitle] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successfullUploaded , setSuccessfullUploaded] = useState(false);

  const infuraProjectId = 'bbf7d27b5657417ba89407a3904cee2a';
  const web3Context = useWeb3(`wss://rinkeby.infura.io/ws/v3/${infuraProjectId}`);
  const { networkId, networkName, providerName } = web3Context;
  console.log("Connected to ", networkId, networkName, providerName)

  const handleChange = (event) => {
    console.log("setting title", event.target.value)
    this.setState({ title: event.target.value });
  };

  const onFilesAdded = (files) => {
    console.log(files[0])
    this.setState(() => ({
      file: files[0]
    }));
  }

  const uploadEntry = async () => {
    console.log(title, address, "checking if valid form")
    if (!validForm()) {
      setUploading(false);
      alert('Error uploading entry');
      return;
    }

    await uploadFile()
      .then(async (url) => uploadForm(url, title, address))
      .then(() => {
        setUploading(false);
        alert("Your submission was accepted!");
        window.location = routes.ENTRIES;
      })
      .catch(((e) => {
        setUploading(false);
        alert('Error uploading entry');
        throw e;
      }));
  }

  const validForm = () => {
    return (
      title != null &&
      address != null &&
      file !== null);
  }

  const uploadForm = async (url, title, address) => {
    return submissionApi.UploadForm(url, title, address);
  }

  const uploadFile = async (id) => {
    setUploading(true);

    try {
      var url = await uploadFileToIPFS(file, id);
      console.log("URL", url)
      setUploading(false);
      //this.setState({ uploading: false });
      return url;
    } catch (e) {
      // TODO: Have a better error handler
      // eslint-disable-next-line no-alert
      alert('Could not upload files.');
      setUploading(false);
      //this.setState({ uploading: false });
      throw e;
    }
  }

  // eslint-disable-next-line
  const uploadFileToIPFS = (file, id) => {
    // TODO: RequestApi will need to return the ipfs url
    return new Promise((resolve, reject) => submissionApi.UploadFile(file, id)
      .then((url) => resolve(url))
      .catch((err) => {
        reject(err);
        throw err;
      }));
  }

  const renderActions = () => {
    return (
      <div>
        <Button
          variant="secondary"
          style={{ marginRight: 10 }}
          onClick={() => {
            setFile(null);
            setSuccessfullUploaded(false);
          }}
        >
          Reset
        </Button>
        <Button variant="primary" onClick={uploadEntry}>
          Upload
        </Button>
      </div>
    );
  }

  return (
    <div style={{ margin: 'auto', textAlign: 'left' }}>
      <form>
        <h2 style={{ textAlign: 'center', paddingBottom: 25 }}>New Submission</h2>
        <fieldset style={{ display: 'flex', flexDirection: 'column' }}>
          <label>
            <input name="name" onChange={handleChange} placeholder="Title" style={{ width: '100%'}}/>
          </label>
        </fieldset>
      </form>
      <div className="Upload">
        <div className="Content">
          <div style={{ paddingLeft: '5px' }}>
            <Dropzone
              onFilesAdded={onFilesAdded}
              disabled={uploading || successfullUploaded}
            />
          </div>
          {
            file !== null && 
            <div className="Files">
              <div className="Row">
                <span style={{marginRight: 'auto', marginLeft: 'auto', fontFamily: 'sans-serif'}}>You're submitting</span>
                <span className="Filename">{file.name}</span>
              </div>
            </div>
          }
        </div>
        <div className="Actions">{renderActions()}</div>
        <Modal isOpen={uploading} style={customStyles} contentLabel="WaitModal" ariaHideApp={false}>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Uploading submission. Please Wait ...</Card.Title>
            </Card.Body>
          </Card>
        </Modal>
      </div>
    </div>
  );
}

export default Submit;
