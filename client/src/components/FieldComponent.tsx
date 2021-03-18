/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { DoubleSide, Vector3, CatmullRomCurve3 } from "three";
import { Line } from "@react-three/drei";

import config from "../config";
import { PassDetailsTypes } from "../types/types";
import { HeightInfo, BodyInfo, PlayPatternInfo } from "../helpers/passHelpers";

const FieldComponent: React.FC = () => {
  const api = config.api;
  const [matchDetails, setMatchDetails] = React.useState<
    Array<PassDetailsTypes>
  >();

  const fetchMatch = () => {
    axios
      .post(api + "/match/player", { player: "Kevin De Bruyne" })
      .then((res) => {
        const data = JSON.parse(res.data[0]);
        setMatchDetails(Object.values(data));
      });
  };

  const generateCurve = (
    start: Array<number>,
    end: Array<number>,
    height: number,
    body?: number,
    playType?: number
  ) => {
    let mid = findLocation(
      [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2],
      height
    );
    height = HeightInfo.find((x) => x.id === height)?.height || 0.1;
    const curve = new CatmullRomCurve3([
      new Vector3(...findLocation(start, body, playType)),
      new Vector3(mid[0], height, mid[2]),
      new Vector3(...findLocation(end, body)),
    ]);

    return curve.getPoints(25);
  };

  const findLocation = (
    coordinates: Array<number>,
    loc?: number,
    playType?: number
  ) => {
    let isRegularPlay = playType && loc;
    loc = BodyInfo.find((x) => x.id === loc)?.height || 0.1;
    playType = PlayPatternInfo.find((x) => x.id === playType)?.height || 0.1;
    return [
      coordinates[0] / 10 - 6,
      isRegularPlay ? loc : playType,
      coordinates[1] / 10 - 4,
    ];
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
                  ...findLocation(
                    ev.location,
                    ev.pass_body_part_id,
                    ev.play_pattern_id
                  )
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
                ev.pass_body_part_id,
                ev.play_pattern_id
              )}
              flatShading={true}
              color={"#da5072"}
            />
          </mesh>
        ))}
    </mesh>
  );
};

export default FieldComponent;
