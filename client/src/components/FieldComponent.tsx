/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { DoubleSide, Vector3, CatmullRomCurve3 } from "three";

import config from "../config";
import { PassDetailsTypes } from "../types/types";
import { Line } from "@react-three/drei";

const FieldComponent: React.FC = () => {
  const api = config.api;
  const [matchDetails, setMatchDetails] = React.useState<
    Array<PassDetailsTypes>
  >();

  const fetchMatch = () => {
    axios.post(api + "/match", { player: "Thibaut Courtois" }).then((res) => {
      const data = JSON.parse(res.data[0]);
      setMatchDetails(Object.values(data));
    });
  };

  const generateCurve = (
    start: Array<number>,
    end: Array<number>,
    angle: number,
    height: number
  ) => {
    let x1 = start[0] / 10 - 6,
      y1 = start[1] / 10 - 4,
      x2 = end[0] / 10 - 6,
      y2 = end[1] / 10 - 4;
    height = height === 1 ? 0.1 : height === 2 ? 0.35 : 0.7;
    const spline = new CatmullRomCurve3([
      new Vector3(x1, 0.1, y1),
      height > 0
        ? new Vector3(
            x1 + 0.2 * (x2 - x1),
            height,
            y1 + 0.2 * (x2 - x1) * Math.tan(angle)
          )
        : new Vector3((x2 - x1) / 2, 0.1, y2 - y1 / 2),
      new Vector3(x2, 0.1, y2),
    ]);

    return spline.getPoints(50);
  };

  const fixCoordinates = (coordinates: Array<number>) => {
    return new Vector3(coordinates[0] / 10 - 6, 0.1, coordinates[1] / 10 - 4);
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
          <mesh key={ev.id}>
            <mesh position={fixCoordinates(ev.location)}>
              <sphereGeometry args={[0.1]} />
              <meshBasicMaterial color={"red"} />
            </mesh>
            <Line
              points={generateCurve(
                ev.location,
                ev.pass_end_location,
                ev.pass_angle,
                ev.pass_height_id
              )}
              flatShading={true}
            />
          </mesh>
        ))}
    </mesh>
  );
};

export default FieldComponent;
