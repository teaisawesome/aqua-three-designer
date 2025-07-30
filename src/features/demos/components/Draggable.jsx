import React, { useEffect, useRef, useState } from "react";
import { extend, useThree } from "@react-three/fiber";
import { DragControls } from "three/addons/controls/DragControls.js";

extend({ DragControls });

export default function Draggable(props) {
    const groupRef = useRef();
    const controlsRef = useRef();
    const [objects, setObjects] = useState([]);
    const { camera, gl, scene } = useThree();
    useEffect(() => {
      setObjects(groupRef.current.children);
    }, []);
  
    useEffect(() => {
      const controls = controlsRef.current;
      const orbitControls = scene.orbitControls;

      if (!controls || !orbitControls) return;

      const handleHoverOn = () => {
        scene.orbitControls.enabled = false;
      };
      const handleHoverOff = () => {
        scene.orbitControls.enabled = true;
      };

      controls.addEventListener("hoveron", handleHoverOn);
      controls.addEventListener("hoveroff", handleHoverOff);

      return () => {
        controls.removeEventListener("hoveron", handleHoverOn);
        controls.removeEventListener("hoveroff", handleHoverOff);
        orbitControls.enabled = true;
      };
    }, [objects, scene]);
    return (
      <group ref={groupRef}>
        <dragControls ref={controlsRef} args={[objects, camera, gl.domElement]} />
        {props.children}
      </group>
    );
}
