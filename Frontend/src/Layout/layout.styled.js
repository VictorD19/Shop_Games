import styled from "styled-components";
export const AsideMain = styled.aside`
  width: 15rem;
  padding: 2rem 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  height: ;
  > div h1 {
    font-size: 1.15em;
    font-weight: bold;
  }
  > div li {
    font-size: 0.9em;
    color: var(--gray);
    margin: 0.8rem 0;
    :hover{
      color: var(--primary);
      cursor: pointer;
      transition: 0.3s all ease;
      font-weight: 500;
    }
  }
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const ContainerLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  > div {
    width: 100%;
    overflow: auto;
    padding: 2rem 3rem;
  }
  @media only screen and (max-width: 600px) {
    >div{
      padding: 1rem;
    }

  }
`;
