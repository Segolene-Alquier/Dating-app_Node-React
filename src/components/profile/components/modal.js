import React, { useState, useStyles } from 'react';
import Modal from 'react-bootstrap/Modal';
import CropperImg from './cropper/cropper';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalCrop = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* <button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </button> */}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Crop your image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CropperImg />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCrop;
