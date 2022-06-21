import { Toast } from "react-bootstrap";
import { ToastContainerMain } from "./toash.styled";

export const ToastNotification = ({ show = true, close,children, type }) => {
  return (
    <ToastContainerMain >
      <Toast
        onClose={close}
        show={show}
        delay={3000}
        autohide
        type={type}
      >
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainerMain>
  );
};
