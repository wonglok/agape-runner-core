export function RightSide({ width = '225px' }) {
  return (
    <div className='h-full bg-white' style={{ width: width }}>
      <iframe src={'/admin/apps/run'}></iframe>
    </div>
  )
}
