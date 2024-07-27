import { Modal } from "flowbite-react";
import { useState } from "react";
import Button1 from "./Button1";

const CustomModal = ({ buttonStyle, content}) => {
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
  }

  const handleSubmit = () => {
    onsubmit;
    setOpenModal(false)
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className={`bg-home-button-background-light text-home-button-text-light hover:bg-home-button-hover-light dark:bg-home-button-background-dark dark:text-home-button-text-dark hover:dark:bg-home-button-hover-dark ${buttonStyle}`}
      >
        Create new board
      </button>

      <Modal
        show={openModal}
        size="sm"
        onClose={onCloseModal}
        popup
        className="bg-black"
      >
        <Modal.Header className="bg-navbar-background-light dark:bg-navbar-background-dark rounded-t-lg text-home-text-light dark:text-home-text-dark" />
        <Modal.Body className="bg-navbar-background-light dark:bg-navbar-background-dark rounded-b-lg text-home-text-light dark:text-home-text-dark">
            {content}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
