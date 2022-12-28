//
export function ImportBtnArrayBuffer({
  text = ' Import',
  onDone = (v) => console.log(v),
}) {
  return (
    <span
      onClick={() => {
        //
        let picker = document.createElement('input')

        picker.type = 'file'
        picker.onchange = async (ev) => {
          //
          if (ev.target.files && ev.target.files[0]) {
            let first = ev.target.files[0]
            if (first) {
              let ar = await first.arrayBuffer()

              onDone({ arrayBuffer: ar })
              //
            }
          }
        }
        picker.click()
      }}
    >
      {text}
    </span>
  )
}

//
