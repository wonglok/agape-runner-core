import { useEffect } from 'react'
import { useState } from 'react'

export function DesktopOnly({ children }) {
  let [st, setST] = useState(children)
  //
  useEffect(() => {
    let desktop = (
      <>
        <div className='flex items-center justify-center w-full h-full p-12'>
          <div>
            <div className='mb-4'>
              Sorry Metaverse Editors and Portal are only avaialbe on Larger
              Screen
            </div>
            <div>
              <button className='p-2 px-12 bg-blue-200 rounded-full'>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </>
    )

    if (window.innerWidth <= 500) {
      setST(desktop)
    }
    let h = () => {
      if (window.innerWidth <= 500) {
        setST(desktop)
      } else {
        setST(children)
      }
    }
    window.addEventListener('resize', h)
    return () => {
      window.removeEventListener('resize', h)
    }
  }, [children])

  //
  return st
}
