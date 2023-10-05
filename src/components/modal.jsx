import React from 'react';
import ReactDom from 'react-dom'
import { PropTypes } from 'prop-types';

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <React.Fragment>
      <div className="modal_wrapper">
        <h1>Modal</h1>
        <button className="modal_close_button" onClick={onClose}>close modal</button>
        {children}
      </div>
    </React.Fragment>,
    document.getElementById('root')
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
