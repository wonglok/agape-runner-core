import { Core } from '@/helpers/Core'
import { useScrollStore } from '@/helpers/useScrollStore'
import { Plane, ScreenQuad } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { DoubleSide } from 'three'
import { PlaneBufferGeometry } from 'three144'
import { AlphaPass } from './AlphaPass'
import { ArrowDown } from './ArrowDown'
import { ContactUs } from './ContactUs'
import ContactUsForm from './ContactUsForm'
import { CreateWorldTogether } from './CreateWorldTogetehr'
import { EnterGame } from './EnterGame'
// import { KickStarter } from './Kickstarter'
import { StarEditor } from './StarEditor'
import { YoCanvas } from './YoCanvas'

/* eslint-disable @next/next/no-img-element */
export function HtmlHeader() {
  let [height, setHeight] = useState(1024)
  useEffect(() => {
    let hh = () => {
      setHeight(window.innerHeight)
    }
    hh()
    window.addEventListener('resize', hh)
    return () => {
      window.removeEventListener('resize', hh)
    }
  })
  let time = { value: 0 }

  setInterval(() => {
    time.value = performance.now() / 1000
  })

  //
  return (
    <>
      <div>
        <div
          className='fixed top-0 left-0 z-50 flex items-center justify-between w-full p-3 bg-black bg-opacity-40'
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.0) 100%)`,
          }}
        >
          <div className='flex-col items-start justify-start hidden w-1/3 lg:flex'>
            {/*  */}
            {/* <KickStarter></KickStarter>
            <AlphaPass></AlphaPass> */}
            <img
              src={`/site/navbar/agape.png`}
              className='w-full ml-8 lg:w-64'
            />
          </div>
          <div className='flex items-start justify-start pt-2 pl-3 lg:p-3 lg:items-center lg:justify-center lg:w-1/3'></div>
          {/*  */}
          {/*  */}
          {/*  */}
          <div className='flex flex-col items-end justify-end w-1/2 pt-4 pr-3 lg:w-1/3'>
            <ContactUs></ContactUs>
            <a href={`/project`} target='_blank' rel='noreferrer'>
              <StarEditor></StarEditor>
            </a>
            <a
              className='hidden mt-3 lg:block'
              href={`/game`}
              target='_blank'
              rel='noreferrer'
            >
              <EnterGame></EnterGame>
            </a>
          </div>
        </div>

        <section
          className='relative flex items-center h-screen pt-16 bg-black header bg-opacity-0'
          style={{
            background: `rgb(0,0,0)`,
            background: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.0) 41%, rgba(0,0,0,0.0) 80%, rgba(0,0,0,0) 100%)`,
            // backgroundImage: `linear-gradient(180deg, rgba(0,0,0,1.0), rgba(0,0,0,0.3))`,
            minHeight: '100vh',
            height: `calc(${height - 0}px)`,
          }}
        ></section>
        <div className=' absolute bottom-0 left-0 flex items-center justify-center w-full mb-3 text-center text-white'>
          <div className=' flex items-center justify-center mb-12'>
            <div className=' flex flex-col items-center justify-center'>
              <IconLoader height={height}>
                <CreateWorldTogether></CreateWorldTogether>
              </IconLoader>
            </div>
          </div>
        </div>
        <div className='h-32'></div>
        <div
          style={{
            height: '195px',
          }}
          className='overflow-hidden overflow-x-hidden'
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.7)',
              height: '200px',
              transform:
                'skew(23deg, 20deg) scale(2.5) rotate(158deg) translateY(-100px)',
            }}
          ></div>
        </div>

        <section
          className='relative flex items-start  bg-black header bg-opacity-0'
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.7) 0%,
            rgba(0,0,0,0.7) 16%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.7) 100%)`,
          }}
        >
          <div className='container flex flex-wrap  items-center justify-center mx-auto mt-0'>
            <div className='w-10/12 -mt-96'>
              <div className='px-6 mt-12 text-center sm:pt-0'>
                <div className='flex flex-col items-center justify-between text-white group lg:flex-row'>
                  <div className='p-3'>
                    <div
                      className='p-3 text-xl'
                      style={{ textShadow: 'black 1px 0px 10px' }}
                    >
                      Unreal Engine
                    </div>
                    <video
                      playsInline
                      className='h-full border-4 border-black  transition-all duration-200 hover:scale-150'
                      style={{ height: '300px' }}
                      muted
                      autoPlay
                      loop
                      src={`/video/unreal.mp4`}
                    ></video>
                  </div>
                  <div className='p-3'>
                    <a
                      target={'_blank'}
                      href={`https://cadillac.agape.effectnode.com/`}
                      rel='noreferrer'
                    >
                      <div
                        className='p-3 text-xl '
                        style={{ textShadow: 'black 1px 0px 10px' }}
                      >
                        Agape Engine
                      </div>
                      <video
                        playsInline
                        muted
                        style={{ height: '300px' }}
                        className='h-full border-4 border-black  transition-all duration-200 hover:scale-150'
                        autoPlay
                        loop
                        src={`/video/web.mp4`}
                      ></video>
                    </a>
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-center justify-start '>
                <ArrowDown></ArrowDown>
              </div>
              {/* <div className='flex flex-col items-center justify-center pb-8'>
                <img src={`/site/hero/unreal.png`} alt={'title'} />
              </div> */}
              {/* <div className='flex flex-col items-center justify-center pb-8'>
                <img
                  src={`/site/hero/allow_you_to_create.png`}
                  alt={'allow_you_to_create'}
                />
              </div> */}
              {/* <div className='flex flex-col items-center justify-center pb-24'>
                <img
                  src={`/site/hero/3d_assets_metaverse.png`}
                  alt={'allow_you_to_create'}
                />
              </div> */}
              {/* <div className='flex flex-col items-center justify-center pb-64'>
                <img src={`/site/hero/cta.png`} alt={'allow_you_to_create'} />
              </div> */}

              {/*  */}
            </div>
          </div>
        </section>
        <section className='relative pb-40  bg-black bg-opacity-70'>
          <div className='container mx-auto'>
            <div className='flex flex-wrap items-center'>
              <div className='w-10/12 mt-32 ml-auto mr-auto lg:px-12 md:w-6/12 lg:w-4/12 md:px-4'>
                {/* <Parallax> */}
                <div className='relative flex flex-col w-full min-w-0 mb-6 break-words border-4 border-pink-600 rounded-lg shadow-lg'>
                  <div className='w-full align-middle  rounded-t-lg'>
                    <Canvas
                      onCreated={(st) => {
                        let size = st.size
                        st.gl.setSize(size.width, 300)
                        st.camera.position.z = 1
                      }}
                    >
                      <Plane args={[3, 3]}>
                        <shaderMaterial
                          side={DoubleSide}
                          uniforms={{ time }}
                          key={Math.random()}
                          vertexShader={`
                            varying vec2 vUv;
                            void main (void) {
                              vUv = uv;
                              gl_Position = vec4(position, 1.0);
                            }
                          `}
                          fragmentShader={`
                            varying vec2 vUv;

                              uniform float time;

                              const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

                              float noise( in vec2 p ) {
                                return sin(p.x)*sin(p.y);
                              }

                              float fbm4( vec2 p ) {
                                  float f = 0.0;
                                  f += 0.5000 * noise( p ); p = m * p * 2.02;
                                  f += 0.2500 * noise( p ); p = m * p * 2.03;
                                  f += 0.1250 * noise( p ); p = m * p * 2.01;
                                  f += 0.0625 * noise( p );
                                  return f / 0.9375;
                              }

                              float fbm6( vec2 p ) {
                                  float f = 0.0;
                                  f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
                                  f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
                                  f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
                                  f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
                                  f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
                                  f += 0.015625*(0.5 + 0.5 * noise( p ));
                                  return f/0.96875;
                              }

                              float pattern (vec2 p) {
                                float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
                                return abs(vout);
                              }

                              void main () {
                                float ff = 1.5 * sin(time * 20.0 + 200.0 * sin(vUv.x) + pow(vUv.y, vUv.x) * cos(time) * 200.0 + vUv.x + vUv.y);
                                float gg = 2.0 * pow(pattern(vUv * 1.0 + ff / 15.0), 5.0);
                                gl_FragColor = vec4(gg * 2.0 + 0.4 * ff, gg, gg * 2.0 + 0.4, 1.0);
                              }
                            `}
                        ></shaderMaterial>
                      </Plane>
                    </Canvas>
                    {/* <YoCanvas></YoCanvas> */}
                  </div>
                  <blockquote className='relative p-8 bg-pink-600 '>
                    <svg
                      preserveAspectRatio='none'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 583 95'
                      className='absolute left-0 block w-full'
                      style={{
                        height: '95px',
                        top: '-94px',
                      }}
                    >
                      <polygon
                        points='-30,95 583,95 583,65'
                        className='text-pink-600 fill-current'
                      ></polygon>
                    </svg>
                    <h4 className='text-xl font-bold text-white'>
                      A Bridge from Blender to the Web
                    </h4>
                    <p className='mt-2 font-light text-white text-md'>
                      Agape Effect Node tools not only bring your 3D assets to
                      the web, but also empower them to carry VFX, animation
                      across metaverses and different chains
                    </p>
                  </blockquote>
                </div>
                {/* </Parallax> */}
              </div>
              <div className='w-full px-4 lg:my-32 md:w-6/12'>
                <div className='flex flex-wrap'>
                  <div className='w-full px-4 md:w-6/12'>
                    <div className='relative flex flex-col mt-4 text-white'>
                      <div className='flex-auto px-4 py-5 '>
                        <div className='inline-flex items-center justify-center mb-5 shadow-lg w-14 h-14 text-centerrounded-full'>
                          <img
                            className='w-full'
                            src={`/site/bridge/realtime-web-editor.svg`}
                          />
                        </div>
                        <h6 className='mb-1 text-xl font-semibold'>
                          Realtime Web Editor
                        </h6>
                        <ol className='pl-5 list-disc'>
                          <li className='mb-3 text-slate-300'>
                            What you see and what you get
                          </li>
                          <li className='mb-4 text-slate-300'>
                            For you create VFX and simulations, materials and
                            more…
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className='relative flex flex-col min-w-0 text-white'>
                      <div className='flex-auto px-4 py-5'>
                        <div className='inline-flex items-center justify-center mb-5 shadow-lg w-14 h-14 text-centerrounded-full'>
                          <img
                            className='w-full'
                            src={`/site/bridge/webnative.png`}
                          />
                        </div>
                        <h6 className='mb-1 text-xl font-semibold'>
                          Web Native Rendering
                        </h6>
                        <ol className='pl-5 list-disc'>
                          <li className='mb-3 text-slate-300'>
                            Fast for Mobile Deployment and Iteration
                          </li>
                          <li className='mb-4 text-slate-300'>
                            Quick Development
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className='w-full px-4 text-white md:w-6/12'>
                    <div className='relative flex flex-col min-w-0'>
                      <div className='flex-auto px-4 py-5'>
                        <div className='inline-flex items-center justify-center mb-5 shadow-lg w-14 h-14 text-centerrounded-full'>
                          <img
                            className='w-full'
                            src={`/site/bridge/interotable.png`}
                          />
                        </div>
                        <h6 className='mb-1 text-xl font-semibold'>
                          Interotablity
                        </h6>
                        <ol className='pl-5 list-disc'>
                          <li className='mb-4 text-slate-300'>
                            Portable VFX Content Runnable Across Metaverse
                          </li>
                          <li className='mb-3 text-slate-300'>
                            {/*  */}
                            {/*  */}
                            Embeded VFX JSON in GLB with a OpenSourced Metaverse
                            Runtime
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className='relative flex flex-col min-w-0'>
                      <div className='flex-auto px-4 py-5'>
                        <div className='inline-flex items-center justify-center mb-5 shadow-lg w-14 h-14 text-centerrounded-full'>
                          <img
                            className='w-full'
                            src={`/site/bridge/affordable.png`}
                          />
                        </div>
                        <h6 className='mb-1 text-xl font-semibold'>
                          Affordable Metaverse Economy
                        </h6>
                        <ol className='pl-5 list-disc'>
                          <li className='mb-3 text-slate-300'>
                            Metaverse Ownership for All
                          </li>
                          <li className='mb-3 text-slate-300'>
                            Fair Trade & Low Entry Barrier
                          </li>
                          <li className='mb-3 text-slate-300'>
                            Open Economy for GLB Centric Creative Content
                          </li>
                          <li className='mb-4 text-slate-300'>
                            You can sell VFX shoes and buyer can use it in all
                            compatible metaverses.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container pb-20 mx-auto overflow-hidden'>
            <div className='flex flex-wrap items-center'>
              <div className='w-full px-4 mt-32 ml-auto mr-auto lg:order-3 md:w-5/12'>
                <div className='relative flex flex-col w-full min-w-0 mt-48 mb-6 md:mt-0'>
                  <img src={`/site/editor/agape-engine.png`}></img>
                </div>
              </div>

              <div className='w-full px-12 mt-48 ml-auto mr-auto md:w-4/12 md:px-4'>
                <div className='inline-flex items-center justify-center w-16 h-16 p-0 mb-6 text-center  rounded-full shadow-lg'>
                  <img src={`/site/editor/icon.png`} />
                </div>
                <h3 className='mb-2 text-3xl font-semibold leading-normal text-white'>
                  Real-time Web Editor
                </h3>
                <p className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-200'>
                  Allows you to bring your 3D assets to the web with
                </p>
                <div className='block pb-6'>
                  <ol className='pl-5 list-disc'>
                    <li className='mb-3 text-slate-300'>
                      VFX, Physics and particle simulation
                    </li>
                    <li className='mb-3 text-slate-300'>
                      Beautiful node based shaders
                    </li>
                    <li className='mb-3 text-slate-300'>
                      Lighting & Post processing
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className='flex flex-wrap items-center lg:my-32'>
              <div className='w-full px-4 mt-32 ml-auto mr-auto md:w-5/12'>
                <div className='relative flex flex-col w-full min-w-0 mt-48 mb-6 md:mt-0'>
                  <img src={`/site/interopable/exaplain.svg`}></img>
                </div>
              </div>
              <div className='w-full px-12 mt-48 ml-auto mr-auto md:w-4/12 md:px-4'>
                <div className='inline-flex items-center justify-center w-16 h-16 p-0 mb-6 text-center  rounded-full shadow-lg'>
                  <img src={`/site/interopable/icon.png`} />
                </div>
                <h3 className='mb-2 text-3xl font-semibold leading-normal text-white'>
                  Decentralized interoperability
                </h3>
                <p className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-200'>
                  Wallgarden assets vs open assets
                </p>
                <div className='block pb-6'>
                  <ol className='pl-5 list-disc'>
                    <li className='mb-3 text-slate-300'>
                      Agape tools empower 3D assets and NFTs to carry VFX,
                      animation and
                    </li>
                    <li className='mb-3 text-slate-300'>
                      potentially game logics across metaverses and different
                      chains.
                    </li>
                    {/* <li className='mb-3 text-slate-300'></li> */}
                  </ol>
                </div>
              </div>
            </div>

            <div className='flex flex-wrap items-center lg:my-32'>
              <div className='w-full px-4 mt-32 ml-auto mr-auto lg:order-3 md:w-5/12'>
                <div className='relative flex flex-col w-full min-w-0 mt-48 mb-6 md:mt-0'>
                  <img src={`/site/native/editor.svg`}></img>
                </div>
              </div>
              <div className='w-full px-12 mt-48 ml-auto mr-auto md:w-4/12 md:px-4'>
                <div className='inline-flex items-center justify-center w-16 h-16 p-0 mb-6 text-center  rounded-full shadow-lg'>
                  <img src={`/site/editor/icon.png`} />
                </div>
                <h3 className='mb-2 text-3xl font-semibold leading-normal text-white'>
                  Web Native
                </h3>
                <p className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-200'>
                  Edit on the Web - What you see is what you get!
                </p>
                <div className='block pb-6'>
                  <ol className='pl-5 list-disc'>
                    <li className='mb-3 text-slate-300'>Fast for mobile</li>
                    <li className='mb-3 text-slate-300'>Quick development</li>
                  </ol>
                  <div>
                    <img src={`/site/native/alphapass.svg`} />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-wrap justify-center mt-24 text-center lg:my-32'>
              <div className='w-full px-12 md:w-6/12 md:px-4'>
                <h2 className='text-4xl font-semibold text-white'>
                  Brands that uses Agape Engine
                </h2>
                <p className='mt-4 mb-4 text-lg leading-relaxed text-slate-100'>
                  Our commitment: Battle tested use cases for a battle tested
                  engine Agape Effect Node Engine is a product built using our
                  past experience building 3D website for clients
                </p>
              </div>
            </div>
            <div className='container mx-auto mt-24'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full px-4 lg:w-12/12'>
                  <div className='flex flex-wrap'>
                    <div className='w-full px-4 lg:w-4/12'>
                      <a
                        href={'https://feeling.reflektor.digital/'}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <h5 className='pb-4 text-xl text-center text-slate-200'>
                          CocaCola
                        </h5>
                        <div className='relative flex flex-col w-full min-w-0 mb-6 overflow-hidden break-words group rounded-2xl'>
                          <img
                            alt='Cocacola'
                            style={
                              {
                                // transform: `scale(1.01)`,
                              }
                            }
                            className='h-auto max-w-full align-middle border-none rounded-lg'
                            src='/site/logos-covers/t-coca.png'
                          />
                          <img
                            alt='Cocacola'
                            style={
                              {
                                // transform: `scale(1.01)`,
                              }
                            }
                            className='absolute top-0 left-0 w-full h-auto max-w-full align-middle border-none rounded-lg group-hover:-translate-y-full transition-all duration-700'
                            src='/site/logos-covers/c-coca.png'
                          />
                        </div>
                      </a>
                    </div>
                    <div className='w-full px-4 lg:w-4/12'>
                      <a
                        href={'https://cadillac.agape.effectnode.com/'}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <h5 className='pb-4 text-xl text-center text-slate-200'>
                          Cadillac
                        </h5>
                        <div className='relative flex flex-col w-full min-w-0 mb-6 overflow-hidden break-words group rounded-2xl'>
                          <img
                            alt='Cadillac'
                            className='h-auto max-w-full align-middle border-none rounded-lg'
                            src='/site/logos-covers/t-cadilliac.png'
                          />
                          <img
                            alt='Cadillac'
                            style={
                              {
                                // transform: `scale(1.01)`,
                              }
                            }
                            className='absolute top-0 left-0 w-full h-auto max-w-full align-middle border-none rounded-lg group-hover:-translate-y-full transition-all duration-700'
                            src='/site/logos-covers/c-cadilliac.png'
                          />
                        </div>
                      </a>
                    </div>
                    <div className='w-full px-4 lg:w-4/12'>
                      <a
                        href={'https://querlo.agape.effectnode.com/'}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <h5 className='pb-4 text-xl text-center text-slate-200'>
                          AI Company Querlo
                        </h5>
                        <div className='relative flex flex-col w-full min-w-0 mb-6 overflow-hidden break-words group rounded-2xl'>
                          <img
                            alt='Querlo'
                            className='h-auto max-w-full align-middle border-none rounded-lg'
                            src='/site/logos-covers/t-querlo.png'
                          />
                          <img
                            alt='Querlo'
                            style={
                              {
                                // transform: `scale(1.01)`,
                              }
                            }
                            className='absolute top-0 left-0 w-full h-auto max-w-full align-middle border-none rounded-lg group-hover:-translate-y-full transition-all duration-700'
                            src='/site/logos-covers/c-querlo.png'
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className='flex flex-wrap items-center pt-32'>
              <div className='w-full px-4 mt-32 ml-auto mr-auto md:w-6/12'>
                <div className='relative flex flex-wrap justify-center'>
                  <div className='w-full px-4 my-4 lg:w-6/12'>
                    <a
                      href={'https://www.youtube.com/watch?v=KtBUjfD-OY0'}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div className='relative flex flex-col w-full min-w-0 mb-6 overflow-hidden text-center break-words bg-black rounded-lg shadow-lg group rounded-3xl'>
                        <img
                          alt='agape'
                          className='h-auto max-w-full align-middle border-none rounded-lg'
                          src='/site/content/base/trailer.png'
                        />
                        <img
                          alt='agape'
                          className='absolute top-0 left-0 w-full h-auto max-w-full align-middle border-none rounded-lg group-hover:-translate-y-full transition-all duration-700'
                          src='/site/content/cover/trailer.png'
                        />
                      </div>
                    </a>
                    <a
                      href={'https://www.youtube.com/watch?v=C-3dFUm93us'}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div className='relative flex flex-col w-full min-w-0 mb-6 overflow-hidden text-center break-words bg-black rounded-lg shadow-lg group rounded-3xl'>
                        <img
                          alt='agape'
                          className='h-auto max-w-full align-middle border-none rounded-lg'
                          src='/site/content/base/editor.png'
                        />
                        <img
                          alt='agape'
                          className='absolute top-0 left-0 w-full h-auto max-w-full align-middle border-none rounded-lg group-hover:-translate-y-full transition-all duration-700'
                          src='/site/content/cover/editor.png'
                        />
                      </div>
                    </a>
                  </div>
                  <div className='w-full px-4 my-4 lg:w-6/12 lg:mt-16'>
                    <a
                      href={'https://agape.games/'}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div className='relative flex flex-col w-full min-w-0 mb-6 overflow-hidden text-center break-words bg-black rounded-lg shadow-lg group rounded-3xl'>
                        <img
                          alt='agape'
                          className='h-auto max-w-full align-middle border-none rounded-lg'
                          src='/site/content/base/metaverse.png'
                        />
                        <img
                          alt='agape'
                          className='absolute top-0 left-0 w-full h-auto max-w-full align-middle border-none rounded-lg group-hover:-translate-y-full transition-all duration-700'
                          src='/site/content/cover/metaverse.png'
                        />
                      </div>
                    </a>
                    <a
                      href={'https://github.com/wonglok/effctnode-forge'}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <div className='relative flex flex-col w-full min-w-0 mb-6 overflow-hidden text-center break-words bg-black rounded-lg shadow-lg group rounded-3xl'>
                        <img
                          alt='agape'
                          className='h-auto max-w-full align-middle border-none rounded-lg'
                          src='/site/content/base/github.png'
                        />
                        <img
                          alt='agape'
                          className='absolute top-0 left-0 w-full h-auto max-w-full align-middle border-none rounded-lg group-hover:-translate-y-full transition-all duration-700'
                          src='/site/content/cover/github.png'
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {
                <div className='w-full px-12 mt-48 ml-auto mr-auto md:w-4/12 md:px-4'>
                  <div className='inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-slate-500'>
                    <i className='text-xl fas fa-drafting-compass'></i>
                  </div>
                  <h3 className='mb-2 text-3xl font-semibold leading-normal text-white'>
                    Open Source and Affordable Metaverse for Many
                  </h3>
                  <p className='mt-4 mb-4 text-xs  font-light leading-relaxed text-slate-100'>
                    Our vision is to make metaverse technology affordable for
                    many by lowering server rental cost by optimization GPU and
                    streaming process lowering entry barrier for web Devs
                    Facilitating quick deployments
                  </p>
                  <p className='mt-4 mb-4 text-xs  font-light leading-relaxed text-slate-100'>
                    Since Agape Effect Node Engine is an open source project we
                    want to continue this movement with you. You can give this
                    version a try to feel the design and also test the quality
                    of the code!
                  </p>
                  <p className='mt-4 mb-4 text-xs  font-light leading-relaxed text-slate-100'>
                    Get it free on Github and please help us spread the news
                    with a Star
                  </p>

                  {/* <div className='block pb-6'>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Alerts
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Dropdowns
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Menus
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Modals
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Navbars
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Popovers
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Tabs
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Tooltips
                  </span>
                </div> */}
                  {/* <a
                  className='font-bold text-slate-700 hover:text-slate-500 ease-linear transition-all duration-150'
                  href='/learning-lab/tailwind-starter-kit/documentation/vue/alerts'
                >
                  View all
                  <i className='ml-1 leading-relaxed fa fa-angle-double-right'></i>
                </a> */}
                </div>
              }
            </div>
          </div>
          {false && (
            <div className='container px-4 pt-48 pb-32 mx-auto'>
              <div className='flex flex-wrap items-center'>
                <div className='w-full px-12 ml-auto md:w-5/12 md:px-4'>
                  <div className='md:pr-12'>
                    <div className='inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-slate-500'>
                      <i className='text-xl fas fa-file-alt'></i>
                    </div>
                    <h3 className='text-3xl font-semibold'>
                      Complex Documentation
                    </h3>
                    <p className='mt-4 text-lg leading-relaxed text-slate-500'>
                      {`This extension comes a lot of fully coded examples that help
                    you get started faster. You can adjust the colors and also
                    the programming language. You can change the text and images
                    and you're good to go.`}
                    </p>
                    <ul className='mt-6 list-none'>
                      <li className='py-2'>
                        <div className='flex items-center'>
                          <div>
                            <span className='inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-slate-500 bg-slate-50'>
                              <i className='fas fa-fingerprint'></i>
                            </span>
                          </div>
                          <div>
                            <h4 className='text-slate-500'>
                              Built by Developers for Developers
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className='py-2'>
                        <div className='flex items-center'>
                          <div>
                            <span className='inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-slate-500 bg-slate-50'>
                              <i className='fab fa-html5'></i>
                            </span>
                          </div>
                          <div>
                            <h4 className='text-slate-500'>
                              Carefully crafted code for Components
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className='py-2'>
                        <div className='flex items-center'>
                          <div>
                            <span className='inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-slate-500 bg-slate-50'>
                              <i className='far fa-paper-plane'></i>
                            </span>
                          </div>
                          <div>
                            <h4 className='text-slate-500'>
                              Dynamic Javascript Components
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='w-full px-4 pt-24 mr-auto md:w-6/12 md:pt-0'>
                  <img
                    alt='...'
                    className='max-w-full rounded-lg shadow-xl'
                    data-style='
              transform: scale(1) perspective(1040px) rotateY(-11deg)
                rotateX(2deg) rotate(2deg);
            '
                    src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/documentation.png'
                  />
                </div>
              </div>
            </div>
          )}
        </section>
        {/*  */}

        {/*  */}
        <section className='relative py-20  bg-slate-600 bg-opacity-70'>
          {/*  */}
          {/* <div
            className='absolute top-0 left-0 right-0 bottom-auto w-full'
            style={{ height: '80px', top: '-80px' }}
          >
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon
                className='fill-current text-slate-600'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div> */}

          {/* {false && (
            <div className='container pb-64 mx-auto'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full px-12 ml-auto mr-auto md:w-5/12 md:px-4 md:mt-64'>
                  <div className='inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-slate-500'>
                    <i className='text-xl fas fa-code-branch'></i>
                  </div>
                  <h3 className='mb-2 text-3xl font-semibold leading-normal text-white'>
                    Open Source
                  </h3>
                  <p className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-400'>
                    Since
                    <a
                      href='https://tailwindcss.com/'
                      className='text-slate-300'
                      target='_blank'
                      rel='noreferrer'
                    >
                      TailwindCSS
                    </a>
                    is an open source project we wanted to continue this
                    movement too. You can give this version a try to feel the
                    design and also test the quality of the code!
                  </p>
                  <p className='mt-0 mb-4 text-lg font-light leading-relaxed text-slate-400'>
                    Get it free on Github and please help us spread the news
                    with a Star!
                  </p>
                  <a
                    href='https://github.com/creativetimofficial/tailwind-starter-kit'
                    target='_blank'
                    className='inline-block px-6 py-4 mt-4 mb-1 mr-1 text-sm font-bold text-white uppercase rounded shadow outline-none github-star focus:outline-none bg-slate-700 active:bg-slate-600 hover:shadow-lg'
                    rel='noreferrer'
                  >
                    Github Star
                  </a>
                </div>
                <div className='relative w-full px-4 mt-32 ml-auto mr-auto md:w-4/12'>
                  <i
                    className='fab fa-github text-slate-700'
                    data-style='
              font-size: 55em;
              position: absolute;
              top: -150px;
              right: -100%;
              left: auto;
              opacity: 0.8;
            '
                  ></i>
                </div>
              </div>
            </div>
          )} */}
        </section>
        {/* public/site/recognition/awards.png */}
        {/*  */}
        <section className='relative pt-32 pb-16  bg-slate-600 bg-opacity-70'>
          {/* <div
            className='absolute top-0 left-0 right-0 bottom-auto w-full '
            data-style='height: 80px'
          >
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon
                className='opacity-50 fill-current text-slate-200'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div> */}
          {/* bg-opacity-80 */}
          <div className='container mx-auto mt-10'>
            <div className='relative z-10 flex flex-wrap justify-center px-12 py-12 -mt-64 bg-black shadow-xl rounded-3xl bg-opacity-50'>
              <div className='w-full text-center lg:w-8/12'>
                {/* <p className='text-4xl text-center'>
                  <span role='img' aria-label='love'>
                    😍
                  </span>
                </p> */}
                <h3 className='mt-4 text-3xl font-semibold text-white'>
                  Awards and Recognitions
                </h3>
                <p className='mt-4 mb-4 text-lg leading-relaxed text-slate-100'>
                  The Award winning 3D Web Engine and Metaverse builder
                </p>
                <div className='flex flex-col mt-16 sm:block'>
                  <div>
                    <img src={`/site/recognition/awards.png`} />
                  </div>
                  {/* <a
                    className='px-6 py-4 mb-2 mr-1 text-sm font-bold text-white uppercase bg-pink-500 rounded shadow outline-none get-started focus:outline-none active:bg-pink-600 hover:shadow-lg ease-linear transition-all duration-150'
                    href='/learning-lab/tailwind-starter-kit/documentation/quick-start'
                  >
                    Get started
                  </a>
                  <a
                    href='https://github.com/creativetimofficial/tailwind-starter-kit'
                    target='_blank'
                    className='px-6 py-4 mb-1 mr-1 text-sm font-bold text-white uppercase rounded shadow outline-none github-star sm:ml-1 focus:outline-none bg-slate-700 active:bg-slate-600 hover:shadow-lg'
                    rel='noreferrer'
                  >
                    <i className='mr-1 text-lg fab fa-github'></i>
                    <span>Help With a Star</span>
                  </a> */}
                </div>
                <div className='mt-10 text-center'></div>
              </div>
            </div>
          </div>
        </section>

        {/*  */}
        <section
          id={'contactus'}
          className='relative block py-24 bg-black bg-opacity-50 lg:pt-0'
        >
          <ContactUsForm></ContactUsForm>
        </section>

        <footer className='relative pt-8 pb-6 bg-slate-200 bg-opacity-80'>
          <div
            className='absolute top-0 left-0 right-0 bottom-auto w-full -mt-20 overflow-hidden pointer-events-none'
            data-style='height: 80px'
          >
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon
                className='fill-current text-slate-200'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div>
          <div className='container px-4 pt-24 mx-auto'>
            <div className='flex flex-wrap'>
              <div className='w-full px-4 md:w-6/12'>
                <h4 className='text-3xl font-semibold'>{`Let's keep in touch!`}</h4>
                <h5 className='mt-0 mb-2 text-lg text-slate-600'>
                  Find us on any of these platforms, we respond 1-2 business
                  days.
                </h5>
                <div className='mt-6'>
                  <a
                    href='https://twitter.com/0xgenoseed'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='items-center justify-center inline-block p-3 mr-2 text-center bg-white rounded-full shadow-lg outline-none fab fa-twitter text-sky-400 font-lg align-center focus:outline-none'></i>
                  </a>
                  <a
                    href='https://github.com/wonglok/effctnode-forge'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='items-center justify-center inline-block p-3 mr-2 text-center bg-white rounded-full shadow-lg outline-none fab fa-github text-slate-800 font-lg align-center focus:outline-none'></i>
                  </a>
                </div>
                <p className='mt-6 text-sm font-semibold text-slate-500'></p>
              </div>
              <div className='w-full px-4 md:w-6/12'>
                <div className='flex flex-wrap mb-6 items-top'>
                  <div className='w-full pt-6 ml-auto md:w-6/12 xl:w-4/12 md:pt-0 md:px-4'>
                    <span className='block mb-2 text-sm font-semibold uppercase text-slate-500'>
                      Links
                    </span>
                    <ul className='list-unstyled'>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='/project'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Editor
                        </a>
                      </li>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='/game'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Demo Game
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='w-full pt-6 ml-auto md:w-6/12 xl:w-4/12 md:pt-0 md:px-4'>
                    <span className='block mb-2 text-sm font-semibold uppercase text-slate-500'>
                      Other Resources
                    </span>
                    <ul className='list-unstyled'>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://github.com/wonglok/effctnode-forge/blob/master/LICENSE'
                          target='_blank'
                          rel='noreferrer'
                        >
                          MIT License
                        </a>
                      </li>

                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://github.com/wonglok/effctnode-forge'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Github
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr className='my-6 border-slate-300' />
            <div className='flex flex-wrap items-center justify-center md:justify-between'>
              <div className='w-full px-4 mx-auto text-center md:w-4/12'>
                <div className='py-1 text-sm font-semibold text-slate-500'>
                  <a
                    href='https://agape.effectnode.com/'
                    className='text-slate-500 hover:text-slate-800'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Made by Agape Powered by Effect Node Engine
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

function Parallax({ children }) {
  let ref = useRef()
  useEffect(() => {
    //
    //
    return useScrollStore.subscribe((nst, pst) => {
      //smooth

      // console.log(nst.smooth)

      let v = ((0.35 - nst.smooth) / 0.1) * -30.0

      if (v >= 30) {
        v = 30.0
      }

      ref.current.style.transition = `all 0.3s`

      //
      // console.log(nst.px)
    })
    //
  }, [children])
  return (
    <div className='' ref={ref}>
      {children}
    </div>
  )
}

function IconLoader({ height, children }) {
  let ref = useRef()

  useEffect(() => {
    //
    //
    return useScrollStore.subscribe((nst, pst) => {
      //smooth
      let v = nst.smoothPX / 100
      if (v >= 1.0) {
        v = 1.0
      }
      ref.current.style.opacity = 1.0 - v

      //
      // console.log(nst.smoothPX)
    })
    //
  }, [height])
  return (
    <div
      ref={ref}
      className='flex flex-col items-center justify-center mt-12 mb-12'
    >
      {children}
      <div className='mt-8 container-chev -translate-x-2'>
        <div className='chevron'></div>
        <div className='chevron'></div>
        <div className='chevron'></div>
      </div>
    </div>
  )
}
