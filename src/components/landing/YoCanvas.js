import { Core } from '@/helpers/Core'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three144'
import { Totem } from './Totem'

let useLoop = function (fnc) {
  useEffect(() => {
    let rAFID = 0
    let rAF = () => {
      rAFID = requestAnimationFrame(rAF)
      fnc()
    }
    rAFID = requestAnimationFrame(rAF)
    return () => {
      cancelAnimationFrame(rAFID)
    }
  })
}

export function YoCanvas() {
  //
  let ref = useRef()
  let con = useRef()
  let st = useRef()

  let setupIsInViewport = (elem) => {
    let bounding = elem.getBoundingClientRect()

    return () => {
      bounding = elem.getBoundingClientRect()

      let inside =
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth)

      return inside
    }
  }

  useEffect(() => {
    let gl = new WebGLRenderer({ canvas: ref.current, alpha: true })
    let v2 = new Vector2()

    v2.x = con.current.getBoundingClientRect().width
    gl.setSize(v2.x, v2.x, true)
    gl.setPixelRatio(window.devicePixelRatio || 1.0)

    let scene = new Scene()
    let camera = new PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.z = 34
    camera.lookAt(0, 0, 0)
    //
    st.current = {
      gl,
      scene,
      camera,
      inViewPort: setupIsInViewport(con.current),
    }

    if (!Core.now.canvas) {
      Core.now.canvas = Core.makeDisposableNode({ name: 'YoCanvas' }).sub

      Core.now.canvas.now.scene = scene
      Core.now.canvas.now.gl = gl
      Core.now.canvas.now.camera = camera
    }

    let vortex = new Totem({ gl })
    scene.add(vortex)

    return () => {
      Core.now.canvas = false
      gl.dispose()
    }
  }, [])

  //
  useLoop(() => {
    //

    if (st.current && st.current.inViewPort()) {
      //
      let { gl, scene, camera } = st.current

      //
      gl.render(scene, camera)

      // if (window.innerWidth <= 767) {
      //   if (st.current.counter <= 100) {
      //     gl.render(scene, camera)
      //     st.current.counter += 1.0
      //   }
      // } else {
      // }
    }
    // renderer.current?.render()
  })
  return (
    <div ref={con} className='bg-black bg-opacity-70'>
      <canvas className='w-full rounded-t-lg' ref={ref}></canvas>
    </div>
  )
}
