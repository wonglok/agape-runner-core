import { AppDev } from '@/aws/AppDev'
import Editor from '@monaco-editor/react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useSnapshot } from 'valtio'

export function CodeEdtior() {
  useSnapshot(AppDev)

  //
  let file = AppDev.appCodeFiles.find((f) => f.oid === AppDev.activeFileID)

  function handleEditorValidation(markers) {
    markers.forEach((marker) => {
      console.log('onValidate:', marker.message)
    })
  }

  const editorRef = useRef(null)

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
    console.log(monaco)
  }

  // function showValue() {
  //   console.log(editorRef.current.getValue())
  // }

  let timeout = useRef(0)
  function handleEditorChange(value, event) {
    console.log('here is the current model value:', value, event)

    file.content = value

    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      AppDev.saveCodeFile({ object: file })
    }, 500)
  }

  useEffect(() => {
    let hh = (ev) => {
      if (ev.key === 's' && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault()
        AppDev.saveCodeFile({ object: file })
      }
    }

    window.addEventListener('keydown', hh)

    return () => {
      window.removeEventListener('keydown', hh)
    }
  }, [file])

  //
  return (
    <>
      {/*  */}
      {file && (
        <Editor
          height='100%'
          theme='vs-dark'
          path={file.oid}
          defaultLanguage={file.language || 'javascript'}
          defaultValue={file.content}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          onValidate={handleEditorValidation}
        ></Editor>
      )}
      {/*  */}
    </>
  )
}
