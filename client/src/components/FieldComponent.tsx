/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { DoubleSide, Vector3, CatmullRomCurve3 } from "three";
import { Line, Plane, useTexture } from "@react-three/drei";

import { PassDetailsTypes } from "../types/types";
import { HeightInfo, BodyInfo, PlayPatternInfo } from "../helpers/passHelpers";

const FieldComponent: React.FC<{
  getPassData: Function;
  passDetails?: Array<PassDetailsTypes>;
}> = ({ passDetails, getPassData }) => {
  const texture = useTexture("./texture_1k.png");
  // const normal = useTexture("./normal_1k.png");
  const [selectedPass, setSelectedPass] = useState<string>();

  const generateCurve = (
    start: Array<number>,
    end: Array<number>,
    height: number,
    body?: number,
    playType?: number
  ) => {
    let mid = findPassPoints([
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
    ]);
    height = HeightInfo.find((x) => x.id === height)?.height || 0.05;
    const curve = new CatmullRomCurve3([
      new Vector3(...findPassPoints(start, body, playType)),
      new Vector3(mid[0], height !== 0.05 ? height + 0.1 : height, mid[2]),
      new Vector3(...findPassPoints(end, body, playType, height)),
    ]);

    return curve.getPoints(25);
  };

  const findLocation = (
    coordinates: Array<number>,
    body?: number,
    playType?: number
  ) => {
    let isThrow = !body && playType === 4;
    body = BodyInfo.find((x) => x.id === body)?.height || 0.05;
    playType = PlayPatternInfo.find((x) => x.id === playType)?.height;
    return [
      coordinates[0] / 10 - 6,
      isThrow ? playType : body,
      coordinates[1] / 10 - 4,
    ];
  };

  const findPassPoints = (
    coordinates: Array<number>,
    body?: number,
    playType?: number,
    height?: number
  ) => {
    let isThrow = !body && playType === 4;
    body = BodyInfo.find((x) => x.id === body)?.height || 0.05;
    playType = PlayPatternInfo.find((x) => x.id === playType)?.height;
    if (height) {
      return [coordinates[0] / 10 - 6, height, coordinates[1] / 10 - 4];
    } else {
      return [
        coordinates[0] / 10 - 6,
        isThrow ? playType : body,
        coordinates[1] / 10 - 4,
      ];
    }
  };

  const handlePassSelection = (ev: PassDetailsTypes) => {
    getPassData(ev);
    setSelectedPass(ev.id);
  };

  return (
    <mesh>
      <Plane args={[8, 12]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <meshStandardMaterial
          transparent={true}
          map={texture}
          side={DoubleSide}
          // normalMap={normal}
          // normalScale={new Vector2(5, 5)}
        />
      </Plane>

      {passDetails &&
        passDetails.map((ev: PassDetailsTypes) => (
          <mesh key={ev.id} onClick={() => handlePassSelection(ev)}>
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
              <meshBasicMaterial
                color={ev.id === selectedPass ? "blue" : "red"}
              />
            </mesh>
            <Line
              points={generateCurve(
                ev.location,
                ev.pass_end_location,
                ev.pass_height_id,
                ev.pass_body_part_id,
                ev.play_pattern_id
              )}
              flatShading={false}
              color={ev.id === selectedPass ? "#e6d822" : "#da5072"}
            />
          </mesh>
        ))}
    </mesh>
  );
};

export default FieldComponent;
