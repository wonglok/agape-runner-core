import { AppDev } from '@/aws/AppDev'
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useSnapshot } from 'valtio'
import copy from 'copy-to-clipboard'

export function CodeEdtior() {
  useSnapshot(AppDev)

  let file = AppDev.appCodeFiles
    .filter((e) => {
      return AppDev.activeFileID && e && e.oid
    })
    .find((f) => f.oid === AppDev.activeFileID)

  function handleEditorValidation(markers) {
    markers.forEach((marker) => {
      console.log('onValidate:', marker.message)
    })
  }

  const editorRef = useRef(null)

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
    // console.log(monaco)
  }

  // function showValue() {
  //   console.log(editorRef.current.getValue())
  // }

  let [msg, setMessage] = useState('')

  function handleEditorChange(value, event) {
    // console.log('here is the current model value:', value, event)

    file.content = value

    setMessage('dirty')
  }

  useEffect(() => {
    let hh = (ev) => {
      if (ev.key === 's' && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault()
        setMessage('loading')
        AppDev.saveCodeFile({ object: file }).then(() => {
          setMessage('done')
          setTimeout(() => {
            setMessage('')
          }, 1000)
        })
      }
    }

    window.addEventListener('keydown', hh)

    return () => {
      window.removeEventListener('keydown', hh)
    }
  }, [file])

  let getExt = (file) => {
    let name = 'javascript'

    if (file.fileName.includes('.json')) {
      name = 'json'
    }

    return name
  }

  let myPackage = AppDev.draft.appPackages.find(
    (e) => e.oid === file?.packageOID
  )
  let moduleName = '' + Math.random()
  if (myPackage) {
    let mod = myPackage.modules.find((e) => e.oid === file.moduleOID)
    if (mod) {
      moduleName = mod.moduleName
    }
  }
  //
  return (
    <>
      {/*  */}
      {file && (
        <>
          <div
            className={
              'flex items-center justify-center text-center text-white ' +
              `bg-teal-800`
            }
            style={{ height: '30px' }}
          >
            {msg === '' && (
              <>
                <span className='mr-1'>{`package:`}</span>
                <span className='mr-1'>{`${myPackage?.packageName}`}</span>
                <span className='mr-1'>{`/`}</span>
                <span className='mr-1'>{`${moduleName}`}</span>
                <span className='mr-1'>{`/`}</span>
                <span className='mr-1'>{`${file?.fileName}`}</span>

                <span
                  className=' cursor-pointer'
                  onClick={(ev) => {
                    //
                    copy(
                      `import { } from 'package:${myPackage?.packageName}/${moduleName}/${file?.fileName}'`
                    )

                    ev.target.innerText = `🔗 Copied!`

                    setTimeout(() => {
                      ev.target.innerText = `🔗 `
                    }, 1000)
                  }}
                >
                  🔗
                </span>
              </>
            )}
            {msg === 'dirty' && ` 💾 Needs to save...`}
            {msg === 'loading' && ` 🌩️ Saving...`}
            {msg === 'done' && ` 👌🏻 Done...`}
          </div>
          <Editor
            height='calc(100% - 30px)'
            theme='vs-dark'
            path={file.oid}
            defaultLanguage={getExt(file) || 'javascript'}
            defaultValue={file.content}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
            onValidate={handleEditorValidation}
          ></Editor>
        </>
      )}
      {/*  */}
    </>
  )
}
