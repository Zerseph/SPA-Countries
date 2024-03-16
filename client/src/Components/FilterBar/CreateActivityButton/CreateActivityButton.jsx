import { useState } from 'react';
import Modal from 'react-modal';
import ActivityForm from '../../ActivityForm/ActivityForm.jsx';
import style from './CreateActivityButton.module.css'; // Ajusta la ruta según tu estructura de carpetas

export default function CreateActivityButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button onClick={toggleModal} className={style.createActivityButton}>
        Create Activity
      </button>

      {/* Definición del modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Activity Modal"
        className={style.activityModal}
        overlayClassName={style.overlay}
        shouldCloseOnOverlayClick={true}
      >
        {/* Renderiza el formulario dentro del modal */}
        <ActivityForm closeModal={closeModal} />
        {/* Botón de cierre en el modal */}
        <button onClick={closeModal} className={style.closeButton}>
          x
        </button>
      </Modal>
    </>
  );
}
