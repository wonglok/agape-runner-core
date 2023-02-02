import { AppDev } from '@/aws/AppDev'
// import { useEffect } from 'react'
import { useRef } from 'react'

export function RunWindow() {
  let ref = useRef()

  return (
    <div className='w-full h-full'>
      <div
        style={{ height: 'calc(30px)' }}
        className='flex items-center text-white bg-cyan-900'
      >
        <button
          className='ml-2 mr-2'
          onClick={() => {
            try {
              AppDev.buildCode().catch((e) => {
                console.log(e)
              })
            } catch (e) {
              console.log(e)
            }
          }}
        >
          Run Code 💨
        </button>
        <button
          className='mr-2'
          onClick={() => {
            ref.current.src = `/admin/apps/run?id=${encodeURIComponent(
              AppDev.draft.oid
            )}`
          }}
        >
          Reload ✨
        </button>

        <a
          href={`/admin/apps/open?id=${encodeURIComponent(AppDev.draft.oid)}`}
          referrerPolicy='no-referrer'
          target={'_blank'}
          rel='noreferrer'
        >
          <button>Open ✨</button>
        </a>
        {/* `/admin/apps/run?id=${encodeURIComponent(AppDev.draft.oid)}` */}
      </div>
      <iframe
        className='w-full '
        style={{ height: 'calc(100% - 30px)' }}
        ref={ref}
        onLoad={() => {
          setTimeout(() => {
            try {
              AppDev.buildCode().catch((e) => {
                console.log(e)
              })
            } catch (e) {
              console.log(e)
            }
          }, 500)
        }}
        src={`/admin/apps/run?id=${encodeURIComponent(AppDev.draft.oid)}`}
      ></iframe>
    </div>
  )
}
