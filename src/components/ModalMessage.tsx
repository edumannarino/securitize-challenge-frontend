import { useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ModalMessageContext from './context/ModalMessageContext';

export const ModalMessage = () => {
  const { message, displayModalMessage } = useContext(ModalMessageContext)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      displayModalMessage('')
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [displayModalMessage]);


  return (
    <>
      <Modal centered show={message.length > 0} onHide={() => displayModalMessage('')}>
        <Modal.Body className='text-center'>
          <h5 className='m-0'>
          { message }
          </h5>
        </Modal.Body>
      </Modal>
    </>
  );
}