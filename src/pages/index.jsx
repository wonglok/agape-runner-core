// import {
//   DynamicPage,
//   getServerSidePropsForDynamicPage,
// } from '@/helpers/DynamicPage'

// export const getServerSideProps = getServerSidePropsForDynamicPage({
//   isIndex: true,
// })

// export default DynamicPage

// import { importNPM } from '@/components/servant/importPackages'
import {} from '@/components/servant/importPackages'

import { useRouter } from 'next/router'
// import { useEffect, useRef } from 'react'
// import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import RunLogic from './code/run'

export default function SlugPage() {
  let { query } = useRouter()

  let [outputs, setOutputs] = useState(false)

  useEffect(() => {
    //
    if (query && query.slug) {
    }

    setOutputs()
  }, [query])

  return <>{outputs && <RunLogic outputs={outputs}></RunLogic>}</>
}
