import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import FieldComponent from "../components/FieldComponent";
import { PassDetailsTypes } from "../types/types";

import { Paper } from "@material-ui/core";

const ViewComponent: React.FC<{
  getPassData: Function;
  passDetails?: Array<PassDetailsTypes>;
}> = ({ passDetails, getPassData }) => {
  return (
    <Paper
      style={{ height: "815px", backgroundColor: "#f5f4db" }}
      elevation={5}
    >
      <Canvas invalidateFrameloop>
        <Suspense fallback={null}>
          <ambientLight color={"grey"} />
          <rectAreaLight
            position={[0, 3, 0]}
            width={12}
            height={7}
            intensity={5}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
          <FieldComponent passDetails={passDetails} getPassData={getPassData} />
          <PerspectiveCamera
            makeDefault
            position={[8, 4, 7]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
          <OrbitControls enableKeys={true} enableRotate={true} />
        </Suspense>
      </Canvas>
    </Paper>
  );
};

export default ViewComponent;
