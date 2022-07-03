import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { getNumberRandom } from "../../Utils";
export const GetScoreGame = () => {
  const color = "#f8cb62";
  const numberStarRandom = getNumberRandom(5);
  return (
    <div>
      {[...Array(5)].map((_, index) =>
        index <= numberStarRandom ? (
          <AiFillStar color={color} key={index} />
        ) : (
          <AiOutlineStar key={index} />
        )
      )}
    </div>
  );
};
