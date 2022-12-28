import create from 'zustand'
//
export const useGLBHandle = create((set, get) => {
  //

  return {
    //
    activeGLBHandle: false,
    setGLBHandle: (v) => {
      set({ activeGLBHandle: v })
    },
    clearGLBHandle: (v) => {
      set({ activeGLBHandle: false })
    },
    //
  }
})
