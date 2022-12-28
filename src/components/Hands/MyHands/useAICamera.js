import { Object3D } from 'three140'
import create from 'zustand'

export const useAICamera = create((set, get) => {
  return {
    video: false,
    vTex: false,
    detector: false,

    setAIVidSrc: ({ video, vTex, detector }) => {
      set({ video, vTex, detector })
    },

    indexFingerTip: new Object3D(),
  }
})
