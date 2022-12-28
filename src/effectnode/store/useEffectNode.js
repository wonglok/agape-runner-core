import create from 'zustand'
import { get as getIDX, set as setIDX } from 'idb-keyval'
import { verifyPermission } from '@/components/projects/FileSystem/FileSystem'
import { nodeFrame } from 'three144/examples/jsm/renderers/webgl/nodes/WebGLNodes'

const NS_HDR = 'NS_HDR'

if (typeof window !== 'undefined') {
  let rAF = () => {
    requestAnimationFrame(rAF)
    nodeFrame.update()
  }
  requestAnimationFrame(rAF)
}

export const useEffectNode = create((set, get) => {
  //

  ///

  return {
    screenPass: false,
    setScreenPass: (v) => {
      set({ screenPass: v })
    },

    codes: [],
    setCodes: (v) => {
      set({ codes: v })
    },
    passArray: [],
    setPassArray: (v) => {
      set({ passArray: v })
    },

    hdrLink: false,
    initHDR: async () => {
      //
      let handle = await getIDX(NS_HDR)
      if (handle) {
        await verifyPermission(handle).catch((e) => {
          console.log(e)
        })

        let url = URL.createObjectURL(await handle.getFile())

        set({ hdrLink: url })
      }
    },
    setHDRLink: (v) => {
      set({ hdrLink: v })
    },
    setHDRHandle: (v) => {
      setIDX(NS_HDR, v)
    },

    //
  }
})
