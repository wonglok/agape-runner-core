import { useEffect, useMemo, useRef } from 'react'
// import { useAccessor } from '@/vfx-studio/store/use-accessor'
import { useFrame, useThree, createPortal } from '@react-three/fiber'
// import { HDRTex } from './HDRTex'
import {
  Plane,
  TrackballControls,
  TransformControls,
  // FlyControls,
  // MapControls,
  // OrbitControls,
  useFBO,
} from '@react-three/drei'
import { DoubleSide, NormalBlending, Object3D, Vector3 } from 'three'
// import anime from 'animejs'
// import { EffectNodeRuntime } from '../effectnode/Runtime/EffectNodeRuntime/EffectNodeRuntime'
// import { Player } from '@/vfx-meta/game-parts/Player'
// import { OnlineSystem } from '@/vfx-meta/online/OnlineSystem'
// import { useMetaStore } from '@/vfx-meta/store/use-meta-store'/
//Mesh, MeshBasicMaterial,
import { Scene } from 'three144'
// import { EnvLight } from '@/vfx-meta/game-vfx/EnvLight'
// import { useRender } from '@/vfx-meta/store/use-render'
import { SceneTransformControl } from './SceneTransformControl'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { EffectComposer } from '@react-three/postprocessing'
import { GLOverlay } from './GLOverlay'
import { TransformControlsFix } from './TransformControlsFix'
//
// import { EffectComposer, SSR } from '@react-three/postprocessing'
// import { GLOverlay } from './GLOverlay'

export function AdaptTC({ node, children, onScreenPass = () => {} }) {
  let reloadGraphID = useGLBEditor((s) => s.reloadGraphID)

  let fakeScene = useMemo(() => new Scene(), [])

  let size = useThree((s) => s.size)
  let fbo = useFBO(size.width, size.height)

  // let camQ = new Camera()
  // camQ.position.z = 1

  // let quad = useMemo(() => {
  //   return new Mesh(
  //     new PlaneBufferGeometry(2, 2),
  //     new MeshBasicMaterial({
  //       map: fbo.texture,
  //       side: DoubleSide,
  //       color: 0xff0000,
  //       transparent: true,
  //       transparent: 1,
  //     })
  //   )
  // }, [fbo.texture])

  useFrame(({ gl, scene, camera }) => {
    if (fakeScene && fakeScene?.children.length > 0 && camera) {
      // //
      gl.setRenderTarget(fbo)
      gl.setClearColor(0xffffff, 0)
      gl.setClearAlpha(0)
      gl.clear()
      gl.render(fakeScene, camera)
      gl.setRenderTarget(null)
      gl.setClearAlpha(0)

      // gl.autoClear = false
      // gl.render(quad, camQ)
      // gl.autoClear = true

      // gl.render(scene, camera)
    } else {
      // gl.render(scene, camera)
    }
  })

  useEffect(() => {
    onScreenPass(<GLOverlay fbo={fbo}></GLOverlay>)
    return () => {
      onScreenPass(null)
    }
  }, [])

  return (
    <>
      {createPortal(children, fakeScene)}

      {/* {fbo && (
        <EffectComposer>

        </EffectComposer>
      )} */}

      {/* <Screen fbo={fbo}></Screen> */}
      <TransformControlsFix fakeScene={fakeScene}></TransformControlsFix>

      {<ENTCNode key={reloadGraphID} fakeScene={fakeScene} node={node} />}
    </>
  )
}

// const visibleHeightAtZDepth = (depth, camera) => {
//   // compensate for cameras not positioned at z=0
//   const cameraOffset = camera.position.z
//   if (depth < cameraOffset) depth -= cameraOffset
//   else depth += cameraOffset

//   // vertical fov in radians
//   const vFOV = (camera.fov * Math.PI) / 180

//   // Math.abs to ensure the result is always positive
//   return 2 * Math.tan(vFOV / 2) * Math.abs(depth)
// }

// const visibleWidthAtZDepth = (depth, camera) => {
//   const height = visibleHeightAtZDepth(depth, camera)
//   return height * camera.aspect
// }

// function Screen({ fbo }) {
//   let camera = useThree((e) => e.camera)
//   let viewport = useThree((e) => e.viewport)
//   let size = useThree((e) => e.size)
//   let vp = viewport.getCurrentViewport(
//     camera,
//     camera.position.clone().add(new Vector3(0, 0, -0.5)),
//     size
//   )

//   // let w = visibleWidthAtZDepth(0, camera)
//   // let h = visibleHeightAtZDepth(0, camera)
//   return (
//     <>
//       {createPortal(
//         <mesh
//           renderOrder={-1}
//           frustumCulled={false}
//           position={[0, 0, -0.5]}
//           scale={1}
//         >
//           <planeBufferGeometry
//             args={[vp.width, vp.height]}
//           ></planeBufferGeometry>
//           <meshBasicMaterial
//             transparent={true}
//             map={fbo.texture}
//             side={DoubleSide}
//             color='#ffffff'
//             blending={NormalBlending}
//           ></meshBasicMaterial>
//         </mesh>,
//         camera
//       )}
//       <primitive object={camera}></primitive>
//     </>
//   )
// }

//

export function ENTCNode({ node, fakeScene }) {
  let graphData = node?.userData?.effectNode

  return (
    <>
      {graphData && (
        <GroupTCs
          fakeScene={fakeScene}
          node={node}
          graphData={graphData}
        ></GroupTCs>
      )}
      {node?.children?.map((it) => {
        return (
          <ENTCNode fakeScene={fakeScene} key={it.uuid} node={it}></ENTCNode>
        )
      })}
    </>
  )
}

function GroupTCs({ node, graphData, fakeScene }) {
  return (
    <>
      {graphData?.nodes.map((e) => {
        return (
          <TC key={e._id} fakeScene={fakeScene} node={node} nodeData={e}></TC>
        )
      })}
    </>
  )
}

function TC({ node, nodeData, fakeScene }) {
  // let updateSelected = useAccessor((s) => s.updateSelected)

  let o3 = useMemo(() => {
    let o3 = new Object3D()

    if (nodeData) {
      let transformPosition = nodeData.uniforms.find(
        (e) => e.name === 'transformPosition'
      )

      if (transformPosition) {
        window.addEventListener('reload-3d-gui', ({}) => {
          if (o3.__disabled) {
            return
          }
          o3.position.set(
            transformPosition.value.x,
            transformPosition.value.y,
            transformPosition.value.z
          )
        })
      }

      let transformScale = nodeData.uniforms.find(
        (e) => e.name === 'transformScale'
      )

      if (transformScale) {
        window.addEventListener('reload-3d-gui', ({}) => {
          if (o3.__disabled) {
            return
          }
          o3.scale.set(
            transformScale.value.x,
            transformScale.value.y,
            transformScale.value.z
          )
        })
      }

      let transformRotation = nodeData.uniforms.find(
        (e) => e.name === 'transformRotation'
      )

      if (transformRotation) {
        window.addEventListener('reload-3d-gui', ({}) => {
          if (o3.__disabled) {
            return
          }
          o3.rotation.set(
            transformRotation.value.x,
            transformRotation.value.y,
            transformRotation.value.z
          )
        })
      }

      window.dispatchEvent(new CustomEvent('reload-3d-gui'))
    }

    return o3
  }, [])

  // node, nodeData, fakeScene
  useEffect(() => {
    let po3 = new Object3D()

    let tt = setInterval(() => {
      if (node) {
        // node.updateMatrixWorld()
        node.getWorldPosition(po3.position)
        node.getWorldQuaternion(po3.quaternion)
        node.getWorldScale(po3.scale)
        // po3.updateMatrix()
      }
    })

    po3.add(o3)
    fakeScene.add(po3)
    return () => {
      clearInterval(tt)
      po3.visible = false
      o3.__disabled = true
    }
  }, [o3, node, fakeScene])

  let gl = useThree((s) => s.gl)
  // let tt = 0
  let camera = useThree((s) => s.camera)
  return (
    <>
      {nodeData.uniforms.some((e) => e.name === 'transformPosition') && (
        <SceneTransformControl
          fakeScene={fakeScene}
          camera={camera}
          gl={gl}
          object={o3}
          onChange={(o3) => {
            //

            let pos = nodeData.uniforms.find(
              (e) => e.name === 'transformPosition'
            )

            pos.value.x = o3.position.x
            pos.value.y = o3.position.y
            pos.value.z = o3.position.z

            let rot = nodeData.uniforms.find(
              (e) => e.name === 'transformRotation'
            )

            rot.value.x = o3.rotation.x
            rot.value.y = o3.rotation.y
            rot.value.z = o3.rotation.z

            let scale = nodeData.uniforms.find(
              (e) => e.name === 'transformScale'
            )

            scale.value.x = o3.scale.x
            scale.value.y = o3.scale.y
            scale.value.z = o3.scale.z

            window.dispatchEvent(
              new CustomEvent('reload-gui-value', { detail: nodeData })
            )

            // clearTimeout(tt)
            // tt = setTimeout(() => {
            //   updateSelected([node])
            // }, 100)
            //
          }}
        ></SceneTransformControl>
      )}
    </>
  )
}

//
/*
{node && node.userData?.effectNode && (
        <SceneTransformControl object={o3}></SceneTransformControl>
      )}

let o3 = useMemo(() => {
    let o3 = new Object3D()

    if (!graphData) {
      return o3
    }

    if (graphData) {
      let position = nodeData.uniforms.find((e) => e.name === 'position')
      if (position) {
        o3.position.copy(position.value)
      }
      let rotation = nodeData.uniforms.find((e) => e.name === 'rotation')
      if (rotation) {
        o3.rotation.x = rotation.value.x
        o3.rotation.y = rotation.value.y
        o3.rotation.z = rotation.value.z
      }

      //
      let scale = nodeData.uniforms.find((e) => e.name === 'scale')
      if (scale) {
        o3.scale.copy(scale.value)
      }
      //
      // o3.position.copy()

      return o3
    }
  }, [graphData])
*/

//
