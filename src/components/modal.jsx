import React from "react";
import ReactDom from "react-dom";
import useFocusTrap from "../hooks/use-focus-trap";
import { PropTypes } from "prop-types";
import "./modal.css";

const Modal = ({ isOpen, children, onClose, focusTrapOptions }) => {
  const { trapFocusWithinElement } = useFocusTrap(focusTrapOptions);

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <React.Fragment>
      <div className="modal__overlay">
        <div className="modal__wrapper" ref={trapFocusWithinElement}>
          {children}
          <button id="confirm" className="modal_close_button" onClick={onClose}>
            Close Modal
          </button>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById("root")
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  focusTrapOptions: PropTypes.object,
};

export default Modal;
