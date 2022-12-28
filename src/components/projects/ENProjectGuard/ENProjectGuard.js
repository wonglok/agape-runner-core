import { useGLBEditor } from '@/helpers/useGLBEditor'

export function ENProjectGuard({
  placeholder = null,
  loading = null,
  children,
}) {
  let activeGLBSplash = useGLBEditor((s) => s.activeGLBSplash)
  let activeGLBRawObject = useGLBEditor((s) => s.activeGLBRawObject)
  let activeGLBRuntimeObject = useGLBEditor((s) => s.activeGLBRuntimeObject)
  return (
    <>
      {activeGLBSplash === 'pick' && (
        <>
          <div className='relative w-full h-full'>{placeholder}</div>
        </>
      )}
      {activeGLBSplash === 'loading' && (
        <>
          <div className='relative w-full h-full'>{loading}</div>
        </>
      )}

      {activeGLBRawObject && activeGLBRuntimeObject && activeGLBSplash === ''
        ? children
        : null}
    </>
  )
}

//

//

//
