import styled from "styled-components";
import { ToastContainer } from "react-bootstrap";

export const ToastContainerMain = styled(ToastContainer)`
  .toast {
    position: absolute;
    right: 1rem;
    background: ${({ children }) => {
      const { props } = children;
      const { type } = props;
      if (type === "error") return "var(--danger)";
      if (type === "success") return "var(--success)";
      return "var(--gray)";
    }};
  }
`;
