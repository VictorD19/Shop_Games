import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Slider from "react-slick";
import { getTrendingGames } from "../../Api/gamesEndpoints";
import { NewButton } from "../Button";
import { CarrouselItem, CarrouselMainContainer } from "./carrousel.styled";

export const CarrouselMain = () => {
  const [listTrending, setList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const trendingGames = await getTrendingGames();
        if (trendingGames.error) throw new Error(trendingGames.error);
        setList(trendingGames);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 2,
    lazyLoad: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <CarrouselMainContainer>
      <Slider {...settings}>
        {listTrending.length > 0 &&
          listTrending.map(
            ({
              id,
              short_description,
              genre,
              release_date,
              developer,
              thumbnail,
              title,
              price,
            }) => (
              <CarrouselItem key={id} bg={thumbnail}>
                <div></div>
                <div>
                  <h1>{title}</h1>
                  <p>{short_description.substring(0, 193) + ' ...'}</p>
                  <div className='details'>
                    <div> <b>Genrer:</b>  <br /> {genre} </div>
                    <div>  <b>Release data: </b> <br /> {release_date}</div>
                    <div><b>Developer:</b> <br /> {developer}</div>
                  </div>
                  <div className='box-buttons'>
                    <NewButton >Try for free</NewButton>
                    <Button size='sm' variant="outline-light"> Buy {price} $</Button>
                  </div>
                </div>
              </CarrouselItem>
            )
          )}
      </Slider>
    </CarrouselMainContainer>
  );
};
