export function RightSide({ width = '225px' }) {
  return (
    <div className='h-full bg-white' style={{ width: width }}>
      <iframe className='w-full h-full' src={'/admin/apps/run'}></iframe>
    </div>
  )
}
