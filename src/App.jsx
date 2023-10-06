import { useState } from "react";
import Modal from "./components/modal";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const EXAMPLE_URL_1 = 'https://www.google.com';
  
  return (
    <>
      <h4 className="read-the-docs">
        Traping focus within Modal
      </h4>
      <button onClick={()=> setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="modal_heading">Alert Dialog Example</div>
        <div className="text_wrapper">
          <p>Nam eu nulla sit amet quam dapibus rutrum eu in ipsum.</p>
          <p>Donec nec quam ut <a href={EXAMPLE_URL_1} rel="noreferrer" target="_blank">justo dictum varius</a>.</p>
        </div>
      </Modal>
    </>
  );
}

export default App;
