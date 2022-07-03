import styled from "styled-components";
import { ToastContainer } from "react-bootstrap";

export const ToastContainerMain = styled(ToastContainer)`
  width: 15rem;
  z-index:55;
  .toast {
    top:4rem;
    position: fixed;
    background: ${({ children }) => {
      const { props } = children;
      const { type } = props;
      if (type === "error") return "var(--danger)";
      if (type === "success") return "var(--success)";
      return "var(--gray)";
    }};
  }
`;
