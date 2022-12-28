import { MeshBVH } from 'three-mesh-bvh'
import {
  Box3,
  BoxBufferGeometry,
  Mesh,
  SphereBufferGeometry,
  Vector3,
  MeshBasicMaterial,
} from 'three'

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { BufferGeometry } from 'three140'

export async function sceneToCollider({ scene }) {
  //
  let gltfScene = scene

  //
  let geometriesToBeMerged = []
  //
  gltfScene.updateMatrixWorld(true)

  let processList = []
  gltfScene.traverse((c) => {
    if (c.geometry && !c.isSkinnedMesh) {
      processList.push(c)
    }
  })

  let i = 0
  //
  for (let c of processList) {
    if (c.userData.notFloor) {
    } else if (c.userData.skipBVH) {
    } else if (c.userData?.isBox) {
      let cloned = c.geometry

      cloned.computeBoundingBox()
      const box = new Box3()
      box.copy(cloned.boundingBox)

      let center = new Vector3()
      c.updateMatrixWorld()

      box.applyMatrix4(c.matrixWorld)
      let s = new Vector3()
      box.getSize(s)
      box.getCenter(center)

      let geo = new BoxBufferGeometry(s.x, s.y, s.z)
      geo.translate(center.x, center.y, center.z)

      // let mesh = new Mesh(
      //   geo,
      //   new MeshBasicMaterial({
      //     color: 0xff0000,
      //     opacity: 1,
      //     wireframe: true,
      //   })
      // );
      // scene.add(mesh);
      //

      for (const key in geo.attributes) {
        if (key !== 'position') {
          geo.deleteAttribute(key)
        }
      }

      geometriesToBeMerged.push(geo)
    } else if (c.userData?.isSphere) {
      let cloned = c.geometry

      cloned.computeBoundingSphere()
      const sph = new Sphere()
      sph.copy(cloned.boundingSphere)

      let center = new Vector3()
      c.updateMatrixWorld()
      sph.applyMatrix4(c.matrixWorld)

      center.copy(sph.center)

      let geo = new SphereBufferGeometry(sph.radius, 8, 8)
      geo.translate(center.x, center.y, center.z)

      // let mesh = new Mesh(
      //   geo,
      //   new MeshBasicMaterial({
      //     color: 0x00ff00,
      //     opacity: 1,
      //     wireframe: true,
      //   })
      // );
      // scene.add(mesh);

      for (const key in geo.attributes) {
        if (key !== 'position') {
          geo.deleteAttribute(key)
        }
      }
      geometriesToBeMerged.push(geo)
    } else {
      const cloned = c.geometry.toNonIndexed()
      cloned.applyMatrix4(c.matrixWorld)

      for (const key in cloned.attributes) {
        if (key !== 'position') {
          cloned.deleteAttribute(key)
        }
      }

      geometriesToBeMerged.push(cloned)
    }
    await new Promise((r) => r())
    // console.log("processing glb", ((i / processList.length) * 100).toFixed(2));
    i++
  }
  await new Promise((r) => r())

  //
  // create the merged geometry
  let combined = []
  try {
    combined = BufferGeometryUtils.mergeBufferGeometries(
      geometriesToBeMerged,
      false
    )
  } catch (e) {
    //
  }
  if (combined.length === 0) {
    let bg = new BufferGeometry()
    bg.copy(new BoxBufferGeometry(1000000000, 0.1, 1000000000))
    combined = [bg]
  }

  combined.boundsTree = new MeshBVH(combined, {
    // Which split strategy to use when constructing the BVH.
    // strategy: CENTER,

    // The maximum depth to allow the tree to build to.
    // Setting this to a smaller trades raycast speed for better construction
    // time and less memory allocation.
    maxDepth: 40,

    // The number of triangles to aim for in a leaf node. Setting this to a lower
    // number can improve raycast performance but increase construction time and
    // memory footprint.
    maxLeafTris: 15,

    // If true then the bounding box for the geometry is set once the BVH
    // has been constructed.
    setBoundingBox: true,

    // If true then the MeshBVH will use SharedArrayBuffer rather than ArrayBuffer when
    // initializing the BVH buffers. Geometry index data will be created as a
    // SharedArrayBuffer only if it needs to be created. Otherwise it is used as-is.
    useSharedArrayBuffer: false,

    // An optional function that takes a "progress" argument in the range [0, 1]
    // indicating the progress along BVH generation. Useful primarily when generating
    // the BVH asynchronously with the GenerateMeshBVHWorker class.
    onProgress: null,

    // Print out warnings encountered during tree construction.
    verbose: true,
  })

  let collider = new Mesh(combined, new MeshBasicMaterial({ wireframe: true }))

  return collider
}
