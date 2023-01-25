/* eslint-disable @next/next/no-img-element */
import { AppDev } from '@/aws/AppDev'
import { getID } from '@/lib/getID'
import { useSnapshot } from 'valtio'

export function FileTree() {
  let app = useSnapshot(AppDev)
  let dev = app?.draft

  return (
    <>
      {dev && (
        <>
          <MyPakcages dev={dev}></MyPakcages>
        </>
      )}
    </>
  )
}

function MyPakcages({ dev }) {
  let appPackages = dev.appPackages

  return (
    <>
      <div className='flex items-center justify-between p-1 pl-2 bg-gray-100'>
        <select
          onChange={async (ev) => {
            AppDev.draft.appLoader = ev.target.value
            await AppDev.save({ object: AppDev.draft })
          }}
          defaultValue={AppDev.draft.appLoader}
          className='w-full h-6 '
        >
          {appPackages.map((ap) => {
            return (
              <option className='p-1' key={ap.oid} value={ap.packageName}>
                {ap.packageName}
              </option>
            )
          })}
        </select>
      </div>

      <div className='flex items-center justify-between pl-2 bg-gray-100'>
        <div>Packages</div>
        <div
          className='px-1 py-1 cursor-auto'
          onClick={async () => {
            //

            if (AppDev.draft.appPackages.length == 0) {
              AppDev.draft.appPackages.push({
                oid: getID(),
                packageName: 'app-loader',
                modules: [],
              })
            } else {
              AppDev.draft.appPackages.push({
                oid: getID(),
                packageName: 'content-package',
                modules: [],
              })
            }

            await AppDev.save({ object: AppDev.draft })

            //
            //
          }}
        >
          {/*  */}
          <img
            className='h-6'
            src={'/code-studio-ui/plus.svg'}
            alt={'add'}
          ></img>
        </div>
      </div>
      {appPackages.map((ap) => {
        return (
          <div
            key={ap.oid}
            className='flex items-center justify-between w-full h-8'
          >
            <div>{ap.packageName}</div>
            <div></div>
          </div>
        )
      })}
    </>
  )
}
