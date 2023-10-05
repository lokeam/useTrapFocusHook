import { useState } from "react";
import Modal from "./components/modal";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  console.log('isOpen: ', isOpen);
  return (
    <>
      <h1 className="read-the-docs">
        Modal Example
      </h1>
      <button onClick={()=> setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>Modal content:</p>
        <p>Donec nec quam ut justo dictum varius. Aliquam mollis laoreet ullamcorper. Duis non neque a augue tempus consequat sit amet a neque. Ut et fringilla dolor, in malesuada velit. Pellentesque dapibus id justo eget condimentum. Sed finibus sem et euismod sagittis. Pellentesque efficitur elit posuere nisl eleifend aliquam. Duis tincidunt luctus varius. Donec neque enim, malesuada sed eros quis, consectetur vehicula augue. Cras at dolor hendrerit, imperdiet lorem et, ullamcorper elit. Suspendisse at mauris a lorem viverra euismod. Suspendisse mattis lobortis efficitur. </p>
      </Modal>
    </>
  );
}

export default App;
