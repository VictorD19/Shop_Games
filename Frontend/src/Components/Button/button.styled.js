import { Button } from "react-bootstrap";
import styled from "styled-components";

export const ButtonPrimary = styled(Button)`
  background: var(--primary);
  border: 1px solid var(--primary);
  :hover {
    background: var(--primary);
    opacity: 0.8;
    border: 1px solid var(--primary);
  }
  :active,
  :focus {
    background: var(--primary);
    border: 1px solid var(--primary);
    box-shadow:none;
  }
`;
