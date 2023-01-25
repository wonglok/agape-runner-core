/* eslint-disable @next/next/no-img-element */
import { AppDev } from '@/aws/AppDev'
import { getID } from '@/lib/getID'
import { Collapse, Modal, Tooltip } from 'antd'
import { useState } from 'react'
import { useSnapshot } from 'valtio'

export function FileTree() {
  let app = useSnapshot(AppDev)
  let [createPopup, openCreatePopup] = useState(false)
  let [name, setName] = useState('my-new-module')
  return (
    <>
      <Modal
        onCancel={() => {
          openCreatePopup(false)
        }}
        open={createPopup}
        title={`Create a new Package?`}
        footer={[]}
      >
        <input
          className='px-5 py-2 mr-1 text-black bg-green-100 rounded-lg'
          value={name}
          onChange={(ev) => {
            setName(ev.target.value)
          }}
        ></input>
        <button
          className='px-5 py-2 text-white bg-green-500 rounded-lg'
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
                packageName: name,
                protected: false,
                modules: getModules(),
              })
            }

            openCreatePopup(false)
            await AppDev.save({ object: AppDev.draft })
          }}
        >
          Create a new Package
        </button>
      </Modal>

      <div className='h-full'>
        {app.draft && (
          <>
            <div
              style={{ height: '40px' }}
              className='flex items-center justify-center pl-2 bg-white border-b border-blue-600 cursor-pointer group'
              onClick={async () => {
                //
                openCreatePopup(true)
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
        <div className='h-full p-2 overflow-scroll overflow-x-hidden'>
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

      <div className='-m-2'>
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
