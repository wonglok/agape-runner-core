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

  let getEl = () => barRef.current

  return (
    <>
      <div
        className='relative h-full overflow-x-scroll overflow-y-hidden border-t border-gray-200'
        ref={barRef}
      >
        <div
          className='flex h-full'
          style={{ width: '100000vw', height: height }}
        >
          <ColumnOne
            getEl={getEl}
            onNext={(compo) => {
              setNext(compo)
            }}
            level={0}
          ></ColumnOne>
          {next}
        </div>
      </div>
    </>
  )
}

function ColumnOne({ getEl, onNext = () => {}, level }) {
  return (
    <>
      {/*  */}
      <div className='h-full overflow-y-auto ' style={{ width: '225px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
          return (
            <div
              key={i}
              className={`w-full border-r border-cyan-800`}
              onClick={() => {
                let scrollLeft = (level + 2) * 225 - getEl().clientWidth

                if (scrollLeft > 0) {
                  getEl().scrollLeft = scrollLeft
                } else {
                  getEl().scrollLeft = 0
                }

                onNext(
                  <NextFolder getEl={getEl} level={level + 1}></NextFolder>
                )
              }}
            >
              File {i} Button {Math.random().toFixed(2)}
            </div>
          )
        })}
      </div>
      {/*  */}
    </>
  )
}

function NextFolder({ getEl, level }) {
  let [next, setNext] = useState(null)

  // useEffect(() => {
  //   if (!parent) {
  //     setNext(false)
  //     return
  //   }
  // }, [parent])
  return (
    <>
      <ColumnOne
        level={level}
        getEl={getEl}
        onNext={(compo) => {
          setNext(compo)
        }}
      ></ColumnOne>
      {/*  */}
      {/*  */}
      {next}
    </>
  )
}
