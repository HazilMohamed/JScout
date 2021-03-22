import { useState } from "react";
import axios from "axios";

import ControllerComponent from "../components/ControllerComponent";
import ViewComponent from "../components/ViewComponent";
import useWindowSize from "../helpers/useWindowSize";
import config from "../config";
import { PassDetailsTypes } from "../types/types";

const MatchAnalysis = () => {
  const api = config.api;
  const innerWidth = useWindowSize()[0];
  const [passDetails, setPassDetails] = useState<Array<PassDetailsTypes>>();
  
  const handleSubmit = (id: number) => {
    axios.post(api + "/match/player", { id: id }).then((res) => {
      const data = JSON.parse(res.data[0]);
      setPassDetails(Object.values(data));
    });
  };

  return (
    <div style={{ width: innerWidth, display: "flex" }}>
      <ViewComponent passDetails={passDetails} />
      <ControllerComponent handleSubmit={handleSubmit} />
    </div>
  );
};

export default MatchAnalysis;
