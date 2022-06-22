import styled from "styled-components";
export const CarrouselItem = styled.div`
  background: ${({ bg }) => (bg ? `no-repeat  url(${bg})` : "var(--white)")};
  background-size: contain;
  height: 21.5rem;
  position: relative;
  > div:nth-child(1) {
    width: inherit;
    height: inherit;
    background: linear-gradient(to top, #111 15%, transparent 85%);
  }

  > div:nth-child(2) {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding-bottom: 1.8rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    h1 {
      font-size: 1.5em;
      cursor: pointer;
      color: var(--primary);
      font-weight: bold;
      text-shadow: 2px 2px 0px #000, 3px 3px 0px rgba(0, 0, 0, 0.15);
    }
    p {
      font-size: 0.85em;
      margin: 5px 0px;
    }
  }
  .details {
    display: flex;
    gap: 0.9rem;
    font-size: 0.8em;
    margin-bottom: 10px;

    b {
      font-weight: 600;
    }
  }
  .box-buttons {
    button {
      margin-right: 10px;
    }
  }
  @media only screen and (max-width: 600px) {
    height: 15rem;
    > div:nth-child(2) {
      h1 {
        font-size: 1.3em;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
`;

export const CarrouselMainContainer = styled.div`
  .slick-dots {
    bottom: 6px;
    button:before {
      color: var(--primary);
    }
  }
  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: var(--primary);
  }
`;
