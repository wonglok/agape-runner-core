import { sRGBEncoding } from 'three'
import { Color } from 'three'
import { Core } from './Core'

export const ConfigCanvas = {
  // mode: 'concurrent',
  // shadows: true,
  gl: { antialias: false },
  onCreated: (st) => {
    // st.scene.background = new Color('#ffffff')
    st.gl.physicallyCorrectLights = true
    st.gl.outputEncoding = sRGBEncoding
    // st.gl.shadowMap.enabled = true

    Core.now.canvas = Core.makeDisposableNode({ name: 'canvas' }).sub
    for (let kn in st) {
      Core.now.canvas.now[kn] = st[kn]
    }
    st.gl.setAnimationLoop(Core.work)
  },
}
