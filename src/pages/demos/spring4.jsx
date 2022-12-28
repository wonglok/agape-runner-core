import { ClothSim } from '@/components/ClothSimGroup/ClothSim/ClothSim'
import { Environment, OrbitControls } from '@react-three/drei'

const Page = () => {
  return (
    <>
      <ClothSim></ClothSim>
      <OrbitControls
        object-position={[0, 0, 150]}
        object-far={100000}
        object-near={1}
      ></OrbitControls>
      <Environment preset='apartment' background></Environment>
    </>
  )
}

Page.layout = 'PromotePage'

Page.SEO = function SEO() {
  return <span className=''>{/* <Loader></Loader> */}</span>
}

async function getStaticProps() {
  return {
    props: {
      sceneName: 'index',
      title: 'Effect Node Forge',
    },
  }
}

export { getStaticProps }
export default Page

//

//
