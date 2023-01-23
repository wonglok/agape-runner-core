import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { BUCodeRunner } from '@/components/pages-html/BUCodeStudio/BUCodeRunner'

export default function SlugPage() {
  //
  let { query } = useRouter()

  let [outputs, setOutputs] = useState(false)

  useEffect(() => {
    if (query && query.slug) {
      //
      let slugString = query.slug.join('/')

      console.log(slugString)
    }
  }, [query])

  return <>{outputs && <BUCodeRunner outputs={outputs}></BUCodeRunner>}</>
}
