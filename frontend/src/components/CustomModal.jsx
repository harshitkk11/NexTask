import { Modal } from "flowbite-react";
import { useState } from "react";

const CustomModal = ({ buttonStyle, content }) => {
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
  };

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
        <Modal.Header className="rounded-t-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark" />
        <Modal.Body className="rounded-b-lg bg-navbar-background-light text-home-text-light dark:bg-navbar-background-dark dark:text-home-text-dark">
          {content}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
