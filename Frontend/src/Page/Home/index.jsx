import { LayoutPage } from "../../Layout";
import { CarrouselMain } from "../../Components/CarrouselMain";
import { CardGame } from "../../Components/CardGame";
import { RowCarrousel } from "../../Components/RowCarrousel";
export const HomePage = () => {
  return (
    <LayoutPage>
      <CarrouselMain />
      <RowCarrousel title="Recommended for you">
        {[...Array(15)].map((game, idx) => (
          <CardGame />
        ))}
      </RowCarrousel>
      <RowCarrousel title="Popular games">
        {[...Array(15)].map((game, idx) => (
          <CardGame />
        ))}
      </RowCarrousel>
      <RowCarrousel title="New games">
        {[...Array(15)].map((game, idx) => (
          <CardGame />
        ))}
      </RowCarrousel>
    </LayoutPage>
  );
};
