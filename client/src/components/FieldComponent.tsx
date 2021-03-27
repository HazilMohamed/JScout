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
    loc = BodyInfo.find((x) => x.id === loc)?.height || 0.05;
    playType = PlayPatternInfo.find((x) => x.id === playType)?.height || 0.05;
    return [
      coordinates[0] / 10 - 6,
      isRegularPlay ? loc : playType,
      coordinates[1] / 10 - 4,
    ];
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
              color={ev.id === selectedPass ? "#c3e9a0" : "#da5072"}
            />
          </mesh>
        ))}
    </mesh>
  );
};

export default FieldComponent;
