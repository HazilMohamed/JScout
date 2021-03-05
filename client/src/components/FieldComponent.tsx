/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { DoubleSide } from "three";

import config from "../config";
import { PassDetailsTypes } from "../types/types";

const FieldComponent: React.FC = () => {
  const api = config.api;
  const [matchDetails, setMatchDetails] = React.useState<
    Array<PassDetailsTypes>
  >();

  const fetchMatch = () => {
    axios.post(api + "/match", { player: "Kevin De Bruyne" }).then((res) => {
      const data = JSON.parse(res.data[0]);
      setMatchDetails(Object.values(data));
    });
  };
  useEffect(() => {
    fetchMatch();
  }, []);
  return (
    <mesh>
      <mesh
        position={[0, 0, 0]}
        scale={[12, 8, 1]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry />
        <meshBasicMaterial color={"green"} side={DoubleSide} />
      </mesh>
      {matchDetails &&
        matchDetails.map((ev: PassDetailsTypes) => (
          <mesh
            key={ev.id}
            position={[ev.location[0] / 10 - 6, 0.1, ev.location[1] / 10 - 4]}
          >
            <sphereGeometry args={[0.1]} />
            <meshBasicMaterial color={"red"} />
          </mesh>
        ))}
    </mesh>
  );
};

export default FieldComponent;
