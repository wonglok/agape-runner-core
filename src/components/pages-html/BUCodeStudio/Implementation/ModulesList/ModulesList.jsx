import { AppDev } from '@/aws/AppDev'
import { Modal, Tooltip } from 'antd'
import { useSnapshot } from 'valtio'

export function ModulesList() {
  let app = useSnapshot(AppDev)

  let pack = AppDev.draft.appPackages.find(
    (pack) => pack.oid === app.activePackageID
  )

  let mod = pack?.modules?.find((e) => e.oid === app.activeModuleID)

  let appGroupID = AppDev.draft.appGroupID
  let appVersionID = AppDev.draft.oid

  let packageOID = pack?.oid
  let moduleOID = mod?.oid

  //
  return (
    <>
      {moduleOID && (
        <div>
          <div className='m-2'>
            <div
              className='w-full px-2 py-2 text-xs text-center text-black bg-gray-200 rounded-lg'
              onClick={() => {
                //
                /* */
                /* */
                //
              }}
            >
              <div className='mb-2'>
                {pack.packageName}/{mod.moduleName}
              </div>
              <button
                className='w-full px-5 py-2 text-white bg-blue-500 rounded-lg'
                onClick={() => {
                  //
                }}
              >
                + Code File
              </button>
            </div>
          </div>

          <div className='m-2 text-xs'>123</div>
          <div className='m-2 text-xs'>123</div>
          <div className='m-2 text-xs'>123</div>
        </div>
      )}
    </>
  )
}

export function OneModule({ ap, mo }) {
  return (
    <>
      <div
        key={mo.oid}
        className='flex items-center justify-between w-full p-2 mb-2 bg-gray-200 rounded-lg'
      >
        <div>
          <Tooltip
            placement='right'
            title={
              <>
                <Rename mo={mo} ap={ap}></Rename>
                <Remove mo={mo} ap={ap}></Remove>
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
            //
            AppDev.activePackageID = ap.oid
            AppDev.activeModuleID = mo.oid
          }}
        >
          {mo.moduleName}
          <img
            className='h-5 ml-2'
            src={`/code-studio-ui/circle-arrow-right.svg`}
          ></img>
        </div>
      </div>
    </>
  )
}

function Rename({ ap, mo }) {
  //
  let [renamePop, openRename] = useState(false)
  let [moduleName, setNewName] = useState(mo.moduleName)

  //
  return (
    <>
      <Modal
        onCancel={() => {
          openRename(false)
        }}
        //
        open={renamePop}
        title={`Rename this module?`}
        footer={[]}
      >
        <input
          className='px-5 py-2 mr-1 text-black bg-green-100 rounded-lg'
          value={moduleName}
          onChange={(ev) => {
            setNewName(ev.target.value)
          }}
        ></input>
        <button
          className='p-2 text-white bg-blue-500 rounded-lg'
          onClick={async () => {
            //
            let item = AppDev.draft.appPackages.find((e) => e.oid === ap.oid)
            let myMod = item.modules.find((e) => e.oid === mo.oid)
            myMod.moduleName = moduleName
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

function Remove({ ap, mo }) {
  let [removePop, openRemove] = useState(false)

  return (
    <>
      <Modal
        onCancel={() => {
          openRemove(false)
        }}
        //
        open={removePop}
        title={`Remove this module?`}
        footer={[]}
      >
        <button
          className='p-2 text-white bg-red-500 rounded-lg'
          onClick={async () => {
            //
            let item = AppDev.draft.appPackages.find((e) => e.oid === ap.oid)
            if (item) {
              let arr = item.modules
              arr.splice(
                arr.findIndex((e) => e.oid === ap.oid),
                1
              )
              openRemove(false)
              await AppDev.save({ object: AppDev.draft })
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
