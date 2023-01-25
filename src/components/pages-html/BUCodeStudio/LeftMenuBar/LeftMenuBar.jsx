export function LeftMenuBar({ width = '225px' }) {
  return (
    <div
      className='h-full text-black bg-white border-r border-cyan-800'
      style={{ width: width }}
    >
      {`Pacakges -> Modules -> Files`}
    </div>
  )
}
