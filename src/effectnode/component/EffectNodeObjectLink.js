import { useEffect } from 'react'

export function EffectNodeObjectLink({ link, on, emit }) {
  useEffect(() => {
    return on(link.output._id, (data) => {
      emit(link.input._id, data)
    })
  }, [on, emit, link])
  return <></>
}
