import styled from "styled-components";
export const RowList = styled.div`
  margin: 1.5rem 0;
  > h1 {
    font-size: 1.25em;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  .slick-prev,
  .slick-next {
    top: -1.5rem;
  }
  .slick-prev {
    left: 94.5%;
  }
  .slick-next {
    right: 0.8rem;
  }
  @media only screen and (max-width: 600px) {
    .slick-prev,
    .slick-next {
      top: -1.5rem;
    }
    .slick-prev {
      left: 85%;
    }
    .slick-next {
      right: 0.8rem;
    }
  }
`;
