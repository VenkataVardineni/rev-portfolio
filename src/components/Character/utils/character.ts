import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

/**
 * Put your own 3D character model here to replace the default.
 * Supported: .glb or .gltf (optionally Draco-compressed).
 * Place your file at: public/models/custom-character.glb
 * If this file is missing, the original encrypted character is used.
 */
const CUSTOM_MODEL_PATH = "/models/custom-character.glb";

function processCharacter(
  character: THREE.Object3D,
  gltf: GLTF,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene
) {
  character.traverse((child: any) => {
    if (child.isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        if (mesh.name === "BODY.SHIRT") {
          const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
          newMat.color = new THREE.Color("#8B4513");
          mesh.material = newMat;
        } else if (mesh.name === "Pant") {
          const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
          newMat.color = new THREE.Color("#000000");
          mesh.material = newMat;
        }
      }
      child.castShadow = true;
      child.receiveShadow = true;
      mesh.frustumCulled = true;
    }
  });
  const footR = character.getObjectByName("footR");
  const footL = character.getObjectByName("footL");
  if (footR) footR.position.y = 3.36;
  if (footL) footL.position.y = 3.36;
  setCharTimeline(character, camera);
  setAllTimeline();
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadEncrypted = (): Promise<GLTF | null> => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            processCharacter(character, gltf, renderer, camera, scene);
            resolve(gltf);
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading default character:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  const loadCharacter = (): Promise<GLTF | null> => {
    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        CUSTOM_MODEL_PATH,
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);
          processCharacter(character, gltf, renderer, camera, scene);
          resolve(gltf);
          dracoLoader.dispose();
        },
        undefined,
        () => {
          console.info("Custom model not found at " + CUSTOM_MODEL_PATH + ", using default character.");
          loadEncrypted().then(resolve).catch(reject);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
