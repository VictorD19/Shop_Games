import { Pagination } from "react-bootstrap";
import styled from "styled-components";
export const PaginationContainer = styled(Pagination)`
  a {
    background: var(--secondary);
    color: var(--white);
    border: none;
  }
  .page-item.active .page-link {
    color: var(--primary);
    background: var(--white);
    border-color: #0d6efd;
  }
  .page-link:hover {
    color: var(--primary);
  }
  @media only screen and (max-width: 600px) {
  flex-wrap: wrap ;

  }
`;
