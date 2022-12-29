import LoadingDots from '../components/loading-dots'
import ConfiguredSectionPlaceholder from './configured-section-placeholder'

const DomainCardPlaceholder = () => {
  return (
    <div className='w-full py-10 mt-10 border-black sm:shadow-md border-y sm:border sm:border-gray-50 sm:rounded-lg'>
      <div className='flex justify-between px-2 space-x-4 sm:px-10'>
        <div className='bg-gray-300 h-7 w-36 rounded-md animate-pulse' />
        <div className='flex space-x-3'>
          <button
            disabled={true}
            className='w-24 text-sm text-gray-500 bg-gray-100 border border-gray-200 border-solid cursor-not-allowed py-1.5 rounded-md focus:outline-none transition-all ease-in-out duration-150'
          >
            <LoadingDots />
          </button>
          <button
            disabled={true}
            className='w-24 text-sm text-white bg-red-500 border border-red-500 border-solid hover:text-red-500 hover:bg-white py-1.5 rounded-md focus:outline-none transition-all ease-in-out duration-150'
          ></button>
        </div>
      </div>
      <ConfiguredSectionPlaceholder />
    </div>
  )
}

export default DomainCardPlaceholder
