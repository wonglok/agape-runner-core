import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { PostProcCallers } from '@/effectnode/component/PostProcCallers'
import { screenOpacity } from '@/helpers/GLOverlayEffect'
import { UIContent } from '@/helpers/UIContent'
import { useMultiverse } from '@/helpers/useMultiverse'
import { useLoader, useThree } from '@react-three/fiber'
import anime from 'animejs'
import { useEffect, useRef, useState } from 'react'
import { PointerLockControls } from 'three-stdlib'
import { CrossHair } from './CrossHair'

export function PointerUserControls({ children }) {
  let setCamera = useMultiverse((s) => s.setCamera)
  let setControls = useMultiverse((s) => s.setControls)
  let camera = useThree((s) => s.camera)
  let gl = useThree((s) => s.gl)
  useEffect(() => {
    let controls = new PointerLockControls(camera, gl.domElement)

    let lock = function () {
      console.log('locked')
      let banners = document.querySelectorAll(`.gamebanner`)
      for (let i = 0; i < banners.length; i++) {
        //
        banners[i].classList.remove('hidden')
        banners[i].classList.add('flex')
      }
      let gamenu = document.querySelectorAll(`.gamenu`)
      for (let i = 0; i < gamenu.length; i++) {
        //
        gamenu[i].classList.remove('flex')
        gamenu[i].classList.add('hidden')
      }
    }

    let unlock = function () {
      console.log('unlocked')

      let banners = document.querySelectorAll(`.gamebanner`)
      for (let i = 0; i < banners.length; i++) {
        //
        banners[i].classList.add('hidden')
        banners[i].classList.remove('flex')
      }
      let gamenu = document.querySelectorAll(`.gamenu`)
      for (let i = 0; i < gamenu.length; i++) {
        //
        gamenu[i].classList.add('flex')
        gamenu[i].classList.remove('hidden')
      }
    }
    controls.addEventListener('unlock', unlock)
    controls.addEventListener('lock', lock)
    setCamera(camera)
    setControls(controls)

    return () => {
      controls.removeEventListener('unlock', unlock)
      controls.removeEventListener('lock', lock)
      controls.dispose()
    }
  }, [camera, gl.domElement, setCamera, setControls])

  return (
    <>
      <GUI></GUI>
    </>
  )
}

function GUI() {
  let mycontrols = useMultiverse((s) => s.controls)
  return (
    <>
      {mycontrols ? (
        <>
          <UIContent>
            <div className='fixed top-0 left-0 z-10  items-center justify-center hidden w-full gamebanner'>
              <div className='inline-block px-6 py-3 m-3 bg-white rounded-2xl'>
                <div className=' text-2xl text-center'>ESC Key to Exit</div>
                <div className=' text-xs text-center text-gray-500'>
                  ESC Key is at top left hand of the keyboard
                </div>
              </div>
            </div>

            <div className='fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full gamenu'>
              <div className='flex items-center justify-center w-64 h-64 bg-white rounded-3xl'>
                <div>
                  <button
                    className='p-3 mb-3 bg-gray-300 rounded-lg'
                    onClick={() => {
                      mycontrols.lock()
                    }}
                  >
                    Enter Game
                  </button>
                </div>
              </div>
            </div>
          </UIContent>
          <CrossHair></CrossHair>
        </>
      ) : null}
    </>
  )
}
