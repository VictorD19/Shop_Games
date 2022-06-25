import { Card, Placeholder } from "react-bootstrap";
import ImagePlaceHolder from '../../Assets/placeholder.jpg'
import { PlaceholderCard } from "./placheHolder.styled";

export const PlaceholderCardGame = () => {
  return (
    <PlaceholderCard >
      <Card.Img variant="top" src={ImagePlaceHolder} />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
      </Card.Body>
    </PlaceholderCard>
  );
};
