/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";

import config from "../config";
import { PassDetails } from "../types/types";

const MatchAnalysis = () => {
  const api = config.api;
  const [matchDetails, setMatchDetails] = React.useState<Array<PassDetails>>();

  const fetchMatch = () => {
    axios.post(api + "/match", { player: "Axel Witsel" }).then((res) => {
      const data = JSON.parse(res.data[0]);
      setMatchDetails(Object.values(data));
    });
  };
  useEffect(() => {
    fetchMatch();
  }, []);

  return (
    <div>
      {matchDetails &&
        matchDetails.map((ev: PassDetails) => <p key={ev.id}>{ev.id}</p>)}
    </div>
  );
};

export default MatchAnalysis;
