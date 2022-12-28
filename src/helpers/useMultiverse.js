import create from 'zustand'
import { sceneToCollider } from './sceneToCollider'
import { BoxBufferGeometry, Color, MeshPhysicalMaterial, Scene } from 'three'
import { Mesh, MeshBasicMaterial } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { Line3, Vector3 } from 'three'
import { Box3, Matrix4, Quaternion } from 'three'

const useMultiverse = create((set, get) => {
  //
  let vScene = new Scene()

  let geo = new BoxBufferGeometry(10000, 0.1, 10000)
  let mat = new MeshBasicMaterial({ color: 0xff0000 })
  let box = new Mesh(geo, mat)

  vScene.add(box)

  let colliderPromises = {
    virtualFloor: sceneToCollider({ scene: vScene }),
  }

  //
  // colliderPromises.virtualFloor.then((collider) => {
  //   set({
  //     activeCollider: collider,
  //   })
  // })

  let player = new Mesh(
    new RoundedBoxGeometry(1.0, 2.0, 1.0, 10, 0.5),
    new MeshPhysicalMaterial({
      color: new Color('#ffffff'),
      transmission: 1,
      roughness: 0.5,
      metalness: 0.4,
      transparent: true,
      opacity: 0.5,
      ior: 1.4,
      reflectivity: 1,
      clearcoat: 1,
    })
  )

  player.name = 'myavatar'
  player.geometry.translate(0, -0.5, 0)
  player.capsuleInfo = {
    radius: 0.5,
    segment: new Line3(new Vector3(), new Vector3(0, -1.0, 0.0)),
  }

  let onlineProfile = {
    // //
    // avatarURL: `/scene/loklokdemo/glassman_.glb`,
    // avatarVendor: `rpm`,
    // //
    // avatarURLWrap: `/scene/loklokdemo/glassman_.glb`,
    // avatarActionResumeOnKeyUp: 'stand',
    // avatarActionName: 'stand',
    // avatarActionIdleName: 'stand',
    // avatarActionRepeat: Infinity,
  }

  let self = {
    voiceID: '',

    playerIsOnGround: false,
    player,

    //
    gravity: -30,
    playerSpeed: 10,
    physicsSteps: 5,

    fwdPressed: false,
    bkdPressed: false,
    lftPressed: false,
    rgtPressed: false,
    lftRotPressed: false,
    rgtRotPressed: false,

    playerVelocity: new Vector3(),
    resetPositon: new Vector3(0, 1, 0),
    upVector: new Vector3(0, 1, 0),
    tempVector: new Vector3(),
    tempVector2: new Vector3(),
    tempBox: new Box3(),
    tempMat: new Matrix4(),
    tempSegment: new Line3(),
    deltaTarget: new Vector3(0, 0, 0),

    //
    coord: new Vector3(),
    quaternion: new Quaternion(),
  }

  return {
    ///

    locked: false,
    setLocked: (v) => {
      set({ locked: v })
    },
    ///
    usePostProcessing: true,
    setPostProcessing: (s) => set({ usePostProcessing: s }),
    ...self,
    ...onlineProfile,

    colliderPromises,
    controls: false,
    setControls: (s) => {
      set({ controls: s })
      return () => {
        s.dispose()
      }
    },

    camera: false,
    setCamera: (s) => set({ camera: s }),
    activeCollider: false,
    setActiveCollider: (s) => set({ activeCollider: v }),

    addNamedScene: async ({ name, scene }) => {
      let colliderPromises = get().colliderPromises

      if (!colliderPromises[name]) {
        colliderPromises[name] = sceneToCollider({ scene })
      }

      let collider = await colliderPromises[name]

      set({ activeCollider: collider, colliderPromises: colliderPromises })

      get().setPosition({ initPos: [0, 1, -3], lookAt: [0, 1, -1] })

      return collider
    },

    setPosition: ({ initPos = [0, 1, 0], lookAt = [0, 1, -1] }) => {
      let self = get()
      let controls = self.controls
      let camera = self.camera

      //
      self.playerVelocity.set(0, 0, 0)
      self.player.position.fromArray(initPos)

      camera.position.copy(self.player.position)
      camera.position.x = initPos[0]
      camera.position.y = initPos[1]
      camera.position.z = initPos[2]
      camera.lookAt(lookAt[0], lookAt[1], lookAt[2])

      if (controls.target) {
        controls.object.position.fromArray(initPos)
        controls.target.set(lookAt[0], lookAt[1], lookAt[2])
      }
      if (controls.update) {
        controls.update()
      }
    },

    setKeyboard: () => {
      let onKeyDown = (e) => {
        switch (e.code) {
          case 'KeyX':
            break
          case 'KeyF':
            break
          case 'KeyV':
            break
          case 'KeyR':
            break
          case 'KeyW':
            set({ fwdPressed: true })
            break
          case 'KeyS':
            set({ bkdPressed: true })
            break
          case 'KeyD':
            set({ rgtPressed: true })
            break
          case 'KeyA':
            set({ lftPressed: true })
            break
          case 'KeyE':
            break
          case 'KeyQ':
            break
          case 'ArrowUp':
            break
          case 'ArrowDown':
            break
          case 'ArrowRight':
            break
          case 'ArrowLeft':
            break
          case 'Space':
            // if (get().playerIsOnGround) {
            get().playerVelocity.set(0, 13, 0)
            // }
            break
        }
      }

      let onKeyUp = (e) => {
        switch (e.code) {
          case 'KeyX':
            break
          case 'KeyF':
            break
          case 'KeyV':
            break
          case 'KeyR':
            break
          case 'KeyW':
            set({ fwdPressed: false })
            break
          case 'KeyS':
            set({ bkdPressed: false })
            break
          case 'KeyD':
            set({ rgtPressed: false })
            break
          case 'KeyA':
            set({ lftPressed: false })
            break
          case 'KeyE':
            break
          case 'KeyQ':
            break
          case 'ArrowUp':
            break
          case 'ArrowDown':
            break
          case 'ArrowRight':
            break
          case 'ArrowLeft':
            break
          case 'Space':
            break
        }
      }

      window.addEventListener('keydown', onKeyDown)
      window.addEventListener('focus', onKeyUp)
      window.addEventListener('blur', onKeyUp)
      window.addEventListener('keyup', onKeyUp)

      return () => {
        window.removeEventListener('keydown', onKeyDown)
        window.removeEventListener('focus', onKeyUp)
        window.removeEventListener('blur', onKeyUp)
        window.removeEventListener('keyup', onKeyUp)
      }
    },
    updatePlayer: (delta) => {
      if (delta > 1 / 60) {
        delta = 1 / 60
      }

      let self = get()
      // console.log(self)

      if (!self.activeCollider) {
        return
      }
      if (!self.controls) {
        return
      }
      if (!self.camera) {
        return
      }
      self.camera.near = 0.1
      self.camera.updateProjectionMatrix()

      if (self.player.position.distanceTo(self.camera.position) <= 2.5) {
        self.player.visible = false
      } else {
        self.player.visible = true
      }

      self.playerVelocity.y += self.playerIsOnGround ? 0 : delta * self.gravity
      self.player.position.addScaledVector(self.playerVelocity, delta)

      // self.controls.getAzimuthalAngle
      // move the player
      const angle = self.controls.getAzimuthalAngle()
      if (self.fwdPressed) {
        self.tempVector
          .set(0, 0, -1)
          .applyQuaternion(self.controls.object.quaternion)
        //.applyAxisAngle(self.upVector, angle)
        self.player.position.addScaledVector(
          self.tempVector,
          self.playerSpeed * delta
        )
        self.player.rotation.y = self.controls.getAzimuthalAngle()
      }

      if (self.bkdPressed) {
        self.tempVector
          .set(0, 0, 1)
          .applyQuaternion(self.controls.object.quaternion)
        //.applyAxisAngle(self.upVector, angle)
        self.player.position.addScaledVector(
          self.tempVector,
          self.playerSpeed * delta
        )
        self.player.rotation.y = self.controls.getAzimuthalAngle()
      }

      if (self.lftPressed) {
        self.tempVector
          .set(-1, 0, 0)
          .applyQuaternion(self.controls.object.quaternion)
        //.applyAxisAngle(self.upVector, angle)
        self.player.position.addScaledVector(
          self.tempVector,
          self.playerSpeed * delta
        )
        self.player.rotation.y = self.controls.getAzimuthalAngle()
      }
      if (self.rgtPressed) {
        self.tempVector
          .set(1, 0, 0)
          .applyQuaternion(self.controls.object.quaternion)
        //.applyAxisAngle(self.upVector, angle)
        self.player.position.addScaledVector(
          self.tempVector,
          self.playerSpeed * delta
        )
        self.player.rotation.y = self.controls.getAzimuthalAngle()
      }

      if (self.lftRotPressed) {
        self.tempVector
          .set(1, 0, 0)
          .applyQuaternion(self.controls.object.quaternion)

        self.quaternion.setFromAxisAngle(self.tempVector, 0.1)
        self.controls.object.quaternion.premultiply(self.quaternion)
        self.tempVector.applyQuaternion(self.quaternion)
        self.controls.object.position.addScaledVector(
          self.tempVector,
          self.coord
            .copy(self.camera.position)
            .sub(self.controls.target)
            .length() * 0.03
        )
        self.controls.saveState()
        self.controls.update()
        self.player.rotation.y = self.controls.getAzimuthalAngle()
      }

      if (self.rgtRotPressed) {
        self.tempVector
          .set(-1, 0, 0)
          .applyQuaternion(self.controls.object.quaternion)

        self.quaternion.setFromAxisAngle(self.tempVector, 0.1)
        self.controls.object.quaternion.premultiply(self.quaternion)
        self.tempVector.applyQuaternion(self.quaternion)
        self.controls.object.position.addScaledVector(
          self.tempVector,
          self.coord
            .copy(self.camera.position)
            .sub(self.controls.target)
            .length() * 0.03
        )
        self.controls.saveState()
        self.controls.update()
        self.player.rotation.y = self.controls.getAzimuthalAngle()
      }

      self.player.updateMatrixWorld()

      // adjust player position based on collisions
      const capsuleInfo = self.player.capsuleInfo
      self.tempBox.makeEmpty()
      self.tempMat.copy(self.activeCollider.matrixWorld).invert()
      self.tempSegment.copy(capsuleInfo.segment)

      // get the position of the capsule in the local space of the activeCollider
      self.tempSegment.start
        .applyMatrix4(self.player.matrixWorld)
        .applyMatrix4(self.tempMat)
      self.tempSegment.end
        .applyMatrix4(self.player.matrixWorld)
        .applyMatrix4(self.tempMat)

      // get the axis aligned bounding box of the capsule
      self.tempBox.expandByPoint(self.tempSegment.start)
      self.tempBox.expandByPoint(self.tempSegment.end)

      self.tempBox.min.addScalar(-capsuleInfo.radius)
      self.tempBox.max.addScalar(capsuleInfo.radius)

      self.activeCollider.geometry.boundsTree.shapecast({
        intersectsBounds: (box) => box.intersectsBox(self.tempBox),

        intersectsTriangle: (tri) => {
          // check if the triangle is intersecting the capsule and adjust the
          // capsule position if it is.
          const triPoint = self.tempVector
          const capsulePoint = self.tempVector2

          const distance = tri.closestPointToSegment(
            self.tempSegment,
            triPoint,
            capsulePoint
          )
          if (distance < capsuleInfo.radius) {
            const depth = capsuleInfo.radius - distance
            const direction = capsulePoint.sub(triPoint).normalize()

            self.tempSegment.start.addScaledVector(direction, depth)
            self.tempSegment.end.addScaledVector(direction, depth)
          }
        },
      })

      // get the adjusted position of the capsule activeCollider in world space after checking
      // triangle collisions and moving it. capsuleInfo.segment.start is assumed to be
      // the origin of the player model.
      const newPosition = self.tempVector
      newPosition
        .copy(self.tempSegment.start)
        .applyMatrix4(self.activeCollider.matrixWorld)

      // check how much the activeCollider was moved
      const deltaVector = self.tempVector2
      deltaVector.subVectors(newPosition, self.player.position)

      // if the player was primarily adjusted vertically we assume it's on something we should consider ground
      self.playerIsOnGround =
        deltaVector.y > Math.abs(delta * self.playerVelocity.y * 0.25)

      const offset = Math.max(0.0, deltaVector.length() - 1e-5)
      deltaVector.normalize().multiplyScalar(offset)

      // adjust the player model
      self.player.position.add(deltaVector)

      if (!self.playerIsOnGround) {
        deltaVector.normalize()
        self.playerVelocity.addScaledVector(
          deltaVector,
          -deltaVector.dot(self.playerVelocity)
        )
      } else {
        self.playerVelocity.set(0, 0, 0)
      }

      // adjust the camera
      self.camera.position.sub(self.controls.target)
      self.controls.target.copy(self.player.position)
      self.camera.position.add(self.player.position)

      self.controls.target.y += 0.0001 * Math.sin(delta)

      // if the player has fallen too far below the level reset their position to the start
      if (self.player.position.y < -100) {
        // self.player.position.copy({
        //   lookAtTarget: [3.3, 1.5, 32.1],
        //   cameraPositionOffset: [0, 1, 4],
        // })
        self.player.position.fromArray([0, 5, 0])
        self.playerVelocity.set(0, 0, 0)

        // this.reset({ position: [0, 3, 3], lookAtTarget: [0, 3, 3] })
      }
    },

    updatePlayerPointer: (delta) => {
      if (delta > 1 / 60) {
        delta = 1 / 60
      }

      let self = get()
      // console.log(self)

      if (!self.activeCollider) {
        return
      }
      if (!self.controls) {
        return
      }
      if (!self.camera) {
        return
      }

      if (self.player.position.distanceTo(self.camera.position) <= 2.5) {
        self.player.visible = false
      } else {
        self.player.visible = true
      }

      self.playerVelocity.y += self.playerIsOnGround ? 0 : delta * self.gravity
      self.player.position.addScaledVector(self.playerVelocity, delta)

      // console.log(self.controls.camera)
      // self.controls.getAzimuthalAngle
      // move the player
      const angle = self.controls.camera.rotation.y
      // console.log(angle)
      if (self.fwdPressed) {
        self.tempVector.set(0, 0, -1).applyQuaternion(self.camera.quaternion) //.applyAxisAngle(self.upVector, angle)
        self.player.position.addScaledVector(
          self.tempVector,
          self.playerSpeed * delta
        )
        self.player.rotation.y = self.camera.rotation.y
      }

      if (self.bkdPressed) {
        self.tempVector.set(0, 0, 1).applyQuaternion(self.camera.quaternion) //.applyAxisAngle(self.upVector, angle)
        self.player.position.addScaledVector(
          self.tempVector,
          self.playerSpeed * delta
        )
        self.player.rotation.y = self.camera.rotation.y
      }

      if (self.lftPressed) {
        self.tempVector.set(-1, 0, 0).applyQuaternion(self.camera.quaternion) //.applyAxisAngle(self.upVector, angle)
        self.player.position.addScaledVector(
          self.tempVector,
          self.playerSpeed * delta
        )
        self.player.rotation.y = self.camera.rotation.y
      }
      if (self.rgtPressed) {
        self.tempVector.set(1, 0, 0).applyQuaternion(self.camera.quaternion) //.applyAxisAngle(self.upVector, angle)
        self.player.position.addScaledVector(
          self.tempVector,
          self.playerSpeed * delta
        )
        self.player.rotation.y = self.camera.rotation.y
      }

      if (self.lftRotPressed) {
        self.tempVector.set(1, 0, 0).applyQuaternion(self.camera.quaternion)

        self.quaternion.setFromAxisAngle(self.tempVector, 0.1)
        self.camera.quaternion.premultiply(self.quaternion)
        self.tempVector.applyQuaternion(self.quaternion)
        self.camera.position.addScaledVector(
          self.tempVector,
          self.coord
            .copy(self.camera.position)
            .sub(self.controls.target)
            .length() * 0.03
        )
        self.controls.saveState()
        self.controls.update()
        self.player.rotation.y = self.camera.rotation.y
      }

      if (self.rgtRotPressed) {
        self.tempVector
          .set(-1, 0, 0)
          .applyQuaternion(self.controls.object.quaternion)

        self.quaternion.setFromAxisAngle(self.tempVector, 0.1)
        self.controls.object.quaternion.premultiply(self.quaternion)
        self.tempVector.applyQuaternion(self.quaternion)
        self.controls.object.position.addScaledVector(
          self.tempVector,
          self.coord
            .copy(self.camera.position)
            .sub(self.controls.target)
            .length() * 0.03
        )
        self.controls.saveState()
        self.controls.update()
        self.player.rotation.y = self.controls.getAzimuthalAngle()
      }

      self.player.updateMatrixWorld()

      // adjust player position based on collisions
      const capsuleInfo = self.player.capsuleInfo
      self.tempBox.makeEmpty()
      self.tempMat.copy(self.activeCollider.matrixWorld).invert()
      self.tempSegment.copy(capsuleInfo.segment)

      // get the position of the capsule in the local space of the activeCollider
      self.tempSegment.start
        .applyMatrix4(self.player.matrixWorld)
        .applyMatrix4(self.tempMat)
      self.tempSegment.end
        .applyMatrix4(self.player.matrixWorld)
        .applyMatrix4(self.tempMat)

      // get the axis aligned bounding box of the capsule
      self.tempBox.expandByPoint(self.tempSegment.start)
      self.tempBox.expandByPoint(self.tempSegment.end)

      self.tempBox.min.addScalar(-capsuleInfo.radius)
      self.tempBox.max.addScalar(capsuleInfo.radius)

      self.activeCollider.geometry.boundsTree.shapecast({
        intersectsBounds: (box) => box.intersectsBox(self.tempBox),

        intersectsTriangle: (tri) => {
          // check if the triangle is intersecting the capsule and adjust the
          // capsule position if it is.
          const triPoint = self.tempVector
          const capsulePoint = self.tempVector2

          const distance = tri.closestPointToSegment(
            self.tempSegment,
            triPoint,
            capsulePoint
          )
          if (distance < capsuleInfo.radius) {
            const depth = capsuleInfo.radius - distance
            const direction = capsulePoint.sub(triPoint).normalize()

            self.tempSegment.start.addScaledVector(direction, depth)
            self.tempSegment.end.addScaledVector(direction, depth)
          }
        },
      })

      // get the adjusted position of the capsule activeCollider in world space after checking
      // triangle collisions and moving it. capsuleInfo.segment.start is assumed to be
      // the origin of the player model.
      const newPosition = self.tempVector
      newPosition
        .copy(self.tempSegment.start)
        .applyMatrix4(self.activeCollider.matrixWorld)

      // check how much the activeCollider was moved
      const deltaVector = self.tempVector2
      deltaVector.subVectors(newPosition, self.player.position)

      // if the player was primarily adjusted vertically we assume it's on something we should consider ground
      self.playerIsOnGround =
        deltaVector.y > Math.abs(delta * self.playerVelocity.y * 0.25)

      const offset = Math.max(0.0, deltaVector.length() - 1e-5)
      deltaVector.normalize().multiplyScalar(offset)

      // adjust the player model
      self.player.position.add(deltaVector)

      if (!self.playerIsOnGround) {
        deltaVector.normalize()
        self.playerVelocity.addScaledVector(
          deltaVector,
          -deltaVector.dot(self.playerVelocity)
        )
      } else {
        self.playerVelocity.set(0, 0, 0)
      }

      // adjust the camera
      // self.camera.position.sub(self.controls.target)
      // self.controls.target.copy(self.player.position)
      // self.camera.position.add(self.player.position)

      // self.controls.target.y += 0.0001 * Math.sin(delta)

      self.camera.position.copy(self.player.position)

      // if the player has fallen too far below the level reset their position to the start
      if (self.player.position.y < -100) {
        // self.player.position.copy({
        //   lookAtTarget: [3.3, 1.5, 32.1],
        //   cameraPositionOffset: [0, 1, 4],
        // })
        self.player.position.fromArray([0, 5, 0])
        self.playerVelocity.set(0, 0, 0)

        // this.reset({ position: [0, 3, 3], lookAtTarget: [0, 3, 3] })
      }
    },
  }
})

export { useMultiverse }
