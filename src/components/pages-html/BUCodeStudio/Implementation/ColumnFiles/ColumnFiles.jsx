import { useEffect, useRef } from 'react'
import { useState } from 'react'

export function ColumnFiles({ height = '200px' }) {
  let [next, setNext] = useState(null)
  let barRef = useRef()

  useEffect(() => {
    //
    let wheel = (ev) => {
      if (barRef?.current?.scrollLeft === 0 && ev.deltaX < 0) {
        ev.preventDefault()
        ev.stopPropagation()
        ev.stopImmediatePropagation()
      }
    }
    let dom = barRef?.current
    if (!dom) {
      return
    }
    dom.addEventListener('wheel', wheel, { passive: false })

    return () => {
      dom.removeEventListener('wheel', wheel)
    }
  }, [])

  return (
    <>
      <div
        className='relative h-full overflow-x-scroll border-t border-gray-300'
        ref={barRef}
      >
        <div className='flex' style={{ width: '100000vw', height: height }}>
          <ColumnOne
            onNext={(v) => {
              setNext(v)
            }}
          ></ColumnOne>
          {next}
        </div>
      </div>
    </>
  )
}

function ColumnOne({ onNext = () => {} }) {
  return (
    <>
      {/*  */}
      <div className='h-full bg-gray-200 w-44'>
        <div
          className=''
          onClick={() => {
            onNext(<NextFolder></NextFolder>)
          }}
        >
          File1 Button
        </div>
        <div
          className=''
          onClick={() => {
            onNext(<NextFolder></NextFolder>)
          }}
        >
          File2 Button
        </div>
      </div>
      {/*  */}
    </>
  )
}

function NextFolder({ parent }) {
  let [next, setNext] = useState(null)

  useEffect(() => {
    if (!parent) {
      setNext(false)
      return
    }
  }, [parent])
  return (
    <>
      <ColumnOne
        onNext={(newCompo) => {
          setNext(newCompo)
        }}
      ></ColumnOne>
      {/*  */}
      {/*  */}
      {next}
    </>
  )
}
