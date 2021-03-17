import ControllerComponent from "../components/ControllerComponent";
import ViewComponent from "../components/ViewComponent";
import useWindowSize from "../helpers/useWindowSize";

const MatchAnalysis = () => {
  const innerWidth = useWindowSize()[0];
  
  return (
    <div style={{ width: innerWidth, display: "flex" }}>
      <ViewComponent />
      <ControllerComponent />
    </div>
  );
};

export default MatchAnalysis;
