export function Step({ active = () => {}, text }) {
  return (
    <div
      className={` cursor-auto text-sm my-3 inline-flex items-center justify-centertext-sm  overflow-hidden`}
    >
      <div
        className={`flex ${
          active() ? 'text-blue-600 bg-blue-200' : 'text-gray-500 bg-gray-300'
        }`}
      >
        <div className='py-2 pl-7 pr-7'>{text}</div>
      </div>
      <div
        className={`w-7 h-7 rotate-45 -translate-x-3 translate-y-0  ${
          active() ? 'text-blue-600 bg-blue-200' : 'text-gray-500 bg-gray-300'
        }`}
      ></div>
    </div>
  )
}
