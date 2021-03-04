/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { DoubleSide } from "three";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import config from "../config";
import useWindowSize from "../helpers/useWindowSize";

import { PassDetailsTypes } from "../types/types";

const MatchAnalysis = () => {
  const api = config.api;
  const [matchDetails, setMatchDetails] = React.useState<
    Array<PassDetailsTypes>
  >();
  const [innerWidth, innerHeight] = useWindowSize();
  const fetchMatch = () => {
    axios.post(api + "/match", { player: "Axel Witsel" }).then((res) => {
      const data = JSON.parse(res.data[0]);
      setMatchDetails(Object.values(data));
    });
  };
  useEffect(() => {
    fetchMatch();
  }, []);

  const Field: React.FC = () => {
    return (
      <mesh
        position={[0, 0, 0]}
        scale={[12, 8, 1]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry />
        <meshBasicMaterial color={"green"} side={DoubleSide} />
      </mesh>
    );
  };

  return (
    <Canvas style={{ height: innerHeight, width: innerWidth }}>
      <Field />
      <PerspectiveCamera
        makeDefault
        position={[7, 7, 7]}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      <OrbitControls enableKeys={true} enableRotate={true} />
    </Canvas>
  );
};

export default MatchAnalysis;
