import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Page() {
  return (
    <RedirGateHTML redirect='/code'>
      <div className='w-full h-full bg-gray-100'>123</div>
    </RedirGateHTML>
  )
}
