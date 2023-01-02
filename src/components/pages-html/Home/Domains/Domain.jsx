import { useEffect, useState } from 'react'
import DomainCard from './components/domain-card'
import DomainCardPlaceholder from './components/domain-card-placeholder'
import LoadingDots from './components/loading-dots'
import useSWR from 'swr'
import { SESSION_ACCESS_KEY, UserEndPoints } from '@/auth/GateConst'

const fetcher = async (url) => {
  const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY) || ''

  if (!sToken) {
    const error = new Error(`${401}: no token`)
    error.error = json.error
    throw error
  }

  let endPoint = UserEndPoints[process.env.NODE_ENV]
  let response = await fetch(`${endPoint}/site-domain-list-mine`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({}),
    headers: {
      Authorization: `Bearer ${sToken}`,
    },
  })

  if (response.ok) {
    let data = await response.json()
    return data.list
  } else {
    throw new Error('bad response')
  }
}

export function DomainMappingAll({ siteID }) {
  const [domain, setDomain] = useState('')

  const { data: domainList, mutate: revalidateDomains } = useSWR(
    `/api/get-my-domains`,
    fetcher
  )

  const [disabled, setDisabled] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (domain.length == 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [domain])

  useEffect(() => {
    if (adding) setDisabled(true)
  }, [adding])

  return (
    <div className='flex-none w-full max-w-full px-0 mt-9 pb-9'>
      {/* <h1 className='text-4xl font-bold sm:text-6xl'>Domains API</h1> */}

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setAdding(true)
          //

          //
          try {
            await fetch(`/api/add-domain`, {
              method: 'POST',
              body: JSON.stringify({
                //
                slug: domain,
                siteID: siteID,
                sToken: localStorage.getItem(SESSION_ACCESS_KEY),
              }),
            })
            //
            await revalidateDomains()
          } catch (error) {
            alert(error.message)
          } finally {
            setAdding(false)
          }
        }}
        //
        //
        className='flex justify-between w-full h-10 max-w-2xl px-5 mt-10 space-x-4'
      >
        <input
          type='text'
          name='domain'
          onInput={(e) => {
            setDomain(e.target.value)
          }}
          autoComplete='off'
          placeholder='mydomain.com'
          pattern='^(?:[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$'
          required
          className='flex-auto min-w-0 px-4 border border-gray-300 rounded-md focus:ring-0 focus:border-black sm:text-sm'
        />
        <button
          type='submit'
          disabled={disabled}
          className={`${
            disabled
              ? 'cursor-not-allowed bg-gray-100 text-gray-500 border-gray-300'
              : 'bg-black text-white border-black hover:text-black hover:bg-white'
          } py-2 w-28 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
        >
          {adding ? <LoadingDots /> : 'Add'}
        </button>
      </form>

      {error && (
        <div className='flex items-center w-full max-w-2xl mt-5 text-sm text-left text-red-500 space-x-2'>
          <svg
            viewBox='0 0 24 24'
            width='20'
            height='20'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
            shapeRendering='geometricPrecision'
            style={{ color: '#f44336' }}
          >
            <circle cx='12' cy='12' r='10' fill='white' />
            <path d='M12 8v4' stroke='#f44336' />
            <path d='M12 16h.01' stroke='#f44336' />
          </svg>
          <p>
            Cannot add <b>{error.domain}</b> since it&apos;s already assigned to
            another project.
          </p>
        </div>
      )}

      <div className='w-full max-w-2xl'>
        {domainList
          ? domainList.map((domain, index) => {
              return (
                <DomainCard
                  key={index}
                  siteID={siteID}
                  domain={domain.slug}
                  revalidateDomains={revalidateDomains}
                />
              )
            })
          : [1, 2, 3].map((_, index) => {
              return <DomainCardPlaceholder key={index} />
            })}
      </div>
    </div>
  )
}
