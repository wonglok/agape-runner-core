import { useAvatarForge } from '@/helpers/useAvatarForge'
import Dropzone from 'react-dropzone'

export function AvatarForge() {
  return (
    <div className='h-full'>
      {/*  */}
      {/*  */}
      <div>
        <AvatarGenerationButton></AvatarGenerationButton>
      </div>
      <div className='flex w-full h-full'>
        <AvatarZone></AvatarZone>
        <MotionZone></MotionZone>
      </div>
    </div>
  )
}

function AvatarGenerationButton() {
  let clips = useAvatarForge((s) => s.clips)
  let avatar = useAvatarForge((s) => s.avatar)
  let exportAvatar = useAvatarForge((s) => s.exportAvatar)
  //

  //
  return (
    <div className='h-full'>
      {clips && clips.length > 0 && avatar && (
        <>
          <button
            onClick={() => {
              //
              exportAvatar({
                avatar,
                clips,
                onDone: ({ url, blob, buffer }) => {
                  let ahr = document.createElement('a')
                  ahr.href = url
                  ahr.download = 'avatar' + '.glb'
                  ahr.click()
                },
              })
            }}
          >
            Download
          </button>
        </>
      )}
    </div>
  )
}

function MotionZone() {
  let setClipsByFiles = useAvatarForge((s) => s.setClipsByFiles)
  let clips = useAvatarForge((s) => s.clips)
  return (
    <div className='w-1/2 h-full'>
      <Dropzone
        onDrop={(acceptedFiles) => {
          let arr = []
          for (let kn in acceptedFiles) {
            arr[Number(kn)] = acceptedFiles[kn]
          }

          // .name.includes('.fbx')
          setClipsByFiles(arr.filter((e) => e))
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <>
            <div className='h-full' {...getRootProps()}>
              <input {...getInputProps()} />
              {!(clips && clips.length > 0) ? (
                <div className='h-full p-12 mb-2 mr-2 bg-gray-200'>
                  Drop Motion Files
                </div>
              ) : (
                <div className='h-full p-12 mb-2 mr-2 bg-gray-200'>
                  MotionZone
                  <br></br>
                  <ul>
                    {clips.map((e) => (
                      <li key={e.uuid + 'motionzone'}>{e.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </Dropzone>
    </div>
  )
}

function AvatarZone() {
  let setAvatarObjectByOneFBXFile = useAvatarForge(
    (s) => s.setAvatarObjectByOneFBXFile
  )
  let setAvatarObjectByOneFile = useAvatarForge(
    (s) => s.setAvatarObjectByOneFile
  )
  let avatar = useAvatarForge((s) => s.avatar)

  return (
    <div className='w-1/2 h-full'>
      <Dropzone
        onDrop={(acceptedFiles) => {
          let arr = []
          for (let kn in acceptedFiles) {
            arr[Number(kn)] = acceptedFiles[kn]
          }
          arr.filter((e) => e.name.includes('.glb'))

          if (arr[0]) {
            if (arr[0].name.includes('.fbx')) {
              setAvatarObjectByOneFBXFile(arr[0])
            } else {
              setAvatarObjectByOneFile(arr[0])
            }
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <>
            <div className='h-full' {...getRootProps()}>
              <input {...getInputProps()} />
              {!avatar ? (
                <div className='h-full p-12 mb-2 mr-2 bg-gray-200'>
                  Drop Avatar Files
                </div>
              ) : (
                <div className='h-full p-12 mb-2 mr-2 bg-gray-200'>
                  {avatar.name}
                </div>
              )}
            </div>
          </>
        )}
      </Dropzone>
    </div>
  )
}
