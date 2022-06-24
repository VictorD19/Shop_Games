import { useEffect, useState } from "react";
import Slider from "react-slick";
import { RowList } from "./row.styled";

export const RowCarrousel = ({ children, title }) => {
  const items = 5;
  useEffect(() => {}, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: items,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <RowList>
      <h1> {title}</h1>
      <Slider {...settings}>{children}</Slider>
    </RowList>
  );
};
