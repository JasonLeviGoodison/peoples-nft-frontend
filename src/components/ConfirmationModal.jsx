import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

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

Modal.setAppElement('#root');

const ConfirmationModal = ({entry, isOpen, setIsOpen}) => {


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div style={{height: "100%", padding: 20}}>
          <h2>
          Are you sure you want to vote for entry #{entry}?
          </h2>
          <h6>Remember, you can only vote for one entry.</h6>

          <div>
            <Button variant="secondary" onClick={closeModal}> No, let me think about it </Button>
            <Button style={{marginLeft: 10}}> Yes, I'm sure </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmationModal;