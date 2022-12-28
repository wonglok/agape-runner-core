import { useGLTF } from '@react-three/drei'
import { createPortal, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Object3D, Vector3 } from 'three'
import { AnimationMixer } from 'three'
import { useMultiverse } from './useMultiverse'
import { clone } from 'three140/examples/jsm/utils/SkeletonUtils'
import {
  Color,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector2,
} from 'three140'
import { TheVortex } from '@/components/canvas/TheVortex/TheVortex'

export function Companion({
  lookAtOffset = [0, 0, 0],
  walkOffset = [0, 0, -5],

  speed = 1,
  frustumCulled = false,

  //
  url = `/scene/landing/soldier-512.glb`,

  //
  children,
  runActionName = 'sprint_forward',
}) {
  let player = useMultiverse((s) => s.player)
  let gltf = useGLTF(url)
  let ref = useRef()
  // let [walkTarget] = useState(() => new Object3D())
  // let [lookTarget] = useState(() => new Object3D())

  let root = useMemo(() => {
    if (!gltf) {
      return new Object3D()
    }
    let cloned = clone(gltf.scene)

    cloned.traverse((it) => {
      it.frustumCulled = false
      if (it.material) {
        it.material.roughnessMap = it.material.metalnessMap = it.material.map
        it.material.envMapIntensity = 1
        it.material.emissiveIntensity = 200
      }
    })

    cloned.rotation.x = Math.PI * 0.5
    return cloned
  }, [gltf])

  // useEffect(() => {
  //   walkTarget.position.fromArray(walkOffset)
  //   player.add(walkTarget)
  //   return () => {
  //     walkTarget.removeFromParent()
  //   }
  // }, [player, walkTarget, walkOffset])

  // useEffect(() => {
  //   lookTarget.position.set(0, 0, 0)
  //   lookTarget.position.x += walkOffset[0]
  //   lookTarget.position.y += walkOffset[1]
  //   lookTarget.position.z += walkOffset[2]

  //   lookTarget.position.x += lookAtOffset[0]
  //   lookTarget.position.y += lookAtOffset[1]
  //   lookTarget.position.z += lookAtOffset[2]

  //   player.add(lookTarget)
  //   return () => {
  //     lookTarget.removeFromParent()
  //   }
  // }, [player, lookTarget, lookAtOffset, walkOffset])

  let [act, setAct] = useState({
    name: 'idle',
    inPlace: true,
    repetiton: Infinity,
  })

  let mixer = useMemo(() => {
    return new AnimationMixer()
  }, [])

  useEffect(() => {
    //
    let clip = gltf.animations.find((e) => e.name === act.name)

    if (clip) {
      if (act.inPlace) {
        let Hips = clip.tracks.find((e) => e.name.includes('Hips.position'))
        if (Hips) {
          for (let i = 0; i < Hips.times.length; i += 1) {
            Hips.values[i * 3 + 0] = 0
            // Hips.values[i * 3 + 1] = 0
            Hips.values[i * 3 + 2] = 0
          }
        }
      }

      let action = mixer.clipAction(clip, root)
      action.stop()
      action.reset()
      action.repetiton = Number(act.repetiton)
      action.play()

      //
      return () => {
        action.reset().fadeOut(0.2).play()
      }
    }
  }, [act, gltf.animations, root, mixer])

  let h = new Vector3()
  let l = new Vector3()

  let diff = new Vector3()

  let lookAtQ = new Object3D()
  let v2center = new Vector2(0, 0)
  let companionOffset = new Vector3(0, 0, 0)
  let activeCollider = useMultiverse((s) => s.activeCollider)

  useFrame(({ camera, raycaster }, dt) => {
    mixer.update(dt)

    player.quaternion.copy(camera.quaternion)
    if (ref.current) {
      // ref.current.getWorldPosition(h)
      // h.copy(player.position)
      // walkTarget.getWorldPosition(h)
      // lookTarget.getWorldPosition(l)

      companionOffset.set(0, 0, -3).applyQuaternion(camera.quaternion)
      companionOffset.y = 0

      h.copy(player.position).add(companionOffset)
      //
      diff
        .copy(player.position)
        .add(companionOffset)
        .sub(ref.current.position)
        .multiplyScalar(0.08)

      //
      ref.current.position.addScaledVector(diff, 0.35 * speed)
      ref.current.lookAt(h.x, ref.current.position.y, h.z)

      if (ref.current.position.distanceTo(h) >= 0.3) {
        if (act && act.name !== runActionName) {
          setAct({
            name: runActionName,
            inPlace: true,
            repetiton: '' + Infinity,
          })
        }
      } else {
        if (activeCollider) {
          raycaster.setFromCamera(v2center, camera)
          let hitFirst = activeCollider.geometry.boundsTree.raycastFirst(
            raycaster.ray
          )

          if (hitFirst) {
            let head = gltf.scene.getObjectByName('mixamorigHead')
            head.lookAt(hitFirst.point)
            lookAtQ.lookAt(
              hitFirst.point.x,
              lookAtQ.position.y,
              hitFirst.point.z
            )
          }
        }

        if (act && act.name !== 'idle-rifle') {
          setAct({
            name: 'idle-rifle',
            inPlace: true,
            repetiton: '' + Infinity,
          })
        }
      }

      if (frustumCulled) {
        if (ref.current.position.distanceTo(camera.position) <= 1) {
          ref.current.visible = false
        } else {
          ref.current.visible = true
        }
      }
    }
  })

  //
  //
  return (
    <group>
      <group ref={ref}>
        <group position={[0, -1.45, 0]}>
          <primitive object={root}></primitive>
          {children}

          <group position={[0, 1.0, 0]} scale={0.02}>
            <theVortex key={TheVortex.key}></theVortex>
          </group>
          {createPortal(
            <group>
              <Gun></Gun>
            </group>,
            root.getObjectByName('mixamorigRightHand')
          )}
        </group>
      </group>
    </group>
  )
}

function Gun() {
  let gun = useGLTF(`/scene/landing/gun.glb`)
  let cloned = useMemo(() => {
    return clone(gun.scene)
  }, [gun.scene])
  useEffect(() => {
    gun.scene.traverse((it) => {
      if (it.material) {
        it.material = new MeshStandardMaterial()
        it.material.color = new Color('#0000ff')
        it.material.ior = 1.5
        it.material.reflectivity = 1
        it.material.roughness = 1
        it.material.metalness = 0.5
        it.material.transmission = 0
      }
    })
  })
  return (
    <group
      scale={25}
      position={[2, 23, 1]}
      rotation={[Math.PI * 1.5, 0, Math.PI * -0.5]}
    >
      <primitive object={cloned}></primitive>
    </group>
  )
}
