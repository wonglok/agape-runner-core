import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect, useRef } from 'react'
import { Clock } from 'three140'

export function ENTimeline() {
  /** @type {Clock} */
  let uiClock = useGLBEditor((s) => s.uiClock)
  let running = useGLBEditor((s) => s.uiClock.running)
  let toggleRunning = useGLBEditor((s) => s.toggleRunning)
  return (
    <div
      className='flex items-center justify-center w-full text-xs bg-gray-300 border-t border-gray-400'
      style={{ height: '54px' }}
    >
      <div
        style={{ width: '54px', minWidth: '54px', height: '54px' }}
        // className='flex items-center justify-center'
      >
        {' '}
        <div className='flex items-center justify-center w-full h-full'>
          {!running ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              onClick={() => {
                //
                toggleRunning()
              }}
            >
              <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              onClick={() => {
                //
                toggleRunning()
              }}
            >
              <path d='M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z' />
            </svg>
          )}
        </div>
      </div>
      <Track></Track>
    </div>
  )
}

//
// program.glb

function Track() {
  let timerRef = useRef()
  let cursorRef = useRef()
  let timerTextRef = useRef()
  let trackRef = useRef()

  let uiClock = useGLBEditor((s) => s.uiClock)
  let resetTime = useGLBEditor((s) => s.resetTime)
  let updateClockTime = useGLBEditor((s) => s.updateClockTime)

  //
  useEffect(() => {
    resetTime()

    //
    let rAFID = 0
    let rAF = () => {
      rAFID = requestAnimationFrame(rAF)

      let t = uiClock.getElapsedTime()

      cursorRef.current.style.left = `${t * (10).toFixed(0)}px`

      timerTextRef.current.innerText = t.toFixed(2).padStart(6, 0)

      if (timerRef.current) {
        timerRef.current.style.left = trackRef.current.scrollLeft + 12 + 'px'
      }
    }
    rAFID = requestAnimationFrame(rAF)

    return () => {
      cancelAnimationFrame(rAFID)
    }
  }, [])

  let isDown = useRef(false)

  useEffect(() => {
    let mouseup = () => {
      isDown.current = false
    }
    window.addEventListener('mouseup', mouseup)
    return () => {
      window.removeEventListener('mouseup', mouseup)
    }
  }, [])

  useEffect(() => {
    let mousemove = (ev) => {
      if (isDown.current) {
        let px = trackRef.current.scrollLeft + ev.pageX - 54
        updateClockTime(px / 10)
      }
    }
    window.addEventListener('mousemove', mousemove)
    return () => {
      window.removeEventListener('mousemove', mousemove)
    }
  }, [])

  useEffect(() => {
    //
    let wheel = (ev) => {
      if (trackRef?.current?.scrollLeft === 0 && ev.deltaX < 0) {
        ev.preventDefault()
        ev.stopPropagation()
        ev.stopImmediatePropagation()
      }
    }
    let dom = trackRef?.current
    if (!dom) {
      return
    }
    dom.addEventListener('wheel', wheel, { passive: false })

    return () => {
      dom.removeEventListener('wheel', wheel)
    }
  }, [])

  return (
    <div
      style={{ width: 'calc(100vw)', height: '54px' }}
      className='relative overflow-auto bg-gray-100'
      onClick={(ev) => {
        let px = trackRef.current.scrollLeft + ev.pageX - 54
        updateClockTime(px / 10)
      }}
      onMouseDown={() => {
        isDown.current = true
      }}
      ref={trackRef}
      // onMouseUp={() => {
      //   isDown.current = false
      // }}
      // onMouseMove={(ev) => {
      //   if (isDown.current) {
      //     let px = ev.pageX - 54
      //     updateClockTime(px / 10)
      //   }
      // }}
    >
      <div className='relative h-full' style={{ width: '1000000vw' }}>
        <div
          className='h-full bg-gray-800'
          ref={cursorRef}
          style={{
            position: 'absolute',
            top: '0px',
            width: '2px',
          }}
        ></div>
        <div
          className='absolute top-0 flex items-center justify-start'
          style={{ height: '54px' }}
          ref={timerRef}
        >
          <span className='inline-block w-12 h-4' ref={timerTextRef}></span>
          <span
            className='absolute inline-block'
            style={{ top: '20px', left: '45px' }}
          >
            s
          </span>
        </div>
      </div>
    </div>
  )
}
