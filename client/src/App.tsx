/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import config from "./config";

function App() {
  const api = config.api;
  const [matchDetails, setMatchDetails] = useState<any>();
  const fetchMatch = () => {
    axios.post(api + "/match", { player: "Axel Witsel" }).then((res) => {
      const data = JSON.parse(res.data);
      setMatchDetails(Object.values(data));
    });
  };
  useEffect(() => {
    fetchMatch();
  }, []);
  return (
    <div>
      {matchDetails &&
        matchDetails.map((ev: any) => (
          <p key={ev.id}>{ev.pass_end_location}</p>
        ))}
    </div>
  );
}

export default App;
