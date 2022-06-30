import Loading from "../../Assets/loading.svg";
import { LoadingMain } from "./loading.styled";
export const LoadingAnimated = () => {
  return (
    <LoadingMain>
      <img src={Loading} alt="loading" />
      Loading...
    </LoadingMain>
  );
};
