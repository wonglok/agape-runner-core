/* eslint-disable @next/next/no-img-element */
import { AppDev } from '@/aws/AppDev'
import { getID } from '@/lib/getID'
import { Collapse, Modal, Tooltip } from 'antd'
import { useState } from 'react'
import { useSnapshot } from 'valtio'
import { OneModule } from './OneModule'

export function FileTree() {
  let app = useSnapshot(AppDev)
  let [createPopup, openCreatePopup] = useState(false)
  let [packageName, setPackageName] = useState('my-new-module')
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
          value={packageName}
          onChange={(ev) => {
            setPackageName(ev.target.value)
          }}
        ></input>
        <button
          disabled={
            packageName === 'app-loader' ||
            app.draft.appPackages.find((e) => e.packageName === packageName)
          }
          className='px-5 py-2 text-white bg-green-500 rounded-lg disabled:bg-green-300 disabled:text-gray-300'
          onClick={async () => {
            //
            AppDev.draft.appPackages.push({
              oid: getID(),
              packageName: packageName,
              protected: false,
              modules: [
                {
                  oid: getID(),
                  moduleName: 'main',
                  protected: false,
                },
              ],
            })

            await AppDev.save({
              object: AppDev.draft,
            })
            openCreatePopup(false)
          }}
        >
          Create
        </button>
        {app.draft.appPackages.find((e) => e.packageName === packageName) && (
          <span className='p-2 text-red-500'>Name Taken</span>
        )}
        {packageName === 'app-loader' && (
          <span className='p-2 text-red-500'>Reseved name</span>
        )}
      </Modal>

      <div className='h-full'>
        {app.draft && (
          <>
            <div
              style={{ height: '50px' }}
              className='flex items-center justify-center px-2 bg-white cursor-pointer group'
              onClick={async () => {
                //
                if (AppDev.draft.appPackages.length == 0) {
                  AppDev.draft.appPackages.push({
                    oid: getID(),
                    packageName: 'app-loader',
                    protected: true,
                    modules: [
                      {
                        oid: getID(),
                        moduleName: 'main',
                        protected: true,
                        files: [],
                      },
                    ],
                  })
                  await AppDev.save({
                    object: AppDev.draft,
                  })
                } else {
                  openCreatePopup(true)
                }
              }}
            >
              <button
                className='w-full px-5 py-2 text-white bg-blue-500 rounded-lg'
                onClick={() => {
                  //
                  // openCreateModule(true)
                }}
              >
                + Package
              </button>
              {/* <div className='text-center'>Create Package</div>
              <div className='px-1 py-1 cursor-auto'>
                <img
                  className='h-6 group-hover:animate-pulse'
                  src={'/code-studio-ui/plus.svg'}
                  alt={'add'}
                ></img>
              </div> */}
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
      <div className='' style={{ height: 'calc(100% - 50px)' }}>
        <div className='h-full px-2 overflow-scroll overflow-x-hidden'>
          <Collapse style={{ padding: '0px' }} accordion>
            {appPackages.map((ap) => {
              return (
                <>
                  <Collapse.Panel
                    header={
                      <div className='flex items-center justify-between overflow-hidden'>
                        {ap.packageName}

                        <div>
                          <Tooltip
                            placement={'right'}
                            title={
                              <>
                                <Rename ap={ap}></Rename>
                                <Remove ap={ap}></Remove>
                              </>
                            }
                          >
                            <img
                              className='h-6 ml-2 cursor-pointer hover:animate-spin'
                              src={`/code-studio-ui/gear.svg`}
                            ></img>
                          </Tooltip>
                        </div>
                      </div>
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
  return (
    <>
      <div className='-m-2'>
        <div className='flex items-center justify-between w-full'>
          <CreateModule ap={ap}></CreateModule>
        </div>

        <div className='flex flex-col items-end mt-3'>
          {ap.modules.map((mo) => {
            return <OneModule key={mo.oid} ap={ap} mo={mo}></OneModule>
          })}
        </div>
      </div>
    </>
  )
}

function CreateModule({ ap }) {
  let [renamePop, openCreateModule] = useState(false)
  let [moduleName, setModuleName] = useState('my-new-mod')
  return (
    <>
      <Modal
        onCancel={() => {
          openCreateModule(false)
        }}
        //
        open={renamePop}
        title={`CreateModule this package?`}
        footer={[]}
      >
        <input
          className='px-5 py-2 mr-1 text-black bg-green-100 rounded-lg'
          value={moduleName}
          onChange={(ev) => {
            setModuleName(ev.target.value)
          }}
        ></input>
        <button
          className='p-2 text-white bg-blue-500 rounded-lg'
          onClick={async () => {
            //
            let item = AppDev.draft.appPackages.find((e) => e.oid === ap.oid)
            if (item) {
              item.modules = item.modules || []
              item.modules.push({
                oid: getID(),
                moduleName: moduleName,
                protected: false,
              })
            }

            openCreateModule(false)
            await AppDev.save({ object: AppDev.draft })
          }}
        >
          Create Module
        </button>
      </Modal>

      <button
        className='w-full px-5 py-2 text-white bg-blue-500 rounded-lg'
        onClick={() => {
          //
          openCreateModule(true)
        }}
      >
        + Module
      </button>
    </>
  )
}

function Rename({ ap }) {
  let [renamePop, openRename] = useState(false)
  let [packageName, setPackageName] = useState(ap.packageName)
  return (
    <>
      <Modal
        onCancel={() => {
          openRename(false)
        }}
        //
        open={renamePop}
        title={`Rename this package?`}
        footer={[]}
      >
        <input
          className='px-5 py-2 mr-1 text-black bg-green-100 rounded-lg'
          value={packageName}
          onChange={(ev) => {
            setPackageName(ev.target.value)
          }}
        ></input>
        <button
          className='p-2 text-white bg-blue-500 rounded-lg'
          onClick={async () => {
            //
            let item = AppDev.draft.appPackages.find((e) => e.oid === ap.oid)
            item.packageName = packageName
            openRename(false)
            await AppDev.save({ object: AppDev.draft })
          }}
        >
          Rename
        </button>
      </Modal>

      <button
        className='px-3 py-1 mr-2 text-white bg-blue-500 rounded-lg'
        onClick={() => {
          //
          openRename(true)
        }}
      >
        Rename
      </button>
    </>
  )
}

function Remove({ ap }) {
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
            openRemove(false)
            await AppDev.save({ object: AppDev.draft })
          }}
        >
          Remove Package
        </button>
      </Modal>

      <button
        className='px-3 py-1 text-white bg-red-500 rounded-lg'
        onClick={() => {
          //
          openRemove(true)
        }}
      >
        Remove
      </button>
    </>
  )
}
