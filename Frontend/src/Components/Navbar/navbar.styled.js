import styled from "styled-components";
import { Form, Offcanvas } from "react-bootstrap";

export const NavbarContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 2px 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;

  form {
    input {
      width: 25rem;
      height: 2.2rem;
      border: none;
      background: #19171fee;
      border-radius: 8px;
      outline: none;
      padding-left: 10px;
      padding-right: 1.8rem;
      color: var(--white);
    }
    position: relative;
    svg {
      position: absolute;
      right: 5px;
      top: 8px;
    }
  }
  a {
    text-decoration: none;
    color: var(--gray);
  }
  @media only screen and (max-width: 600px) {
    form:nth-child(2) {
      input {
        width: 12rem;
      }
      position: relative;
      svg {
        position: absolute;
        right: 5px;
        top: 8px;
      }
    }

  }
`;

export const PartUser = styled.div`
  position: relative;
  width: 15rem;
  display: flex;
  justify-content: flex-end;
  padding-right: 3.7rem;
  span {
    display: none;
  }
  img {
    position: absolute;
    border-radius: 50%;
    right: 1.8rem;
    top: -0.5rem;
    width: 3rem;
    height: 3rem;
    z-index: 2;
  }
  > div {
    button {
      background: var(--gray) !important ;
      border: none;
      border-radius: 14px;
      :focus {
        outline: none;
        box-shadow: none !important ;
      }
    }

    .dropdown-item.active,
    .dropdown-item:active {
      background-color: var(--primary);
    }
  }
  .login {
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    img,
    > div {
      display: none;
    }
    width: 1.5rem;
    padding: 0;
    margin-left: 3px;
    span {
      display: block;
      padding: 0 5px;
    }
    .login {
      display: none;
    }
  }
`;

export const PartOptions = styled.div`
 
  a {
    margin: 0 5px;
  }
  a:nth-child(3) {
    position: relative;
    span {
      width: 1rem;
      height: 1rem;
      padding: 2px;
      position: absolute;
      right: -0.7rem;
      top: -0.3rem;
      background: var(--success) !important;
    }
  }
  @media only screen and (max-width: 600px) {
    width: 2.5rem;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 5px;
    a:nth-child(1),
    a:nth-child(2) {
      display: none;
    }
   
  }
`;

export const RightMenu = styled(Offcanvas)`
  .offcanvas-title,
  .offcanvas-body {
    color: var(--gray);
  }
`;

export const FormLogin = styled(Form)`
  > div {
    margin: 10px 0;
  }
  > div:nth-child(3) {
    display: flex;
    justify-content: center;
  }

  .form-control:focus {
    box-shadow: none;
    border: 1px solid var(--primary);
  }
  p {
    text-align: center;
    span {
      color: var(--primary);
      font-weight: 600;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;

export const ErrorAlert = styled.div`
  color: var(--danger);
`;
