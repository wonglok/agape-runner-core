import { useRouter } from 'next/router'

export default function AppGroup() {
  let router = useRouter()
  return (
    <div>
      <div>{router.query.appEntryID}</div>
    </div>
  )
}
