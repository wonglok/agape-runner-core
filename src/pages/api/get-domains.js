import { restrictedDomains } from '@/components/pages-html/Home/aws/site-aws'
import { UserEndPoints } from '@/helpers/UserEndPoints'
import fetch from 'node-fetch'

export default async function handler(req, res) {
  let endPoint = UserEndPoints[process.env.NODE_ENV]

  //

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains?teamId=${process.env.TEAM_ID_VERCEL}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
  )

  const json = await response.json()

  // not required –> only for this demo to prevent removal of the demo's domain
  let filteredDomains = json.domains

  restrictedDomains.forEach((name) => {
    filteredDomains = filteredDomains.filter((domain) => domain.name !== name)
  })

  res.status(response.status).send(filteredDomains)
}

//
//

//

//
//
