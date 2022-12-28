import { useEffect, useRef } from 'react'
import Pane from 'tweakpane'
export function ENFLightPt({ object }) {
  let refBasic = useRef()

  useEffect(() => {
    //

    let pane = new Pane({
      container: refBasic.current,
      ttile: 'object-properties',
    })
    let proxy = {
      //
      get color() {
        return '#' + object.color.getHexString()
      },
      set color(v) {
        object.color = object.color || new Color(v)
        object.color.set(v)
      },
      // get emissive() {
      //   return '#' + material.emissive.getHexString()
      // },
      // set emissive(v) {
      //   material.emissive = material.emissive || new Color(v)
      //   material.emissive.set(v)
      // },
      //
    }

    //
    pane.addInput(object, 'intensity')
    pane.addInput(object, 'decay')
    pane.addInput(proxy, 'color')

    //
    let t = setInterval(() => {
      pane.refresh()
    })
    return () => {
      clearInterval(t)
      pane.dispose()
    }
  }, [object])

  //
  return (
    <div
      onKeyDown={(ev) => {
        ev.stopPropagation()
      }}
      className='m-1 mr-5'
    >
      <div className='mb-2'>Lighting Props</div>
      {/* <div className='mb-2'>{object?.name || 'PointLight'}</div> */}
      <div ref={refBasic}></div>
    </div>
  )
}

//

//

//
