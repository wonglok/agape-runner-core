import { useEffect, useRef } from 'react'
import Pane from 'tweakpane'
export function ENFObject({ object }) {
  let refBasic = useRef()

  useEffect(() => {
    //

    let pane = new Pane({
      container: refBasic.current,
      ttile: 'object-properties',
    })
    let proxy = {
      //
      // get color() {
      //   return '#' + material.color.getHexString()
      // },
      // set color(v) {
      //   material.color = material.color || new Color(v)
      //   material.color.set(v)
      // },
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
    pane.addInput(object, 'position').on('change', () => {
      window.dispatchEvent(new CustomEvent('useTranslate', { detail: {} }))
    })
    pane.addInput(object, 'rotation').on('change', () => {
      window.dispatchEvent(new CustomEvent('useRotation', { detail: {} }))
    })
    pane.addInput(object, 'scale').on('change', () => {
      window.dispatchEvent(new CustomEvent('useScale', { detail: {} }))
    })

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
      <div className='mb-2'>{object?.name || 'object'}</div>
      <div ref={refBasic}></div>
    </div>
  )
}

//

//

//
