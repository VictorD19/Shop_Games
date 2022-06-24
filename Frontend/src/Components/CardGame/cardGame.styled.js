import styled from "styled-components";

export const DescriptionCard = styled.div`
  margin-top: 1.2rem;
  padding: 10px 0;
  transform: scale(0.95);
  transition: 0.5s all ease;
  position: relative;

  h1 {
    font-size: 1.2em;
    font-weight: 500;
  }
  small {
    color: var(--gray);
    font-size: 0.75em;
  }
  .descriptionDetails {
    margin: 0.5rem 0;
  }
`;

export const CardContainer = styled.div`
  width: 13rem;
  img {
    width: 100%;
    border-radius: 10px;
  }
  figure {
    transition: 0.5s all ease;

    position: relative;
    transform: scale(0.95);
  }
  figcaption {
    position: absolute;
    bottom: -1.25rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    button {
      background: var(--secondary);
      border-radius: 10px;
      border: 1px solid var(--secondary);
      padding: 0 10px;
      height: 1.5rem;
      :hover {
        background: var(--secondary);
        opacity: 0.8;
        color: #fff;
        border: 1px solid var(--secondary);
      }
      :active,
      :focus {
        background: var(--secondary);
        border: 1px solid var(--secondary);
        box-shadow: none;
      }
    }
    background: rgba(74, 59, 146, 0.53);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 0 0 10px 10px;
  }
  :hover {
    border: 1px solid var(--primary);
  }
  transition: 0.3s all ease;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  .active {
    position: absolute;
    z-index: 3;
    background: var(--success);
    padding: 0.3rem;
    right: 4px;
    top: 2px;
    font-size: 0.9em;
    transform: scale(0.95);
    border-radius: 0 10px 0 10px;
    
  }
  @media only screen and (max-width: 600px) {
    width: 11.5rem;
    :hover {
      border: none;
    }
  }
`;
