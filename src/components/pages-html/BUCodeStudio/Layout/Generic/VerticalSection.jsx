export function VerticalSection({ border, height = '225px', children }) {
  return (
    <div
      className={`w-full border-cyan-800 ${border ? 'border-b' : ''}`}
      style={{ height: height }}
    >
      {children}
    </div>
  )
}
