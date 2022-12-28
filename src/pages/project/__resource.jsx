import { ProjectNav } from '@/components/projects/ProjectNav/ProjectNav'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ResourceH() {
  let router = useRouter()
  return (
    <div>
      <div className='absolute w-full h-full'>
        {/* <!-- Mobile --> */}
        <ProjectNav></ProjectNav>

        <div className='container flex flex-col items-start justify-between px-6 pb-6 mx-auto my-12 border-b border-gray-300 lg:flex-row lg:items-center'>
          <div>
            <h4 className='text-2xl font-bold leading-tight text-gray-800'>
              Materials
            </h4>
          </div>
          <div className='mt-6 lg:mt-0'>
            {/* <a href='/'>
              <button className='px-6 py-2 mx-2 my-2 text-sm text-indigo-700 bg-white rounded transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white hover:bg-gray-100'>
                Back to Home
              </button>
            </a> */}
          </div>
        </div>
        {/* <!-- Page title ends --> */}
        <div className='container px-6 mx-auto'>
          <div className='w-full'>
            <div>123</div>
          </div>
        </div>
      </div>

      {/*  */}
      {/*  */}
    </div>
  )
}

//

//

//

//
