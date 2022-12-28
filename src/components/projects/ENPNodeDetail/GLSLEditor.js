import { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'

export function GLSLEditor({
  initValue,
  lang = 'glsl',
  onSave = () => {},
  onChange = () => {},
  children,
}) {
  let ref = useRef()

  const editorRef = useRef(null)

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
  }

  // function showValue() {
  //   alert(editorRef.current.getValue())
  // }

  function handleEditorChange(value, event) {
    onChange(value)
    // console.log('here is the current model value:', value, event)
  }

  useEffect(() => {
    let hh = (ev) => {
      // console.log(ev)

      if (ev.composed) {
        if (ev.metaKey && ev.code === 'KeyS') {
          ev.preventDefault()

          onSave(editorRef.current.getValue())
        }
      }
    }
    window.addEventListener('keydown', hh)
    return () => {
      window.removeEventListener('keydown', hh)
    }
  }, [])

  let keyyy = useRef('yoooo')

  return (
    <div ref={ref} className='relative w-full h-full'>
      {/* <button onClick={showValue}>Show value</button> */}

      <Editor
        key={keyyy.current}
        height='100%'
        defaultLanguage={lang}
        theme='vs-dark'
        defaultValue={initValue}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        // beforeMount={handleEditorWillMount}
        // onValidate={handleEditorValidation}
      />

      {children}
    </div>
  )
}
