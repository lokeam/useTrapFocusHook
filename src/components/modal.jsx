import React from 'react';
import ReactDom from 'react-dom'
import useFocusTrap from '../hooks/use-focus-trap';
import { PropTypes } from 'prop-types';
import './modal.css';

const Modal = ( { isOpen, children, onClose } ) => {
  
  const { trapFocusWithinElement } = useFocusTrap();

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <React.Fragment>
      <div className="modal__overlay" >
        <div className="modal__wrapper" ref={trapFocusWithinElement}>
            {children}
            <button className="modal_close_button" onClick={onClose}>Close Modal</button>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('root')
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  focusRef: PropTypes.func
};

export default Modal;
