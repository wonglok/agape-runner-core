/* eslint-disable @next/next/no-img-element */
import { AppDev } from '@/aws/AppDev'
import { getID } from '@/lib/getID'
import { Collapse, Modal, Tooltip } from 'antd'
import { useState } from 'react'
import { useSnapshot } from 'valtio'

export function FileTree() {
  let app = useSnapshot(AppDev)

  return (
    <>
      <div className='h-full'>
        {app.draft && (
          <>
            <div
              style={{ height: '40px' }}
              className='flex items-center justify-center pl-2 bg-white border-b border-blue-600 cursor-pointer group'
              onClick={async () => {
                //

                let getModules = () => {
                  let mods = [
                    {
                      oid: getID(),
                      moduleName: 'main',
                      protected: true,
                      files: [],
                    },
                  ]
                  return mods
                }

                if (AppDev.draft.appPackages.length == 0) {
                  AppDev.draft.appPackages.push({
                    oid: getID(),
                    packageName: 'app-loader',
                    protected: true,
                    modules: getModules(),
                  })
                } else {
                  AppDev.draft.appPackages.push({
                    oid: getID(),
                    packageName: getID(),
                    protected: false,
                    modules: getModules(),
                  })
                }

                await AppDev.save({ object: AppDev.draft })
              }}
            >
              <div className='text-center'>Create Package</div>
              <div className='px-1 py-1 cursor-auto'>
                <img
                  className='h-6 group-hover:animate-pulse'
                  src={'/code-studio-ui/plus.svg'}
                  alt={'add'}
                ></img>
              </div>
            </div>

            <MyPakcages></MyPakcages>
          </>
        )}
      </div>
    </>
  )
}

function MyPakcages({}) {
  let app = useSnapshot(AppDev)
  let appPackages = app.draft.appPackages || []

  return (
    <>
      {/*  */}
      {/*  */}
      {/*  */}

      {/*  */}
      <div className='' style={{ height: 'calc(100% - 40px)' }}>
        <div className='h-full p-1 overflow-scroll overflow-x-hidden'>
          <Collapse style={{ padding: '0px' }} accordion>
            {appPackages.map((ap) => {
              return (
                <>
                  <Collapse.Panel
                    header={
                      <div className='overflow-hidden'>{ap.packageName}</div>
                    }
                    key={ap.oid}
                  >
                    <OnePackage ap={ap}></OnePackage>
                  </Collapse.Panel>
                </>
              )
            })}
          </Collapse>
        </div>
      </div>
    </>
  )
}

function OnePackage({ ap }) {
  let [removePop, openRemove] = useState(false)

  return (
    <>
      <Modal
        onCancel={() => {
          openRemove(false)
        }}
        //
        open={removePop}
        title={`Remove this package?`}
        footer={[]}
      >
        <button
          className='p-2 text-white bg-red-500 rounded-lg'
          onClick={async () => {
            //
            let arr = AppDev.draft.appPackages
            arr.splice(
              arr.findIndex((e) => e.oid === ap.oid),
              1
            )
            await AppDev.save({ object: AppDev.draft })
          }}
        >
          Remove Package
        </button>
      </Modal>

      <div>
        {!ap.protected && (
          <button
            className='px-3 py-1 text-white bg-red-500 rounded-lg'
            onClick={() => {
              //
              openRemove(true)
            }}
          >
            Remove Package
          </button>
        )}
        <Collapse style={{ padding: '0px' }} accordion>
          {ap.modules.map((mo) => {
            return (
              <>
                <Collapse.Panel
                  header={
                    <div className='overflow-hidden'>{mo.moduleName}</div>
                  }
                  key={mo.oid}
                >
                  <p>{JSON.stringify(mo.modules)}</p>
                </Collapse.Panel>
              </>
            )
          })}
        </Collapse>
      </div>
    </>
  )
}
