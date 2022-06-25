import { Pagination } from "react-bootstrap";
import { PaginationContainer } from "./pagination.styled";

export const PaginationMain = ({ pages, currentPage, toPage, next, prev }) => {
  return (
    <PaginationContainer>
      <Pagination.First onClick={() => prev ? toPage(1): null} />
      <Pagination.Prev onClick={() => toPage(prev)} />
      {[...Array(pages)].map((_, index) => (
        <Pagination.Item
          onClick={() => toPage(index + 1)}
          active={index + 1 === currentPage}
          key={index}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => toPage(next)} />
      <Pagination.Last onClick={() => next ? toPage(pages): null} />
    </PaginationContainer>
  );
};
