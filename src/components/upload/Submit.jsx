import { create } from 'ipfs-http-client';
import React, { Component } from 'react';
import { v4 as guid } from 'uuid';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Dropzone from '../dropzone/Dropzone';
import * as submissionApi from '../../api/submissionApi';
import * as routes from '../../routes/routes';
import './Submit.css';

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

class Submit extends Component {
  // const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
  // /* upload the file */
  // const added = await client.add(file)

  constructor(props) {
    super(props);

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.uploadFileToIPFS = this.uploadFileToIPFS.bind(this);
    this.uploadEntry = this.uploadEntry.bind(this);
    this.uploadForm = this.uploadForm.bind(this);
    this.renderActions = this.renderActions.bind(this);

    this.state = {
      file: null,
      title: props.title
    };
  }

  onFilesAdded(files) {
    console.log(files[0])
    this.setState(() => ({
      file: files[0]
    }));
  }

  async uploadEntry() {
    await this.uploadFile()
      .then(async (url) => this.uploadForm(url))
      .then(() => {
        this.setState({ uploading: false });
        const { history } = this.props;
        history.push(routes.HOME);
      })
      .catch((() => {
        this.setState({ uploading: false });
        // TODO: Have a better error handling method
        // eslint-disable-next-line no-alert
        alert('Error uploading documents');
      }));
  }

  validForm() {
    const { newReviewFields } = this.props;
    const { file } = this.state;
    const form = newReviewFields;

    return (form.title != null
      && file !== null);
  }

  async uploadForm(id, url) {
    if (!this.validForm()) {
      // TODO: Have a better error handler
      // eslint-disable-next-line no-alert
      alert('One or more fields not filled out');
      throw Error('Not filled out');
    }

    const form = {
      title: this.state.title,
      ipfs_url: url,
    };

    return submissionApi.UploadForm(form, id);
  }

  async uploadFile(id) {
    const { file } = this.state;
    this.setState({ uploading: true });

    try {
      var url = await this.uploadFileToIPFS(file, id);
      this.setState({ uploading: false });
      return url;
    } catch (e) {
      // TODO: Have a better error handler
      // eslint-disable-next-line no-alert
      alert('Could not upload files.');
      this.setState({ uploading: false });
      throw e;
    }
  }

  // eslint-disable-next-line
  uploadFileToIPFS(file, id) {
    // TODO: RequestApi will need to return the ipfs url
    return new Promise((resolve, reject) => submissionApi.UploadFile(file, id)
      .then(() => resolve())
      .catch((err) => {
        reject(err);
        throw err;
      }));
  }

  renderActions() {
    return (
      <div>
        <Button
          variant="secondary"
          style={{ marginRight: 10 }}
          onClick={() => this.setState({ file: null, successfullUploaded: false })}
        >
          Reset
        </Button>
        <Button variant="primary" onClick={this.uploadEntry}>
          Upload
        </Button>
      </div>
    );
  }

  render() {
    const { uploading, file, successfullUploaded } = this.state;
    return (
      <div className="Upload">
        <div className="Content">
          <div style={{ paddingLeft: '5px' }}>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={uploading || successfullUploaded}
            />
          </div>
          {
            file !== null && 
            <div className="Files">
              <div className="Row">
                <span className="Filename">{file.name}</span>
              </div>
            </div>
          }
        </div>
        <div className="Actions">{this.renderActions()}</div>
        <Modal isOpen={uploading} style={customStyles} contentLabel="WaitModal" ariaHideApp={false}>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Uploading Documents. Please Wait ...</Card.Title>
            </Card.Body>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default Submit;
