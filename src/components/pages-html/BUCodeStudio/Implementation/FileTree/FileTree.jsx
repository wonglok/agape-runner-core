/* eslint-disable @next/next/no-img-element */
import { AppDev } from '@/aws/AppDev'
import { getID } from '@/lib/getID'
import { Collapse, Modal, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { OneModule } from './OneModule'
import { AppCodeFile } from '@/aws/AppCodeFile'

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
            openCreatePopup(false)

            await AppDev.save({
              object: AppDev.draft,
            })
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

            <div className='px-2' style={{ height: '50px' }}>
              <ImportButton></ImportButton>
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

  useEffect(() => {
    if (!AppDev.activePackageID) {
      AppDev.activePackageID = app.draft?.appPackages[0]?.oid
      AppDev.activeModuleID = app.draft.appPackages[0]?.modules[0]?.oid
      AppDev.activeFileID = app.appCodeFiles.find(
        (e) => e.fileName === 'index.js'
      )?.oid
    }
  }, [app])
  return (
    <>
      {/*  */}
      {/*  */}
      {/*  */}

      {/*  */}
      <div className='' style={{ height: 'calc(100% - 50px)' }}>
        <div className='h-full px-2 overflow-scroll overflow-x-hidden'>
          <Collapse style={{ padding: '0px' }} accordion>
            {appPackages.map((ap, idx) => {
              return (
                <Collapse.Panel
                  key={ap.oid + idx + ap.packageName}
                  header={
                    <div
                      onClick={() => {}}
                      className='flex items-center justify-between overflow-hidden'
                    >
                      {ap.packageName}

                      <div>
                        <Tooltip
                          placement={'right'}
                          title={
                            <>
                              <ExportButton ap={ap}></ExportButton>
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
                >
                  <OnePackage ap={ap}></OnePackage>
                </Collapse.Panel>
              )
            })}
          </Collapse>
        </div>
      </div>
    </>
  )
}

function ExportButton({ ap }) {
  return (
    <div className='block w-full mb-2'>
      <button
        className='w-full px-2 py-1 text-white bg-purple-500 rounded-lg'
        onClick={() => {
          // let originalPackage = JSON.parse(JSON.stringify(ap))
          /** @type {ap} */
          let clonePackage = JSON.parse(JSON.stringify(ap))

          let files = JSON.parse(JSON.stringify(AppDev.appCodeFiles)).filter(
            (e) => {
              return (
                ap.oid === e.packageOID &&
                ap.modules.some((mo) => {
                  return mo.oid === e.moduleOID
                })
              )
            }
          )

          let payload = {
            codePackage: clonePackage,
            codeFiles: files,
          }

          let url = URL.createObjectURL(new Blob([JSON.stringify(payload)]))

          let an = document.createElement('a')
          an.download = clonePackage.packageName + '.json'
          an.target = '_blank'
          an.href = url
          an.click()
        }}
      >
        Export Package
      </button>
    </div>
  )
}

function ImportButton({}) {
  return (
    <div className='block w-full h-full mb-2'>
      <button
        className='w-full px-2 py-2 text-white bg-purple-500 rounded-lg disabled:opacity-50'
        onClick={(ev) => {
          let input = document.createElement('input')
          input.type = 'file'
          input.onchange = ({
            target: {
              files: [first],
            },
          }) => {
            if (first) {
              //
              let reader = new FileReader()
              reader.onload = async () => {
                try {
                  let json = JSON.parse(reader.result)

                  let appGroupID = AppDev.draft.appGroupID
                  let appVersionID = AppDev.draft.oid

                  let codePackage = json.codePackage
                  let codeFiles = json.codeFiles

                  // // let originalPackage = JSON.parse(JSON.stringify(ap))
                  // /** @type {ap} */
                  let map = new Map()

                  let setKey = (key) => {
                    map.set(key, getID())
                    return map.get(key)
                  }
                  let getKey = (key) => {
                    return map.get(key)
                  }

                  codePackage.packageName = 'i_' + codePackage.packageName
                  codePackage.oid = setKey(codePackage.oid)
                  codePackage.modules.forEach((mod) => {
                    mod.oid = setKey(mod.oid)
                  })

                  ev.target.disabled = true

                  AppDev.draft.appPackages.push(codePackage)

                  let total = codeFiles.length
                  let inc = 0
                  for (let file of codeFiles) {
                    ev.target.innerText = `Import Package ${(
                      (inc / total) *
                      100
                    ).toFixed(0)}%`

                    await new Promise((r) => {
                      setTimeout(r, 100)
                    })

                    file.appGroupID = appGroupID
                    file.appVersionID = appVersionID

                    file.oid = setKey(file.oid)
                    file.packageOID = getKey(file.packageOID)
                    file.moduleOID = getKey(file.moduleOID)

                    await AppCodeFile.create(file)

                    await new Promise((r) => {
                      setTimeout(r, 100)
                    })

                    inc++
                  }

                  ev.target.innerText = `Finishing up....`

                  await new Promise((r) => {
                    setTimeout(r, 100)
                  })

                  await AppDev.save({ object: AppDev.draft }).then(
                    (packgeSaved) => {
                      console.log(packgeSaved)
                    }
                  )

                  ev.target.innerText = `Done!`

                  setTimeout(() => {
                    ev.target.innerText = `Import Package`

                    AppCodeFile.invalidate({ appVersionID }).then(() => {
                      try {
                        AppDev.buildCode().catch((e) => {
                          console.log(e)
                        })
                      } catch (e) {
                        console.log(e)
                      }
                    })
                  }, 1000)

                  console.log('done')

                  //
                  //

                  //
                } catch (e) {
                  console.log(e)
                } finally {
                  ev.target.disabled = false
                }
              }
              reader.readAsText(first, 'utf8')
            }
          }
          input.click()
        }}
      >
        Import Package
      </button>
    </div>
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
            AppDev.activeFileID = ''
            let apOID = ap.oid

            let arr = AppDev.draft.appPackages
            arr.splice(
              arr.findIndex((e) => e.oid === apOID),
              1
            )

            openRemove(false)

            await AppDev.save({ object: AppDev.draft })

            let files = AppCodeFile.data

            for (let file of files) {
              if (file && file.packageOID === apOID) {
                await AppCodeFile.remove({ object: file })
              }
            }
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
