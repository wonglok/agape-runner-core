import { GLSSR } from '@/helpers/GLSSR'
import { useScrollStore } from '@/helpers/useScrollStore'
import { useDetectGPU, useTexture } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import {
  Bloom,
  BrightnessContrast,
  ChromaticAberration,
  EffectComposer,
  HueSaturation,
  LUT,
  Noise,
  Scanline,
  SMAA,
  SSR,
  ToneMapping,
  Vignette,
  // Scanline,
  // ShockWave,
  // SMAA,
  // SSAO,
} from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'
// import { useControls } from 'leva'

export function EffectsLanding() {
  // let useSettings = useControls
  // if (process.env.NODE_ENV === 'production') {
  //   useSettings = (v) => v
  // }
  //
  let useSettings = (v) => v
  const texture = useLoader(LUTCubeLoader, '/lut/Chemical 168.CUBE')

  // const { hue, saturation } = useSettings({ hue: 0, saturation: 0.05 })
  const { offsetX, offsetY } = useSettings({ offsetX: 0.5, offsetY: 0.1 })

  let diff = 0.00233 * 0.75
  // // const diff = useScrollStore((s) => s.diff)
  // // console.log('offsetX, offsetY', offsetX, offsetY)
  // // console.log('hue, saturation', hue, saturation)
  // let props = {
  //   /** whether you want to use Temporal Resolving to re-use reflections from the last frames; this will reduce noise tremendously but may result in "smearing" */
  //   temporalResolve: true,
  //   /** a value between 0 and 1 to set how much the last frame's reflections should be blended in; higher values will result in less noisy reflections when moving the camera but a more smeary look */
  //   temporalResolveMix: 0.5,
  //   /** a value between 0 and 1 to set how much the reprojected reflection should be corrected; higher values will reduce smearing but will result in less flickering at reflection edges */
  //   temporalResolveCorrectionMix: 0.8,
  //   /** the maximum 1 of samples for reflections; settings it to 0 means unlimited samples; setting it to a value like 6 can help make camera movements less disruptive when calculating reflections */
  //   maxSamples: 0,
  //   /** whether to blur the reflections and blend these blurred reflections with the raw ones depending on the blurMix value */
  //   ENABLE_BLUR: true,
  //   /** how much the blurred reflections should be mixed with the raw reflections */
  //   blurMix: 0.5,
  //   /** the sharpness of the Bilateral Filter used to blur reflections */
  //   blurSharpness: 0.5,
  //   /** the kernel size of the Bilateral Blur Filter; higher kernel sizes will result in blurrier reflections with more artifacts */
  //   blurKernelSize: 4,
  //   /** how much the reflection ray should travel in each of its iteration; higher values will give deeper reflections but with more artifacts */
  //   rayStep: 5,
  //   /** the intensity of the reflections */
  //   intensity: 1,
  //   /** the maximum roughness a texel can have to have reflections calculated for it */
  //   maxRoughness: 1,
  //   /** whether jittering is enabled; jittering will randomly jitter the reflections resulting in a more noisy but overall more realistic look, enabling jittering can be expensive depending on the view angle */
  //   ENABLE_JITTERING: true,
  //   /** how intense jittering should be */
  //   jitter: 0.1,
  //   /** how much the jittered rays should be spread; higher values will give a rougher look regarding the reflections but are more expensive to compute with */
  //   jitterSpread: 0.1,
  //   /** how intense jittering should be in relation to a material's roughness */
  //   jitterRough: 0.1,
  //   /** the 1 of steps a reflection ray can maximally do to find an object it intersected (and thus reflects) */
  //   MAX_STEPS: 10,
  //   /** once we had our ray intersect something, we need to find the exact point in space it intersected and thus it reflects; this can be done through binary search with the given 1 of maximum steps */
  //   NUM_BINARY_SEARCH_STEPS: 5,
  //   /** the maximum depth difference between a ray and the particular depth at its screen position after refining with binary search; lower values will result in better performance */
  //   maxDepthDifference: 0.2,
  //   /** the maximum depth for which reflections will be calculated */
  //   maxDepth: 5,
  //   /** the maximum depth difference between a ray and the particular depth at its screen position before refining with binary search; lower values will result in better performance */
  //   thickness: 1,
  //   /** Index of Refraction, used for calculating fresnel; reflections tend to be more intense the steeper the angle between them and the viewer is, the ior parameter set how much the intensity varies */
  //   ior: 1.5,
  //   /** if there should still be reflections for rays for which a reflecting point couldn't be found; enabling this will result in stretched looking reflections which can look good or bad depending on the angle */
  //   STRETCH_MISSED_RAYS: true,
  //   /** WebGL2 only - whether to use multiple render targets when rendering the G-buffers (normals, depth and roughness); using them can improve performance as they will render all information to multiple buffers for each fragment in one run; this setting can't be changed during run-time */
  //   USE_MRT: false,
  //   /** if roughness maps should be taken account of when calculating reflections */
  //   USE_ROUGHNESSMAP: true,
  //   /** if normal maps should be taken account of when calculating reflections */
  //   USE_NORMALMAP: true,
  // }

  /**
   * Options of the SSR effect
   * @typedef {Object} SSROptions
   * @property {Number} [intensity] intensity of the reflections
   * @property {Number} [exponent] exponent by which reflections will be potentiated when composing the current frame's reflections and the accumulated reflections into a final reflection; higher values will make reflections clearer by highlighting darker spots less
   * @property {Number} [distance] maximum distance a reflection ray can travel to find what it reflects
   * @property {Number} [fade] how much reflections will fade out by distance
   * @property {Number} [roughnessFade] how intense reflections should be on rough spots; a higher value will make reflections fade out quicker on rough spots
   * @property {Number} [thickness] maximum depth difference between a ray and the particular depth at its screen position before refining with binary search; higher values will result in better performance
   * @property {Number} [ior] Index of Refraction, used for calculating fresnel; reflections tend to be more intense the steeper the angle between them and the viewer is, the ior parameter sets how much the intensity varies
   * @property {Number} [maxRoughness] maximum roughness a texel can have to have reflections calculated for it
   * @property {Number} [maxDepthDifference] maximum depth difference between a ray and the particular depth at its screen position after refining with binary search; higher values will result in better performance
   * @property {Number} [blend] a value between 0 and 1 to set how much the last frame's reflections should be blended in; higher values will result in less noisy reflections when moving the camera but a more smeary look
   * @property {boolean} [correction] how much pixels should be corrected when doing temporal resolving; higher values will result in less smearing but more noise
   * @property {boolean} [correctionRadius] how many surrounding pixels will be used for neighborhood clamping; a higher value can reduce noise when moving the camera but will result in less performance
   * @property {Number} [blur] how much the blurred reflections should be mixed with the raw reflections
   * @property {Number} [blurKernel] kernel size of the Box Blur Filter; higher kernel sizes will result in blurrier reflections with more artifacts
   * @property {Number} [blurSharpness] exponent of the Box Blur filter; higher values will result in more sharpness
   * @property {Number} [jitter] how intense jittering should be
   * @property {Number} [jitterRoughness] how intense jittering should be in relation to a material's roughness
   * @property {Number} [steps] number of steps a reflection ray can maximally do to find an object it intersected (and thus reflects)
   * @property {Number} [refineSteps] once we had our ray intersect something, we need to find the exact point in space it intersected and thus it reflects; this can be done through binary search with the given number of maximum steps
   * @property {boolean} [missedRays] if there should still be reflections for rays for which a reflecting point couldn't be found; enabling this will result in stretched looking reflections which can look good or bad depending on the angle
   * @property {boolean} [useNormalMap] if roughness maps should be taken account of when calculating reflections
   * @property {boolean} [useRoughnessMap] if normal maps should be taken account of when calculating reflections
   * @property {Number} [resolutionScale] resolution of the SSR effect, a resolution of 0.5 means the effect will be rendered at half resolution
   * @property {Number} [velocityResolutionScale] resolution of the velocity buffer, a resolution of 0.5 means velocity will be rendered at half resolution
   */
  let props = {
    intensity: 1,
    exponent: 1,
    distance: 10,
    fade: 0,
    roughnessFade: 1,
    thickness: 10,
    ior: 1.45,
    maxRoughness: 1,
    maxDepthDifference: 10,
    blend: 0.9,
    correction: 1,
    correctionRadius: 0.1,
    blur: 0.5,
    blurKernel: 1,
    blurSharpness: 10,
    jitter: 0,
    jitterRoughness: 0,
    steps: 20,
    refineSteps: 5,
    missedRays: true,
    useNormalMap: true,
    useRoughnessMap: true,
    resolutionScale: 1,
    velocityResolutionScale: 0.5,
  }

  // let invalidate = useThree((s) => s.invalidate)
  // let i = 0
  // useFrame(({ camera, clock }) => {
  //   invalidate()
  //   //
  //   let t = clock.getElapsedTime()
  //   // camera.rotation.x += 0.0002 * Math.sin(t * 1000)
  //   // camera.rotation.y += 0.0002 * Math.sin(t * 1000)
  //   // camera.rotation.z += 0.0002 * Math.sin(t * 1000)

  //   // camera.position.x += 0.0002 * Math.sin(t * 1000)
  //   // camera.position.y += 0.0002 * Math.sin(t * 1000)
  //   camera.position.z += 0.0001 * Math.sin(t * 1000000.1)
  // })

  //

  const GPUTier = useDetectGPU()

  //
  //

  return (
    <group>
      {GPUTier?.tier === 3 && (
        <EffectComposer disableNormalPass multisampling={3}>
          {/* <Noise opacity={1} premultiply={true}></Noise>
          <Noise opacity={0.5} premultiply={true}></Noise> */}
          {/* {!GPUTier.isMobile && GPUTier.tier >= 3 && (
          <GLSSR key={GLSSR.key}></GLSSR>
        )} */}

          {/* <SSR></SSR> */}

          {/* <Bloom
            intensity={2.5}
            mipmapBlur={true}
            radius={0.4}
            luminanceSmoothing={0.5}
            luminanceThreshold={0.2}
          ></Bloom> */}
          <Bloom
            intensity={3.5}
            mipmapBlur={true}
            radius={0.4}
            luminanceSmoothing={0.5}
            luminanceThreshold={0.2}
          ></Bloom>
          {/*
          <ChromaticAberration
            offset={[diff * offsetX, diff * offsetY]}
          ></ChromaticAberration> */}

          {/*
        <SMAA></SMAA> */}

          <Vignette opacity={0.85} darkness={1}></Vignette>

          {/* <Scanline></Scanline> */}

          {/* <BrightnessContrast
          brightness={0.07}
          contrast={0.2}
        ></BrightnessContrast>

        <HueSaturation hue={hue} saturation={saturation}></HueSaturation> */}

          {/* {<SSR key={'ssr'} {...props}></SSR>} */}

          {/* <LUT lut={texture}></LUT> */}

          {/* <ToneMapping
          adaptive={true} // toggle adaptive luminance map usage
          resolution={256} // texture resolution of the luminance map
          middleGrey={1.5} // middle grey factor
          maxLuminance={50.0} // maximum luminance
          averageLuminance={1.0} // average luminance
          adaptationRate={1.0} // luminance adaptation rate
        /> */}
        </EffectComposer>
      )}
    </group>
  )
}
