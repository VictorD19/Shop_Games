import Slider from "react-slick";
import { RowList } from "./row.styled";

export const RowCarrousel = ({ children, title }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
  };
  return (
    <RowList>
      <h1> {title}</h1>
      <Slider {...settings}>{children}</Slider>
    </RowList>
  );
};
