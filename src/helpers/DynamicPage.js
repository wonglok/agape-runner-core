import {
  Box,
  // Box,
  Environment,
  Text,
  // PerspectiveCamera,
  // Text,
  // Trail,
} from '@react-three/drei'
// import Router from 'next/router'
// import { Suspense, useEffect } from 'react'
import { Floor } from '@/helpers/Floor'
// import { useEffect, useRef } from 'react'
// import { useState } from 'react'
// import { Companion } from '@/helpers/Companion'
// import anime from 'animejs'
// import { screenOpacity } from '@/helpers/GLOverlayEffect'
// import { Vector3 } from 'three'
import { UserEndPoints } from './UserEndPoints'
import { Suspense, useEffect, useState } from 'react'

// import { useMultiverse } from '@/helpers/useMultiverse'
// import { TheVortex } from '@/components/canvas/TheVortex/TheVortex'
// import { LineStuff } from '@/helpers/LineDrop/LineStuff'
// import { useThree } from '@react-three/fiber'
// import { Vector3 } from 'three'
// import dynamic from 'next/dynamic'
const DynamicPage = (props) => {
  //

  // console.log(props)

  //pageData

  let [page, setPage] = useState(false)

  let run = async ({ pageID }) => {
    let response = await fetch(
      `${UserEndPoints[process.env.NODE_ENV]}/seo-page-get`,
      {
        body: JSON.stringify({
          //
          oid: pageID,
        }),
        method: 'POST',
        mode: 'cors',
      }
    )
    let result = await response.json()
    setPage(result?.item)
  }

  useEffect(() => {
    //
    if (props?.pageData?.oid) {
      run({ pageID: props?.pageData?.oid })
    }
    //seo-page-get
  }, [props.pageData])

  //
  if (!props.pageData?.oid) {
    return (
      <group>
        <Text position={[0, 1, 0]} fontSize={0.5}>
          Page Not Found
        </Text>
      </group>
    )
  }

  return (
    <>
      {page && page.colliderURL && page.mapURL && (
        <group>
          <Suspense fallback={null}>
            <Floor
              initPos={[0, 2.5, 0]}
              lookAt={[0, 2.5, -1]}
              colliderURL={`${page.colliderURL}`}
              mapURL={`${page.mapURL}`}
            ></Floor>
          </Suspense>
        </group>
      )}

      <Environment background={false} preset='apartment'></Environment>

      {/* <Box
        position={[3, 1, 1]}
        onClick={() => {
          //
          screenOpacity.value = 1
          anime({
            targets: [screenOpacity],
            value: 0,
            update: () => {},
            complete: () => {
              Router.router.push('/page2')
            },
          })
        }}
      >
        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Box> */}

      {/* <group
        position={new Vector3()
          .copy(
            //
            {
              //
              x: 0.6250860183367339,
              y: 5.573492821328801,
              z: -9.505888938903809,
            }
          )
          .toArray()}
        scale={0.12}
      >
        <theVortex></theVortex>
      </group> */}

      {/*  */}
      {/*  */}
      {/*  */}
    </>
  )
}
DynamicPage.layout = 'Multiverse'

export const getServerSidePropsForDynamicPage =
  ({ isIndex }) =>
  async (context) => {
    let siteOID = null
    let pageData = {}

    try {
      // preview route
      if (context?.params?.siteOID) {
        siteOID = context?.params?.siteOID
      }

      let host = context?.req?.headers?.host

      // host = 'kam.agape.land'

      if (typeof host === 'string' && host !== '') {
        if (host.includes('.at.agape.town')) {
          //
          let slug = host.replace('.at.agape.town', '') || ''

          let response = await fetch(
            `${UserEndPoints[process.env.NODE_ENV]}/seo-subdomain-site`,
            {
              body: JSON.stringify({
                //
                slug: slug,
              }),
              method: 'POST',
              mode: 'cors',
            }
          )
          let result = await response.json()
          //
          let list = result?.list
          if (list) {
            let first = list[0]

            if (first) {
              siteOID = first.oid
            }
          }
        } else {
          //

          let slug = host + '' || ''

          // console.log(slug)

          let response = await fetch(
            `${UserEndPoints[process.env.NODE_ENV]}/seo-userdomain-site`,
            {
              body: JSON.stringify({
                //
                slug: slug,
              }),
              method: 'POST',
              mode: 'cors',
            }
          )
          let result = await response.json()
          //

          let list = result?.list
          if (list) {
            let first = list[0]

            if (first) {
              siteOID = first.siteID
            }
          }
        }
      }

      if (siteOID) {
        if (isIndex) {
          let response = await fetch(
            `${UserEndPoints[process.env.NODE_ENV]}/seo-site-page`,
            {
              body: JSON.stringify({
                //
                siteID: siteOID,
                slug: '',
              }),
              method: 'POST',
              mode: 'cors',
            }
          )
          let result = await response.json()

          let list = result?.list
          if (list) {
            let first = list[0]

            if (first) {
              pageData = first
              // console.log(pageData)
            }
          }
        } else {
          // console.log(slug)

          let response = await fetch(
            `${UserEndPoints[process.env.NODE_ENV]}/seo-site-page`,
            {
              body: JSON.stringify({
                //
                siteID: siteOID,
                slug: context?.params?.slug || '',
              }),
              method: 'POST',
              mode: 'cors',
            }
          )
          let result = await response.json()

          let list = result?.list
          if (list) {
            let first = list[0]

            if (first) {
              pageData = first
            }
          }
        }
        //
      }

      //
    } catch (e) {
      //
      console.error(e)
    } finally {
      //
    }
    // //
    // let domainMapping = false

    // try {
    //   let endPoint = UserEndPoints[process.env.NODE_ENV]
    //   let response = await fetch(`${endPoint}/domain-of-sites`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       domain: context?.req?.headers?.host || '',
    //     }),
    //   })

    //   let data = await response.json()

    //   if (response.ok) {
    //     domainMapping = data
    //   }
    // } catch (e) {
    //   console.error(e)
    //   console.error('seo')
    // }

    // console.log(siteOID, pageData)
    return {
      props: {
        siteOID,
        pageData,
        title: 'Agape Town',
      },
    }
  }

export { DynamicPage }

//
//
//
