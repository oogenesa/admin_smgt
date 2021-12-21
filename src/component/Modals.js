import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-rainbow-components";
const Modals = (props) => {
  const [isOpenModal1, setIsOpenModal1] = useState({ ...props.modal1 });
  const handleOnClose = () => {
    setIsOpenModal1(false);
    props.handleCloseModal();
  };
  useEffect(() => {
    setIsOpenModal1(props.modal1);
  }, [props.modal1]);
  return (
    <div>
      <Modal id="modal-1" isOpen={isOpenModal1} onRequestClose={handleOnClose}>
        <h3>{props.message}</h3>
      </Modal>
    </div>
  );
};

export default Modals;
