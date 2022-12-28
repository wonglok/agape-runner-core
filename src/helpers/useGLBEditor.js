import {
  provideProjects,
  saveProjects,
  verifyPermission,
} from '@/components/projects/FileSystem/FileSystem'
import {
  assignSignaturesToGLB,
  GlobalsEmptyObjects,
} from '@/effectnode/store/assignSignaturesToGLB'
import { Object3D } from 'three'
import {
  Clock,
  Mesh,
  MeshStandardMaterial,
  SphereBufferGeometry,
  Vector3,
} from 'three140'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

//.
import { WebIO } from '@gltf-transform/core'
import { DracoMeshCompression } from '@gltf-transform/extensions'

//
import create from 'zustand'
//
import { getID } from './getID'
import { useEffectNode } from '@/effectnode/store/useEffectNode'

let generateInside = (set, get) => {
  let curosrPoint = new Object3D()
  curosrPoint.userData.down = new Vector3()
  curosrPoint.userData.added = new Vector3()
  curosrPoint.userData.diff = new Vector3()

  // console.log('generateInside')
  return {
    multipleSelection: [],
    setMultipleSelection: (s) => {
      set({ multipleSelection: s })
    },
    enableSelect: true,
    outlineSearch: '',
    setOutlineSerach: (v) => {
      set({ outlineSearch: v })
    },
    propsTab: 'mat',
    setPropsTab: (v) => {
      set({ propsTab: v })
    },

    drawerSize: 175,
    setDrawerSize: (v) => {
      set({ drawerSize: v })
    },
    rightPaneWidth: 300,
    setRightPaneWidth: (v) => {
      set({ rightPaneWidth: v })
    },
    reloadGraphID: 0,
    refreshSystem: () => {
      set({ reloadGraphID: Math.random() })
    },
    orbit: false,
    setOrbit: (s) => {
      set({ orbit: s })
    },

    //
    getEffectNode: () => {
      return get().activeSceneSelection?.userData?.effectNode
    },
    getActiveNode: () => {
      let self = get()
      let effectNode = self.getEffectNode()

      let nodes = effectNode?.nodes || []
      return nodes?.find((e) => e._id === self.activeNodeID) || null
      //
    },

    paramsTab: 'uniforms',
    setParamsTab: (v) => {
      set({ paramsTab: v })
    },
    //
    addLink: ({ effectNode, link }) => {
      effectNode.connections.push(link)
    },
    removeNode: (node) => {
      let effectNode = get().getEffectNode()
      effectNode.nodes.splice(
        effectNode.nodes.findIndex((s) => s._id === node._id),
        1
      )
      get().refreshSystem()
      //
    },
    removeLink: (link) => {
      let effectNode = get().getEffectNode()

      effectNode.connections.splice(
        effectNode.connections.findIndex((s) => s._id === link._id),
        1
      )

      get().refreshSystem()
    },

    ///
    isDown: false,
    setDown: (isDown) => {
      set({ isDown })
    },

    //
    draggingIOID: false,
    setDraggingIOID: (v) => {
      set({ draggingIOID: v })
    },

    ///
    ///
    dragStartPos: new Vector3(),
    //,
    //,
    activeNodeID: '',
    setActiveNodeID: (id) => {
      set({ propsTab: 'node' })
      set({ activeNodeID: id })
    },

    addByPlacing: () => {
      //
      let self = get()
      let codeToAdd = self.codeToAdd
      let codeID = codeToAdd
      let activeSceneSelection = self.activeSceneSelection

      if (!activeSceneSelection) {
        return
      }

      let codes = useEffectNode.getState().codes //

      let effectNode = activeSceneSelection?.userData?.effectNode
      let code = codes.find((s) => s.title === codeID)

      code.loader().then(async (mod) => {
        let nodeID = getID()
        let _id = nodeID

        let customData = (await mod.nodeData({ defaultData: {}, nodeID })) || {}

        let newNode = {
          _id,
          nodeID,
          codeID,
          displayTitle: code.title,
          position: curosrPoint.position.toArray(),

          //
          inputs: [
            //
            { _id: getID(), type: 'input', nodeID },
            { _id: getID(), type: 'input', nodeID },
            { _id: getID(), type: 'input', nodeID },
          ],

          //
          outputs: [
            //
            { _id: getID(), type: 'output', nodeID },
            { _id: getID(), type: 'output', nodeID },
            { _id: getID(), type: 'output', nodeID },
          ],

          //
          uniforms: [
            {
              _id: getID(),
              nodeID,
              name: 'position',
              type: 'vec3',
              value: { x: 0, y: 0, z: 0 },
            },
            {
              _id: getID(),
              nodeID,
              name: 'rotation',
              type: 'vec3',
              value: { x: 0, y: 0, z: 0 },
            },
            {
              _id: getID(),
              nodeID,
              name: 'scale',
              type: 'vec3',
              value: { x: 1, y: 1, z: 1 },
            },
          ],

          ...customData,
        }
        effectNode.nodes.push(newNode)

        set({
          reloadGraphID: Math.random(),
          activeSceneSelection,
          cursorMode: 'ready',
        })
        window.dispatchEvent(
          new CustomEvent('reload-node', { detail: newNode })
        )

        setTimeout(() => {
          set({
            reloadGraphID: Math.random(),
          })
          window.dispatchEvent(
            new CustomEvent('reload-node', { detail: newNode })
          )
        }, 100)
      })
    },
    cursorMode: 'ready',
    setCurosrMode: (v) => {
      set({ cursorMode: v })
    },
    curosrPoint,

    //
    nodeDrag: false,
    setNodeDrag: (node) => {
      //
      set({ nodeDrag: node })
    },

    codeToAdd: '',
    selectCodeToAdd: ({ title }) => {
      set({ codeToAdd: title })
    },
    //
    overlayENGraph: '',
    setOverlayENGraph: (v) => {
      set({ overlayENGraph: v })
    },
    //
    controls: false,
    setControls: (c) => {
      set({ controls: c })
    },
    //
    activeSceneSelection: false,
    setSelection: (v) => {
      if (v?.userData) {
      }
      if (
        v.material?.type === 'MeshPhysicalMaterail' ||
        v.material?.type === 'MeshStandardMaterial'
      ) {
        set({ propsTab: 'mat' })
      }

      set({ activeSceneSelection: v })
    },
    // //
    // needsSaveFnc: () => {
    //   //
    // },
    needsSaveMsg: '',
    editorNavigationMode: false,
    activeGLBHandle: false,
    activeGLBRawObject: false,
    activeGLBRuntimeObject: false,
    activeGLBSplash: 'pick',
    openFile: async (handle, mode = 'floor') => {
      let self = get()
      let closeFile = self.closeFile
      let saveFile = self.saveFile
      // set({ activeGLBSplash: 'loading', overlayENGraph: '' })
      self.showSplash({ activeGLBSplash: 'loading' })
      if (self.activeGLBHandle) {
        await saveFile({
          handle: self.activeGLBHandle,
          runTimeGLB: self.activeGLBRuntimeObject,
          origGLB: self.activeGLBRawObject,
        })
      }

      let ans = await closeFile({})
      if (ans !== 'ok') {
        return
      }

      //
      //
      let file = await handle.getFile()
      let url1 = URL.createObjectURL(file)
      let url2 = URL.createObjectURL(file)
      let loadGLB = self.loadGLB

      let activeGLBRawObject = await loadGLB(url1, true)
      let activeGLBRuntimeObject = await loadGLB(url2, true)
      assignSignaturesToGLB(activeGLBRawObject)
      assignSignaturesToGLB(activeGLBRuntimeObject)
      //
      set({
        overlayENGraph: '',
        activeGLBSplash: '',
        editorNavigationMode: mode,
        activeGLBHandle: handle,
        activeGLBRawObject,
        activeGLBRuntimeObject,
      })

      setTimeout(() => {
        let objectFirst = activeGLBRuntimeObject.scene.getObjectByName(
          GlobalsEmptyObjects[0]
        )

        if (objectFirst.children) {
          set({ activeSceneSelection: objectFirst })
        }
      }, 10)
    },
    switchMode: (mode) => {
      set({
        editorNavigationMode: mode,
      })
    },
    showSplash: ({ activeGLBSplash }) => {
      set({ activeGLBSplash })
    },
    closeFile: async () => {
      // if (await get().needsSaveFnc()) {
      //   set({ needsSaveMsg: 'please save your file beofre exit!' })
      //   return 'bad'
      // }
      // set({ needsSaveMsg: '' })

      let update = {
        editorNavigationMode: false,
        activeSceneSelection: false,
        activeGLBHandle: false,
        activeGLBRawObject: false,
        activeGLBRuntimeObject: false,
      }

      set(update)

      return 'ok'
    },

    //
    reloadFiles: 0,
    projectFolders: [],
    currentFolder: false,

    permission: 'prompt',
    queryPermission: async (handle) => {
      let permission = await handle.queryPermission({ mode: 'readwrite' })
      set({ permission })
    },

    requestPermission: async (handle) => {
      let permission = await verifyPermission(handle, true)

      set({ permission })

      return permission
    },

    setCurrentFolder: (v) => {
      set({ currentFolder: v })
    },

    loadProjectFolder: async () => {
      let projects = await provideProjects()
      set({ projectFolders: projects })

      return projects
    },
    removeProjectFolderByID: async (uuid) => {
      let projects = await provideProjects()

      let idx = projects.findIndex((e) => e._id === uuid)
      projects.splice(idx, 1)

      set({ projectFolders: projects })
      await saveProjects(projects)
    },

    listFolderItem: async (handle) => {
      let arr = []

      for await (let item of handle.values()) {
        //
        if (item.name === '.DS_Store') {
          continue
        }

        arr.push({
          _id: handle.name + '/' + '-' + arr.length + item.name,
          handle: item,
        })
      }

      return arr
    },
    addProjectFolderHandle: async (handle) => {
      let projects = await provideProjects()
      projects.push({
        handle: handle,
        _id: getID(),
      })
      await saveProjects(projects)
    },

    uiClock: new Clock(false),
    lastTime: 0,
    resetTime: () => {
      set({ lastTime: 0 })
    },
    toggleRunning: () => {
      /** @type {Clock} */
      let uiClock = get().uiClock

      // console.log(uiClock.running)
      if (uiClock.running) {
        uiClock.stop()
        set({ lastTime: uiClock.getElapsedTime() })
      } else {
        uiClock.start()
        uiClock.elapsedTime = get().lastTime
      }
      set({ uiClock })
    },
    updateClockTime: (v) => {
      /** @type {Clock} */
      let uiClock = get().uiClock

      if (v <= 0) {
        v = 0
      }

      // console.log(uiClock.running)
      uiClock.elapsedTime = v
      set({ uiClock })
    },

    createWorkspaceFolder: async () => {
      let currentFolder = get().currentFolder

      if (!currentFolder?.handle) {
        return
      }

      let generative = await currentFolder?.handle.getDirectoryHandle(
        'generative',
        {
          create: true,
        }
      )

      let handle = await generative.getFileHandle('hello.en.glb', {
        create: true,
      })

      //
      await writeFile(
        handle,
        //
        await get().createEmptyGLBFileBuffer()
      )

      await currentFolder?.handle.getDirectoryHandle('export', {
        create: true,
      })

      let resources = await currentFolder?.handle.getDirectoryHandle(
        'resources',
        {
          create: true,
        }
      )

      await resources.getDirectoryHandle('glb', { create: true })
      await resources.getDirectoryHandle('hdr', { create: true })
      await resources.getDirectoryHandle('textures', { create: true })
      await resources.getDirectoryHandle('materials', { create: true })

      //
      return
    },
    //
    createEmptyGLBFileBuffer: async () => {
      let o3 = new Object3D()
      let resource = new Object3D()
      resource.add(
        new Mesh(
          new SphereBufferGeometry(1, 32, 32),
          new MeshStandardMaterial({ color: 'green' })
        )
      )
      o3.add(resource)

      return get().exportGLB(o3, [])
    },

    glbCache: new Map(),
    loadGLB: async (url, skipCache = false) => {
      let glbCache = get().glbCache
      if (glbCache.has(url) && !skipCache) {
        return await glbCache.get(url)
      }
      let loader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setWorkerLimit(32)
      dracoLoader.setDecoderPath('/draco/')
      loader.setDRACOLoader(dracoLoader)
      // loader.register((parser) => new GLTFEffectNodeLoader(parser))
      let prom = loader.loadAsync(url)
      if (!skipCache) {
        glbCache.set(url, prom)
      }
      let glb = await prom
      dracoLoader.dispose()
      return glb
    },
    //
    //
    exportGLB: (o3 = new Object3D(), animations = []) => {
      return new Promise((resolve, reject) => {
        let exporter = new GLTFExporter()

        // exporter.register((writer) => new GLTFEffectNodeExport(writer))
        exporter.parse(
          o3,
          (res) => {
            resolve(res)
          },
          (err) => {
            console.log(err)
            reject()
          },
          {
            // includeCustomExtensions: true,
            animations,
            trs: false,
            onlyVisible: false,
            binary: true,
          }
        )
        //
      })
    },
    saveFile: async ({ handle, runTimeGLB, origGLB }) => {
      // console.log('todo save file for glb')

      let clonedRuntime = clone(runTimeGLB.scene)
      // let clonedForExport = clone(origGLB.scene)

      // clonedRuntime.traverse((runtimeIt) => {
      //   if (runtimeIt.userData.effectNode) {
      //     clonedForExport.traverse((exportIt) => {
      //       if (exportIt.userData.posMD5 === runtimeIt.userData.posMD5) {
      //         exportIt.userData.effectNode = JSON.parse(
      //           JSON.stringify(runtimeIt.userData.effectNode)
      //         )
      //       }
      //     })
      //   }
      // })

      let removeList = []
      let actions = []
      clonedRuntime.traverse((it) => {
        if (it.userData.removeBeforeExport) {
          removeList.push(it)
        }
      })

      clonedRuntime.traverse((it) => {
        if (typeof it?.userData?.onBeforeExport === 'function') {
          actions.push(it.userData.onBeforeExport)
        }
      })

      await Promise.all(actions.map((e) => e())).catch(console.log)

      removeList.forEach((it) => {
        it.removeFromParent()
      })

      // let removeList = []

      // clonedRuntime.traverse((it) => {
      //   if (it.userData.removeBeforeExport) {
      //     removeList.push(it)
      //   }
      // })

      // removeList.forEach((it) => {
      //   it.removeFromParent()
      // })

      let animations = runTimeGLB.animations || []
      let rawGltf = await get().exportGLB(clonedRuntime.children, animations)

      // let dracoMod = await remoteImport('/draco/draco_encoder_raw.js')

      // const io = new WebIO({
      //   mode: 'cors',
      //   cache: 'no-cache',
      // })

      // let mod = dracoMod.DracoEncoderModule()
      // io.registerExtensions([DracoMeshCompression])
      // io.registerDependencies({
      //   // 'draco3d.decoder': await draco3d.createDecoderModule(), // Optional.
      //   'draco3d.encoder': mod, // Optional.
      // })

      // let glbDocument = await io.readBinary(new Uint8Array(rawGltf))

      // glbDocument
      //   .createExtension(DracoMeshCompression)
      //   .setRequired(true)
      //   .setEncoderOptions({
      //     method: DracoMeshCompression.EncoderMethod.SEQUENTIAL,
      //     encodeSpeed: 5,
      //     decodeSpeed: 5,
      //   })

      // io.setVertexLayout(VertexLayout.SEPARATE)

      // let newBin = await io.writeBinary(glbDocument)

      await writeFile(
        handle,
        new Blob([new Uint8Array(rawGltf)], {
          type: 'application/octet-stream',
        })
        // await get().createEmptyGLBFileBuffer()
      )
      return
    },
  }
}

export const useGLBEditor = create((set, get) => {
  return generateInside(set, get)
})

//

async function writeFile(fileHandle, contents) {
  const writable = await fileHandle.createWritable()
  await writable.write(contents)
  await writable.close()
}
