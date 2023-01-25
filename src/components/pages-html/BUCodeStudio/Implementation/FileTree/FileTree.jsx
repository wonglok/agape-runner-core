/* eslint-disable @next/next/no-img-element */
import { AppDev } from '@/aws/AppDev'
import { getID } from '@/lib/getID'
import { Button, Tooltip } from 'antd'
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
      <div className='flex items-center justify-between pr-1 bg-gray-100 group'>
        <select
          onChange={async (ev) => {
            AppDev.draft.appLoader = ev.target.value
            await AppDev.save({ object: AppDev.draft })
          }}
          defaultValue={AppDev.draft.appLoader}
          className='w-full py-2 pl-2 bg-transparent appearance-none focus:outline-none'
        >
          {appPackages.map((ap) => {
            return (
              <option className='' key={ap.oid} value={ap.packageName}>
                {ap.packageName}
              </option>
            )
          })}
        </select>
        <img
          className='h-6 group-hover:animate-pulse'
          src={'/code-studio-ui/circle-arrow-left.svg'}
          alt={'add'}
        ></img>
      </div>

      <div className='flex items-center justify-between pl-2 bg-gray-100 group'>
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
                packageName: getID(),
                modules: [],
              })
            }

            await AppDev.save({ object: AppDev.draft })
          }}
        >
          {/*  */}
          <img
            className='h-6 group-hover:animate-pulse'
            src={'/code-studio-ui/plus.svg'}
            alt={'add'}
          ></img>
        </div>
      </div>
      {appPackages.map((ap) => {
        return (
          <div
            key={ap.oid}
            className='flex items-center justify-between w-full h-8 pl-2'
          >
            <div className='w-full overflow-hidden'>
              <Tooltip
                placement='right'
                title={
                  <div>
                    <input
                      className='p-2 text-white focus:outline-none  '
                      style={{ backgroundColor: `transparent` }}
                      defaultValue={ap.packageName}
                      onInput={(ev) => {
                        let item = AppDev.draft.appPackages.find(
                          (e) => e.oid === ap.oid
                        )
                        if (item) {
                          item.packageName = ev.target.value
                        }
                      }}
                    ></input>
                  </div>
                }
              >
                <div className=' whitespace-pre'>{ap.packageName}</div>
              </Tooltip>
            </div>
          </div>
        )
      })}
    </>
  )
}
