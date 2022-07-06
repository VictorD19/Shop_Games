import { Form } from "react-bootstrap";
import styled from "styled-components";

export const FormPayment = styled(Form)`
  width: 60%;
  margin: auto;
  .form-check-label {
    margin-top: 4px;
  }
  .form-check {
    margin-right: 0.5rem;
  }
  .col {
    padding: 0;
  }
  .col:nth-child(1) {
    margin-right: 15px;
  }
  > div {
    margin: 1rem 0;
  }
`;

export const SelectCard = styled.div`
  width: 60%;
  margin: 1rem auto;
`;
