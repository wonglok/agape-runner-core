export function Step({ active = () => {}, text }) {
  return (
    <div
      className={` my-3 inline-flex items-center justify-centertext-sm rounded-full overflow-hidden ${
        active() ? 'text-blue-600 bg-blue-200' : 'text-gray-500 bg-gray-300'
      }`}
    >
      <div className='flex'>
        <div className='w-10 h-10 mr-3 bg-gray-200 rounded-full rotate-45 scale-105 translate-x-0 translate-y-0'></div>
        <div className='py-2 pl-2 pr-5'>{text}</div>
      </div>
    </div>
  )
}
