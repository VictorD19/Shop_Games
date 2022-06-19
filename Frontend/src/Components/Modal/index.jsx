import { ModalStyledContainer } from "./modal.styled";

export const ModalContainer = ({ title, children, show, close }) => {
  return (
    <ModalStyledContainer show={show} onHide={close}>
      <ModalStyledContainer.Header closeButton>
        <ModalStyledContainer.Title>{title}</ModalStyledContainer.Title>
      </ModalStyledContainer.Header>
      <ModalStyledContainer.Body>{children}</ModalStyledContainer.Body>
    </ModalStyledContainer>
  );
};
