import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

export function UIContent({ children, className }) {
  useEffect(() => {
    let clean = () => {}
    let tttt = setInterval(() => {
      let doc = document.querySelector('#myroot')
      if (doc) {
        clearInterval(tttt)
        let div = document.createElement('span')
        doc.appendChild(div)
        div.className = className || ''
        let root = createRoot(div)
        root.render(children)
        clean = () => {
          root.render(null)
          div.remove()
        }
      }
    })

    return () => {
      clean()
    }
  }, [children, className])

  return null
}
