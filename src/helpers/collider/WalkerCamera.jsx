import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils } from 'three'
import { MeshBVH } from 'three-mesh-bvh'
import { useMultiverse } from '../useMultiverse'

export function WalkerCam({ collider }) {
  let ref = useRef()

  let controls = useMultiverse((s) => s.controls)
  useFrame(({ raycaster, mouse, camera }, dt) => {
    //
    if (collider.geometry) {
      if ('ontouchstatr' in window) {
        raycaster.setFromCamera({ x: 0, y: 0 }, camera)
      } else {
        raycaster.setFromCamera(mouse, camera)
      }

      /** @type {MeshBVH} */
      let bvh = collider.geometry.boundsTree
      //
      if (controls) {
        raycaster.setFromCamera({ x: 0, y: 0 }, camera)
        raycaster.ray.lookAt(controls.target)

        let hit = bvh.raycastFirst(raycaster.ray)

        if (hit) {
          if (hit.distance <= controls.getDistance()) {
            controls.deltaDir = controls.deltaDir || 0

            controls.deltaDir = MathUtils.lerp(
              controls.deltaDir,
              hit.distance - controls.getDistance(),
              0.4
            )
          }
        }

        if (Math.abs(controls.deltaDir) > 0) {
          let dir = camera.position.clone().sub(controls.target).normalize()
          camera.position.addScaledVector(dir, dt * 25 * controls.deltaDir)
          controls.deltaDir -= dt * 25 * controls.deltaDir
        }
      }

      //
    }

    //
  })
  return <group ref={ref}></group>
}
