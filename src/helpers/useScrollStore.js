import { Clock, MathUtils } from 'three'
import { Vector2 } from 'three140'
import create from 'zustand'
export const useScrollStore = create((set, get) => {
  let clock = new Clock()
  setInterval(() => {
    let dt = clock.getDelta()
    let px = get().px
    let smoothPX = get().smoothPX
    smoothPX = MathUtils.damp(smoothPX, px, 1, dt)

    set({ smoothPX })
  })
  return {
    smooth: 0,
    scroll: 0,
    diff: 0,
    px: 0,
    total: 1,
    rotationX: 0,
    rotationY: 0,

    smoothPX: 0,
    setSmooth: (now, dt, px = 0, total = 1) => {
      let smooth = get().smooth

      let ll = MathUtils.damp(smooth, now, 2, dt)

      console.log(ll)

      set({ smooth: ll, diff: ll - smooth, px, px, total })
    },
  }
})

export const useReady = create((set, get) => {
  return {
    loading: false,
    setLoading: (v) => {
      set({ loading: v })
    },
  }
})
