/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import config from "./config";

function App() {
  const api = config.api;
  const [matchDetails, setMatchDetails] = useState<any>();
  const fetchMatch = () => {
    axios.post(api + "/match", { minute: "3" }).then((res) => {
      const data = JSON.parse(res.data);
      setMatchDetails(Object.values(data));
    });
  };
  useEffect(() => {
    fetchMatch();
  }, []);
  return (
    <div>
      {matchDetails && matchDetails.map((ev: any) => <p>{ev.timestamp}</p>)}
    </div>
  );
}

export default App;
