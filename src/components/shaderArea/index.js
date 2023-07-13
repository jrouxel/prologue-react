import React from "react";
import { connect } from 'react-redux';
import {useControls} from 'leva';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, CameraShake} from '@react-three/drei';
import { Particles } from './particles';
import * as THREE from 'three';
import './styles.css';

const ShaderArea = () => {
  const props = useControls({
    focus: {value: 6.49, min: 3, max: 7, step: 0.01},
    speed: {value: 11.8, min: 0.1, max: 100, step: 0.1},
    aperture: {value: 3.6, min: 1, max: 5.6, step: 0.1},
    fov: {value: 184, min: 0, max: 200},
    curl: {value: 0.5, min: 0.01, max: 0.5, step: 0.01}
  });

  return (
    <Canvas camera={{fov: 25, position: [0, 0, 6]}} linear={true}
            gl={{camera: new THREE.WebGL1Renderer({antialias: true, alpha: true})}}>
        
        <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} zoomSpeed={0.1}/>
        <CameraShake yawFrequency={1} maxYaw={0.05} pitchFrequency={1} maxPitch={0.05} rollFrequency={0.5}
                      maxRoll={0.5} intensity={0.2}/>
        <Particles {...props}/>
    </Canvas>
  );
};
// Here you could map state values to props if needed
const mapStateToProps = ({ bot }) => ({
  // your state values here
})

// Here you could map dispatch actions to props if needed
const mapDispatchToProps = dispatch => ({
  // your dispatch actions here
})

export default connect(mapStateToProps, mapDispatchToProps)(ShaderArea);