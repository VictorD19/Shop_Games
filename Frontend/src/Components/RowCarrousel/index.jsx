import { useEffect, useState } from "react";
import Slider from "react-slick";
import { RowList } from "./row.styled";

export const RowCarrousel = ({ children, title }) => {
  const getWidth = () => window.innerWidth;
  const [widthSize, setWidth] = useState(getWidth());
  const [items, setItems] = useState(5);
  
  useEffect(() => {
    if (widthSize <= 375) {
      setItems(2);
    }
    if (widthSize > 1024 <= 1366) {
      setItems(5);
    }
    if (widthSize > 1366) {
      setItems(7);
    }
  }, [widthSize]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: items,
    slidesToScroll: 2,
  };
  return (
    <RowList>
      <h1> {title}</h1>
      <Slider {...settings}>{children}</Slider>
    </RowList>
  );
};
