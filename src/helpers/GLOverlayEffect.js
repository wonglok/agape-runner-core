import React, { forwardRef, useMemo } from 'react'
import { Effect } from 'postprocessing'
import { Uniform } from 'three'
import { BlendFunction } from 'postprocessing'

const fragmentShader = `
uniform float opacity;
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
	outputColor = vec4((opacity) * (inputColor.rgb), inputColor.a);
}
`

export const screenOpacity = new Uniform(1)

export class CustomEffect extends Effect {
  constructor({}) {
    super('CustomEffect', fragmentShader, {
      blendFunction: BlendFunction.Normal,
      uniforms: new Map([['opacity', screenOpacity]]),
    })
  }
}

//

// Effect component
export const GLOverlayEffect = forwardRef(function EffectFuncy({}, ref) {
  const effect = useMemo(() => new CustomEffect({}), [])
  return <primitive ref={ref} object={effect} />
})

//
//

//
//

//
//

// const SSR = /*#__PURE__*/ forwardRef(function SSR(_ref, ref) {
//   let { ENABLE_BLUR = true, USE_MRT = true, ...props } = _ref
//   const { invalidate } = useThree()
//   const { scene, camera } = useContext(EffectComposerContext)
//   const effect = useMemo(
//     () =>
//       new SSREffect(scene, camera, {
//         ENABLE_BLUR,
//         USE_MRT,
//         ...props,
//       }),
//     [SSREffect, scene, camera, ENABLE_BLUR, USE_MRT]
//   )
//   useLayoutEffect(() => {
//     Object.keys(props).forEach((key) => (effect[key] = props[key]))
//     invalidate()
//   }, [props])
//   const api = useContext(selectionContext)
//   useEffect(() => {
//     if (api && api.enabled) {
//       var _api$selected
//       if ((_api$selected = api.selected) != null && _api$selected.length) {
//         effect.selection.set(api.selected)
//         invalidate()
//         return () => {
//           effect.selection.clear()
//           invalidate()
//         }
//       }
//     }
//   }, [api])
//   return /*#__PURE__*/ React.createElement('primitive', {
//     ref: ref,
//     object: effect,
//   })
// })
//
//
//
//
