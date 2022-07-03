import styled from "styled-components";

export const CartContainer = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  gap: 15px;
  padding: 3rem;
  > div {
    flex: 3;
  }
  aside {
    flex: 1;
  }
  span {
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
  padding: 0.3rem 0;
`;
