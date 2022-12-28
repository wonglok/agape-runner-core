import { useEffect, useRef, useState } from 'react'
import { FrontSide, BackSide, DoubleSide, MeshPhysicalMaterial } from 'three'
import Pane from 'tweakpane'
import { ENFTexture } from './Fields/ENFTexture'
export function ENFCommon({ object }) {
  let material = object.material || new MeshPhysicalMaterial({})
  let refBasic = useRef()
  let [yo, setYo] = useState(0)
  useEffect(() => {
    //

    if (!material) {
      return
    }

    let pane = new Pane({
      container: refBasic.current,
      ttile: 'material-commons',
    })

    //
    let proxy = {
      get color() {
        return '#' + material.color.getHexString()
      },
      set color(v) {
        material.color = material.color || new Color(v)
        material.color.set(v)
      },
      get emissive() {
        return '#' + material.emissive.getHexString()
      },
      set emissive(v) {
        material.emissive = material.emissive || new Color(v)
        material.emissive.set(v)
      },
      get transmission() {
        return material.transmission || 0.0
      },
      set transmission(v) {
        material.transmission = v
      },
      get thickness() {
        return material.thickness || 0.0
      },
      set thickness(v) {
        material.thickness = v
      },
      get ior() {
        return material.ior || 0.0
      },
      set ior(v) {
        material.ior = v
      },
      get roughness() {
        return material.roughness || 0.5
      },
      set roughness(v) {
        material.roughness = v
      },
      get metalness() {
        return material.metalness || 0.0
      },
      set metalness(v) {
        material.metalness = v
      },
      get envMapIntenisty() {
        return material.envMapIntenisty || 1
      },
      set envMapIntenisty(v) {
        material.envMapIntenisty = v
      },
      get transparent() {
        if (!material) {
          return false
        }
        return material.transparent || false
      },
      set transparent(v) {
        material.transparent = v
      },
      get opacity() {
        return material.opacity
      },
      set opacity(v) {
        material.opacity = v
      },
      get side() {
        return material.side || FrontSide
      },
      set side(v) {
        material.side = v
      },
      get flatShading() {
        return material.flatShading || true
      },
      set flatShading(v) {
        material.flatShading = v
      },
    }
    //
    //

    pane.addInput(proxy, 'color')
    pane.addInput(proxy, 'emissive')
    pane.addInput(proxy, 'transparent')
    pane.addInput(proxy, 'opacity')
    pane.addInput(proxy, 'transmission')
    pane.addInput(proxy, 'thickness')
    pane.addInput(proxy, 'ior')
    pane.addInput(proxy, 'roughness')
    pane.addInput(proxy, 'metalness')

    pane.addInput(proxy, 'envMapIntenisty')

    pane.addInput(proxy, 'side', {
      options: {
        FrontSide,
        BackSide,
        DoubleSide,
      },
    })

    pane.addInput(proxy, 'flatShading', {
      options: {
        flat: true,
        smooth: false,
      },
    })

    {
      let btn = pane.addButton({ title: 'Upgrade to MeshPhysicalMaterial' })
      btn.on('click', () => {
        let old = object.material.clone()
        delete old.defines
        object.material = new MeshPhysicalMaterial({
          ...old,
          // opacity: 1,
          // transparent: true,
          // transmission: 1,
          // thickness: 10,
          // roughness: 0,
          // metalness: 0,
          // side: DoubleSide,
          // flatShading: false,
          map: old.map,
          emissiveMap: old.emissiveMap || null,
          normalMap: old.normalMap || null,
          roughnessMap: old.roughnessMap || null,
          metalnessMap: old.metalnessMap || null,
          transmissionMap: old.transmissionMap || null,
          bumpMap: old.bumpMap || null,
        })

        setYo((s) => s + 1)
      })
    }

    return () => {
      pane.dispose()
    }
  }, [material, yo, object])

  return (
    <div
      className='m-1 mt-2'
      onKeyDown={(ev) => {
        ev.stopPropagation()
      }}
    >
      <div className='mb-2'>{material?.name || 'Unknown'} </div>

      <div ref={refBasic}></div>
      <div className='w-1/2 mt-3'>
        <ENFTexture material={material} field={'map'}></ENFTexture>
        <ENFTexture material={material} field={'emissiveMap'}></ENFTexture>
        <ENFTexture material={material} field={'normalMap'}></ENFTexture>
        <ENFTexture material={material} field={'roughnessMap'}></ENFTexture>
        <ENFTexture material={material} field={'metalnessMap'}></ENFTexture>
      </div>
    </div>
  )
}

//

//

//
