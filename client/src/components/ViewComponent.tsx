import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import useWindowSize from "../helpers/useWindowSize";
import FieldComponent from "../components/FieldComponent";
import { PassDetailsTypes } from "../types/types";

import "../styles/styles.scss";

const ViewComponent: React.FC<{ passDetails?: Array<PassDetailsTypes> }> = ({
  passDetails,
}) => {
  const innerHeight = useWindowSize()[1];

  return (
    <Canvas
      style={{ height: innerHeight }}
      className="view"
      invalidateFrameloop
    >
      <Suspense fallback={null}>
        <ambientLight color={"grey"} />
        <rectAreaLight
          position={[0, 1, 0]}
          width={12}
          height={12}
          intensity={7}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
        <FieldComponent passDetails={passDetails} />
        <PerspectiveCamera
          makeDefault
          position={[8, 4, 7]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />

        <OrbitControls enableKeys={true} enableRotate={true} />
      </Suspense>
    </Canvas>
  );
};

export default ViewComponent;
