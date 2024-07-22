import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";

export default function Plant() {
    const gltf = useLoader(GLTFLoader, '/3d-objects/air_plant_v1.0/scene.gltf')
    return <primitive object={gltf.scene} />
}