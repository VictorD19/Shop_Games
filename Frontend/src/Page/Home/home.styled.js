import styled from "styled-components";
export const ContentHome = styled.div`
  width: 100%;
`;
export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
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
