import { Stats, useGLTF } from '@react-three/drei'
import { useReady, useScrollStore } from '@/helpers/useScrollStore'
import { useEffect, useMemo, useRef } from 'react'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { AnimationMixer, BufferAttribute, Vector3 } from 'three140'
import { TheVortex } from '../TheVortex/TheVortex'
import { Color, Frustum, LOD, MathUtils, Matrix4, Mesh, Object3D } from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { Octree } from './Octree'
import { StaticGeometryGenerator } from 'three-mesh-bvh'
import md5 from 'md5'

let max = 45.156355645706554
let scheduleStartTime = {
  Camera013_Orientation: 20.00234154719934,
  Camera003_Orientation: 2.983478243416083,
  Camera_Orientation: 4.169748749595136,
  Camera006_Orientation: 9.723748170225846,
  Camera001_Orientation: 16.358542590352094,
  Camera004_Orientation: 23.157913127575213,
  Camera009_Orientation: 24.46997318724838,
  Camera010_Orientation: 28.19060252266285,
  Camera012_Orientation: 32.20940756626385,
  Camera005_Orientation: 36.707416925716934,
  Camera008_Orientation: 41.34326200740272,
  Camera011_Orientation: 7.8282304198105255,
  Camera002_Orientation: 0,
  end: max,
}
let order = [
  'Camera002_Orientation',
  'Camera003_Orientation',
  'Camera_Orientation',
  'Camera011_Orientation',
  'Camera006_Orientation',
  'Camera001_Orientation',
  'Camera013_Orientation',
  'Camera004_Orientation',
  'Camera009_Orientation',
  'Camera010_Orientation',
  'Camera012_Orientation',
  'Camera005_Orientation',
  'Camera008_Orientation',
  'end',
]

export function NYCJourney() {
  let rot = useRef()
  let rot2 = useRef()

  let glb = useGLTF(`/scene/journey/NYC_Expo_30.glb`)

  // let glb = useGLTF(`/nyc/nyc-now/collider.glb?a=1`)

  let camera = useThree((s) => s.camera)
  let { tree, o3d, mergedO3D, mergedTree, lodRequredList, frustum, m4 } =
    useMemo(() => {
      let frustum = new Frustum()
      let m4 = new Matrix4()

      let o3d = new Object3D()
      let mergedO3D = new Object3D()

      //
      let oct = new Octree({
        width: 32,
        maxObjects: 32,
      })

      let mergedTree = new Octree({
        width: 32,
        maxObjects: 32,
      })
      o3d.add(clone(glb.scene))

      o3d.updateMatrixWorld(true)
      o3d.traverse((it) => {
        if (it.material) {
          // let geo = it.geometry

          it.frustumCulled = true

          //
          let box = it.geometry.clone()
          if (!box.boundingSphere) {
            box.computeBoundingSphere()
          }
          box.boundingSphere.center.applyMatrix4(it.matrixWorld)

          box.userData.mesh = it
          box.userData.show = () => {
            it.visible = true
          }
          box.userData.hide = () => {
            it.visible = false
          }
          box.userData.detach = () => {
            it.removeFromParent()
          }

          oct.add(box)
        }
      })

      let recurse = (node, depth = 0, cb) => {
        cb(node)
        let res = node._nodes.filter((e) => e)
        res.forEach((it) => {
          recurse(it, depth + 1, cb)
        })
      }

      let totalVertexies = 0

      o3d.traverse((it) => {
        if (it.geometry) {
          let mesh = it
          let count = mesh.geometry.attributes.position.count
          totalVertexies += count
        }
      })

      let process = (cb) => {
        recurse(oct.root, 0, (node) => {
          // let array = []
          // node._objects.forEach((geometry) => {
          //   geometry.userData.detach()
          //   array.push(geometry.userData.mesh)
          // })
          // builderGroup.push(array)

          // // if (node._objects.length >= 10) {
          // //   let array = []
          // //   node._objects.forEach((geometry) => {
          // //     geometry.userData.detach()
          // //     array.push(geometry.userData.mesh)
          // //   })
          // //   builderGroup.push(array)
          // // } else {
          // //   let array = []
          // //   node._objects.forEach((geometry) => {
          // //     geometry.userData.detach()
          // //     array.push(geometry.userData.mesh)
          // //   })
          // //   cleanGroup.push(array)
          // // }
          //node._objects.map((e) => e.userData.mesh)

          let arr = node._objects.map((e) => e.userData.mesh)
          if (arr.length > 0) {
            let gpVertex = 0

            let arrSegs = [[]]
            let gpVertexBalancer = 0
            arr.forEach((it) => {
              let mesh = it
              let count = mesh.geometry.attributes.position.count
              gpVertex += count

              gpVertexBalancer += count

              // arrSegs[arrSegs.length - 1].forEach((it) => {})
              if (gpVertexBalancer >= 10000) {
                arrSegs.push([])
                gpVertexBalancer = 0
              }

              //
              arrSegs[arrSegs.length - 1].push(it)
            })

            arrSegs.forEach((subArr) => {
              if (subArr.length > 0) {
                cb(subArr, gpVertex, totalVertexies)
              }
            })
          }
        })
      }

      m4.identity()
      m4.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
      frustum.setFromProjectionMatrix(m4)

      frustum.setFromProjectionMatrix(m4)
      oct.frustumCast(frustum)

      let lodRequredList = []

      process((meshes, gpVertex, totalVertexies) => {
        if (meshes.length > 0) {
          // let colorR = new Color(0xffffff * Math.random())
          meshes.forEach((mesh) => {
            if (!mesh.geometry.attributes.uv) {
              let count = mesh.geometry.attributes.position.count
              let ar = []
              for (let i = 0; i < count; i++) {
                ar.push(0, 0)
              }
              mesh.geometry.setAttribute(
                'uv',
                new BufferAttribute(new Float32Array(ar), 2)
              )
            }

            for (const key in mesh.geometry.attributes) {
              if (key === 'position' || key === 'normal' || key === 'uv') {
              } else {
                mesh.geometry.deleteAttribute(key)
              }
            }
          })

          // let simplified = new SimplifyModifier()
          // let s85 = simplified.modify(
          //   mesh.geometry,
          //   Math.floor(mesh.geometry.attributes.position.count * 0.5)
          // )

          //

          let generator = new StaticGeometryGenerator(meshes)
          generator.useGroups = true
          generator.applyWorldTransforms = true
          let mats = generator.getMaterials()

          let geo = generator.generate()
          geo.computeBoundingSphere()

          let center = geo.boundingSphere.center.clone()
          geo.center()
          geo.computeBoundingSphere()
          geo.boundingSphere.center.copy(center)

          //
          let lod = new LOD()

          // mats.forEach((it) => {
          //   it.color = new Color('#ff0000').multiplyScalar(
          //     geo.attributes.position.count / totalVertexies
          //   )
          // })
          // mats.forEach((it) => {
          //   it.color = colorR
          // })
          // requestIdleCallback(() => {

          // })

          let mesh = new Mesh(geo, mats)
          mesh.position.copy(center)

          geo.userData.detach = () => {
            mergedO3D.remove(lod)
          }
          geo.userData.attach = () => {
            if (!lod.parent) {
              mergedO3D.add(lod)
            }
          }

          {
            let _id = `x${center.x.toFixed(0)}-y${center.y.toFixed(
              0
            )}-z${center.z.toFixed(0)}-id${lodRequredList.length}`

            _id = `${md5(_id)}`

            mesh.name = _id
            let outMesh = mesh.clone()
            outMesh.geometry = outMesh.geometry.clone()

            outMesh.geometry.userData = {
              ...outMesh.geometry.userData,
            }
            outMesh.userData = {
              ...outMesh.userData,
            }

            for (let kn in outMesh.geometry.userData) {
              delete outMesh.geometry.userData[kn]
            }
            for (let kn in outMesh.userData) {
              delete outMesh.userData[kn]
            }
            //
            lodRequredList.push({
              _id: _id,
              center,
              vertexCount: geo.attributes.position.count,
              mesh: outMesh,
              materials: mats,
            })
          }

          lod.addLevel(mesh, 0)

          // let m50 = mesh.clone()
          // m50.material.forEach((material) => {
          //   material.clone()
          //   material.opacity = 0.5
          //   material.transparent = true
          // })
          // lod.addLevel(m50, 75)

          geo.userData.mesh = mesh
          mesh.frustumCulled = true
          mergedO3D.add(lod)
          mergedTree.add(geo)
        }
      }, [])

      return {
        tree: oct,
        o3d,
        mergedO3D,
        mergedTree,
        lodRequredList,
        frustum,
        m4,
      }
    }, [camera.matrixWorldInverse, camera.projectionMatrix, glb.scene])

  let myTime = useRef(0)
  // let camera = useThree((s) => s.camera)

  let mixer = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb.scene])

  useEffect(() => {
    glb.animations.forEach((ui) => {
      mixer.clipAction(ui).play()
    })

    //
  }, [glb, mixer])

  let setLoading = useReady((s) => s.setLoading)
  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    glb.cameras.forEach((cam) => {
      cam.userData.oldPos = cam.position.clone()
      cam.userData.nowPos = cam.position.clone()
      cam.userData.diff = new Vector3()
      cam.userData.diff.copy(cam.position)
    })

    return useScrollStore.subscribe((v) => {
      myTime.current = v.smooth * max
      if (myTime.current <= 0.5) {
        myTime.current = 0.5
      }
      if (myTime.current >= max) {
        myTime.current = max
      }

      // ref.current.rotation.y = v.smooth * Math.PI
    })
  }, [glb.cameras, useScrollStore.subscribe])

  let lastCam = false

  let orderTime = order.map((e, i) => {
    let nextname = order[i + 1]
    return {
      name: e,
      start: scheduleStartTime[e],
      end: scheduleStartTime[nextname] || e,
    }
  })

  useFrame(({ camera, size, mouse }, dt) => {
    //
    if (rot2.current) {
      // rot2.current.rotation.x = mouse.x * 0.0
      // rot2.current.rotation.y = mouse.y * 0.0
    }

    mixer.setTime(myTime.current)

    let sorted = glb.cameras

    let getRun = (cam) => {
      // if (rot?.current?.position.length() === 0.0) {
      //   return true
      // }

      let info = orderTime.find((e) => e.name === cam.name)

      let now = myTime.current

      if (info) {
        if (now >= info.start && now <= info.end) {
          return true
        }
      }
    }
    for (let cam of sorted) {
      cam.played = cam.played || 0

      if (!cam.userData.nowPos) {
        return
      }

      if (!cam.userData.oldPos) {
        return
      }

      cam.getWorldPosition(cam.userData.nowPos)

      let diff = cam.userData.nowPos.sub(cam.userData.oldPos).length()

      cam.getWorldPosition(cam.userData.oldPos)

      let adder = 0
      if (size.width < size.height) {
        adder += 15
      }

      if (diff > 0.0001) {
        if (lastCam === false) {
          lastCam = cam
          cam.played++
        }
        if (lastCam !== cam) {
          lastCam = cam
          cam.played++
        }

        if (getRun(cam)) {
          cam.getWorldPosition(camera.position)
          cam.getWorldQuaternion(camera.quaternion)

          camera.fov = cam.fov * 0.0 + 40 + adder
          camera.near = cam.near
          camera.far = cam.far
          camera.updateProjectionMatrix()
        }
      }
    }
  })

  let scene = useThree((s) => s.scene)
  // let camera = useThree((s) => s.camera)

  return (
    <group>
      <Stats></Stats>
      {createPortal(
        <group ref={rot}>
          <group ref={rot2}>
            <primitive object={camera}></primitive>
          </group>
        </group>,
        scene
      )}
      <primitive object={mergedO3D}></primitive>
      {/* <primitive visible={true} object={glb.scene}></primitive> */}
      <group position={[0, 1.5, 0]}>
        <group position={[5.523, 6.087, -14.196]}>
          <group scale={0.075}>
            <theVortex key={TheVortex.key}></theVortex>
          </group>
        </group>
      </group>
    </group>
  )
}

/*



*/
