import { AppCodeFile } from '@/aws/AppCodeFile'
import { AppDev } from '@/aws/AppDev'
import { Modal, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'

export function ModulesList() {
  let app = useSnapshot(AppDev)

  let pack = AppDev.draft.appPackages.find(
    (pack) => pack.oid === app.activePackageID
  )

  let mod = pack?.modules?.find((e) => e.oid === app.activeModuleID)

  let appGroupID = AppDev.draft?.appGroupID
  let appVersionID = AppDev.draft?.oid

  let packageOID = pack?.oid
  let moduleOID = mod?.oid

  let content = app.appCodeFiles
    .filter((e) => e.packageOID === packageOID && e.moduleOID === moduleOID)
    .slice()
    .sort((a, b) => {
      if (a.fileName === 'index.js') {
        return -1000
      }

      if (a.fileName > b.fileName) {
        return 1
      }

      if (a.fileName <= b.fileName) {
        return -1
      }
      return 0
    })

  //
  useEffect(() => {
    if (moduleOID && appVersionID) {
      AppCodeFile.invalidate({ appVersionID: appVersionID }).then(() => {
        //
      })
    }
  }, [moduleOID, appVersionID])
  //
  return (
    <>
      {moduleOID && (
        <div className='overflow-scroll f-full'>
          <div className='m-2'>
            <div className='w-full px-2 py-2 text-xs text-center text-black bg-gray-200 rounded-lg'>
              {/*  */}
              <div className='mb-2'>
                {pack.packageName}/{mod.moduleName}
              </div>
              {/*  */}
              <button
                className='w-full px-5 py-2 text-white bg-blue-500 rounded-lg'
                onClick={() => {
                  //

                  AppCodeFile.create({
                    appGroupID,
                    appVersionID,
                    packageOID,
                    moduleOID,
                    fileName:
                      content.length === 0
                        ? 'index.js'
                        : `code-file-${content.length}.js`,
                    content: '',
                  }).then(() => {
                    AppCodeFile.invalidate({ appVersionID: AppDev.draft.oid })
                  })
                }}
              >
                + Code File
              </button>
            </div>
          </div>
          {/* <pre>{JSON.stringify(AppCodeFile.data, null, '  ')}</pre> */}

          {content.map((it) => {
            return (
              <div key={it.oid} className='px-2'>
                <OneFile file={it}></OneFile>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export function OneFile({ file }) {
  return (
    <>
      <div
        key={file.oid + '_file'}
        className='flex items-center justify-between w-full p-2 mb-2 bg-gray-200 rounded-lg'
      >
        <div>
          <Tooltip
            placement='right'
            title={
              <>
                <Rename file={file}></Rename>
                <Remove file={file}></Remove>
              </>
            }
          >
            <img
              className='h-6 ml-2 cursor-pointer hover:animate-spin'
              src={`/code-studio-ui/gear.svg`}
            ></img>
          </Tooltip>
        </div>
        <div
          className='inline-flex items-center justify-between cursor-pointer'
          onClick={() => {
            AppDev.activeFileID = file.oid
            AppDev.activeModuleID = file.moduleOID
            AppDev.activePackageID = file.packageOID
          }}
        >
          {file.fileName}
          <img
            className='h-5 ml-2'
            src={`/code-studio-ui/circle-arrow-right.svg`}
          ></img>
        </div>
      </div>
    </>
  )
}

function Rename({ file }) {
  //
  let [renamePop, openRename] = useState(false)
  let [fileName, setNewName] = useState(file.fileName)

  //

  let save = async () => {
    let item = AppDev.appCodeFiles.find((e) => e.oid === file.oid)
    item.fileName = fileName
    await AppCodeFile.update({ object: item })
    AppCodeFile.invalidate({ appVersionID: item.appVersionID })
  }
  return (
    <>
      <Modal
        onCancel={() => {
          openRename(false)
        }}
        //
        open={renamePop}
        title={`Rename this?`}
        footer={[]}
      >
        <input
          className='px-5 py-2 mr-1 text-black bg-green-100 rounded-lg'
          value={fileName}
          onChange={(ev) => {
            setNewName(ev.target.value)
          }}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              save()
            }
          }}
        ></input>
        <button
          className='p-2 text-white bg-blue-500 rounded-lg'
          onClick={async () => {
            save()

            //
            // let item = AppDev.draft.appPackages.find((e) => e.oid === ap.oid)
            // let myMod = item.modules.find((e) => e.oid === mo.oid)
            // myMod.fileName = fileName
            // openRename(false)
            // await AppDev.save({ object: AppDev.draft })
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

function Remove({ file }) {
  let [removePop, openRemove] = useState(false)

  return (
    <>
      <Modal
        onCancel={() => {
          openRemove(false)
        }}
        //
        open={removePop}
        title={`Remove this?`}
        footer={[]}
      >
        <button
          className='p-2 text-white bg-red-500 rounded-lg'
          onClick={async () => {
            // //

            let itemIDX = AppDev.appCodeFiles.findIndex(
              (e) => e.oid === file.oid
            )
            let item = AppDev.appCodeFiles.find((e) => e.oid === file.oid)
            await AppCodeFile.remove({ object: item })

            AppDev.appCodeFiles.splice(itemIDX, 1)

            // AppCodeFile.invalidate({ appVersionID: item.appVersionID })
          }}
        >
          Remove {`"${file.fileName}"`}
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
