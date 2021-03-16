import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import useWindowSize from "../helpers/useWindowSize";
import FieldComponent from "../components/FieldComponent";

const MatchAnalysis = () => {
  const [innerWidth, innerHeight] = useWindowSize();

  return (
    <Canvas style={{ height: innerHeight, width: innerWidth }}>
      <gridHelper args={[12, 12]} />
      <FieldComponent />
      <PerspectiveCamera
        makeDefault
        position={[8, 4, 7]}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      <OrbitControls enableKeys={true} enableRotate={true} />
    </Canvas>
  );
};

export default MatchAnalysis;
