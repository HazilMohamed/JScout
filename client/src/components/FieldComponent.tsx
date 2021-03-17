/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { DoubleSide, Vector3, CatmullRomCurve3 } from "three";
import { Line } from "@react-three/drei";

import config from "../config";
import { PassDetailsTypes } from "../types/types";
import { HeightInfo, BodyInfo } from "../helpers/passHelpers";

const FieldComponent: React.FC = () => {
  const api = config.api;
  const [matchDetails, setMatchDetails] = React.useState<
    Array<PassDetailsTypes>
  >();

  const fetchMatch = () => {
    axios.post(api + "/match", { player: "Thomas Meunier" }).then((res) => {
      const data = JSON.parse(res.data[0]);
      setMatchDetails(Object.values(data));
    });
  };

  const generateCurve = (
    start: Array<number>,
    end: Array<number>,
    height: number,
    body: number,
    length: number
  ) => {
    let mid = fixCoordinates(
      [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2],
      height
    );
    height = HeightInfo.find((x) => x.id === height)?.height || 0.1;
    let isLongPass = length > 40 ? true : false;
    const spline = new CatmullRomCurve3([
      new Vector3(...fixCoordinates(start, body)),
      new Vector3(mid[0], height, mid[2]),
      new Vector3(...fixCoordinates(end, isLongPass ? 0.1 : body)),
    ]);

    return spline.getPoints(25);
  };

  const fixCoordinates = (coordinates: Array<number>, body?: number) => {
    body = BodyInfo.find((x) => x.id === body)?.height || 0.1;
    return [coordinates[0] / 10 - 6, body, coordinates[1] / 10 - 4];
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
          <mesh key={ev.id} onClick={() => console.log(ev)}>
            <mesh
              position={
                new Vector3(
                  ...fixCoordinates(ev.location, ev.pass_body_part_id)
                )
              }
            >
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color={"red"} />
            </mesh>
            <Line
              points={generateCurve(
                ev.location,
                ev.pass_end_location,
                ev.pass_height_id,
                ev.pass_body_part_id || 40,
                ev.pass_length
              )}
              flatShading={true}
            />
          </mesh>
        ))}
    </mesh>
  );
};

export default FieldComponent;
