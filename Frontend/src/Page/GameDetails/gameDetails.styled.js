import styled from "styled-components";
import { ContentHome } from "../Home/home.styled";

export const Content = styled(ContentHome)`
  .mainPhotos {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 0.5rem;
    margin-bottom: 1rem;
    img {
      width: 100%;
    }
  }
  .carousel {
    width: clamp(40rem, 46rem, 50rem);
  }
  .descriptionGame {
    text-align: center ;
    border: 2px solid var(--primary);
    border-radius: 5px;
    width: clamp(15em, 18rem, 25rem);
    padding: 3rem 1rem 2rem;
    li {
      margin: 1rem 0;
    }
    span {
      font-weight: 500;
      color: var(--primary);
      text-shadow: 1px 1px 0.5px #000;
    }
  }
  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
    .descriptionGame {
      width: 100%;
      padding: 0.5rem;
      h2 {
        margin-bottom: 0.5rem;
      }
      li {
        margin: 0.4rem 0;
        font-size: 0.99em;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content:center;
        gap: 5px;
        margin-bottom: 0.5rem;
      }
    }
  }
`;

export const ContentDescription = styled.div`
  p {
    margin-bottom: 1rem;
  }
`;
export const ContentRequirements = styled.div`
  li {
    margin: 1rem 0;
  }
  span {
    font-weight: 500;
    text-shadow: 1px 1px 0.5px #000;
    color: var(--primary);
  }
`;
export const ContentPrice = styled.div`
  border: 2px solid var(--success);
  border-radius: 5px;
  padding: 10px;
  h3 {
    font-size: 2.25em;
    margin-bottom: 0.5rem;
  }
  button {
    width: 100%;
    background: var(--success);
    border: 1px solid var(--success);
    :hover {
      background: var(--success);
      border: 1px solid var(--success);
    }
  }
`;
