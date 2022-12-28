function workDragToWindow() {
  let dragover = (e) => {
    // Prevent navigation.
    e.preventDefault()

    elem.style.background = '#3333ba'
  }
  elem.addEventListener('dragover', dragover)
  //
  let dragleave = (e) => {
    // Prevent navigation.
    e.preventDefault()

    elem.style.background = ''
  }
  elem.addEventListener('dragleave', dragleave)

  let drop = async (e) => {
    e.preventDefault()

    const fileHandlesPromises = [...e.dataTransfer.items]

    fileHandlesPromises.forEach(async (it) => {
      //
      let handle = await it.getAsFileSystemHandle()

      if (handle.kind === 'directory') {
        readFolderHandle({
          folder: handle,
          onFile: (ev) => {
            console.log(ev)
          },
        })
      } else {
        // let file = await handle.getFile()
        // console.log(file)
      }
    })

    // console.log(fileHandlesPromises)
  }
  elem.addEventListener('drop', drop)

  let click = async () => {
    let dirHandle = false
    try {
      const directoryHandle = await window.showDirectoryPicker()
      dirHandle = directoryHandle
    } catch (error) {
      console.log(error)
    }

    if (dirHandle) {
      readFolderHandle({
        folder: dirHandle,
        onFile: (ev) => {
          console.log(ev)
          // ev.itself.remove()
        },
      })
    }
  }
  elem.addEventListener('click', click)

  return () => {
    elem.removeEventListener('click', click)
    elem.removeEventListener('drop', drop)
    elem.removeEventListener('dragover', dragover)
    elem.removeEventListener('dragleave', dragleave)
  }
}

export function DragFolderToWindow() {
  //

  return (
    <>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </>
  )
}
