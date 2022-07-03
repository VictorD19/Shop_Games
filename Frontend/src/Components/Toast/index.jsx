import { Toast } from "react-bootstrap";
import { ToastContainerMain } from "./toash.styled";

export const ToastNotification = ({ show, close, message, type }) => {
  return (
    <ToastContainerMain position='top-end'>
      <Toast onClose={close} show={show} delay={3000} autohide type={type} >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainerMain>
  );
};
