import styled from "styled-components";

export const CartContainer = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  gap: 1.2rem;
  padding: 3rem;
  > div {
    flex: 3;
  }
  aside {
    flex: 1;
  }
  > div > span {
    background: var(--primary);
    padding: 8px 10px;
  }
  .cart_items {
    display: grid;
    grid-template-columns: 1.5fr 0.3fr 0.3fr;
    grid-auto-rows: 0.2fr 1.2fr;
    align-items: center;
  }
`;

export const CartItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 12rem;
  }
  h2 {
    font-size: 1.25em;
    font-weight: 600;
    text-shadow: 1px 1px 0.5px var(--primary);
  }
  ul {
    padding: 3px 0;
  }
  li {
    padding: 5px 0;
    font-size: 0.9em;
  }
`;

export const CartItemPrice = styled.div`
  font-size: 1.3em;
  font-weight: 500;
`;
export const CartItemActions = styled.div``;

export const CartDetails = styled.aside`
  padding: 0.3rem 0 0.3rem 0.5rem;
  text-align: center;
  li {
    margin-bottom: 1rem;
    font-weight: 600;
    span {
      font-weight: 500;
    }
  }
  form {
    margin-bottom: 1rem;
  }
  > button {
    width: 100%;
    margin-bottom: 1rem ;
  }
`;

export const ProgressContainer = styled.div`
  width: 40%;
  margin: 2rem auto 0.8rem;
  position: relative;
  .progress {
    width: 99%;
    background: #19171fee;
  }
  .progress-bar {
    background: var(--primary);
  }

  .stepContainer {
    position: absolute;
    top: -1rem;
    left: -4px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    span:nth-child(1) {
      position: relative;
      :before {
        position: absolute;
        bottom: -1.3rem;
        left: -1rem;
        font-weight: 600;
        width: 6rem;
        text-align: start;
        content: "Cart items";
      }
    }
    span:nth-child(2) {
      position: relative;
      :before {
        position: absolute;
        bottom: -1.3rem;
        left: -1rem;
        font-weight: 600;
        width: 6rem;
        text-align: start;
        content: "Payment";
      }
    }
    span:nth-child(3) {
      position: relative;
      :before {
        position: absolute;
        bottom: -1.3rem;
        left: -0.5rem;
        font-weight: 600;
        width: 6rem;
        text-align: start;
        content: "Confirm";
      }
    }
  }
  .step {
    padding: 1rem 1.3rem;
    border-radius: 50%;
    background: var(--gray);
    text-align: center;
  }
  .active {
    transition: 0.4s all ease;
    background: var(--primary);
  }
`;

export const RemoveCupom = styled.div`
  margin-top: 1rem;
  color: #c44853;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.8;
  :hover {
    transition: 0.3s all ease;
    opacity: 1;
  }
`;
