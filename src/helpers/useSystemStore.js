import create from 'zustand'
// import Router from 'next/router'
// import { LoadingContent } from './LoadingContent'

const useSystemStore = create((set, get) => {
  return {
    router: null,
    setRouter: (v) => {
      set({ router: v })
    },
    overlayReactContent: <></>,
    setOverlayReactContent: (v) => set({ overlayReactContent: v }),

    // changePage: (page) => {
    //   Router.prefetch(`/page2`).then(() => {
    //     Router.router.push('/page2')
    //   })

    //   let { setOverlayReactContent } = get()
    //   setOverlayReactContent(
    //     <LoadingContent
    //       onHide={() => {
    //         setOverlayReactContent(null)
    //       }}
    //     ></LoadingContent>
    //   )
    // },
  }
})

export { useSystemStore }
