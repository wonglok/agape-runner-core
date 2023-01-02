import { UserEndPoints } from '@/helpers/UserEndPoints'
import fetch from 'node-fetch'

export default async function handler(req, res) {
  //

  let endPoint = UserEndPoints[process.env.NODE_ENV]
  //

  let bodyData =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

  // let domain = bodyData.domain
  let slug = bodyData.slug
  let sToken = bodyData.sToken
  let siteID = bodyData.siteID

  let response = await fetch(`${endPoint}/site-domain-list-mine`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({}),
    headers: {
      Authorization: `Bearer ${sToken}`,
    },
  })

  let result = await response.json()

  res.status(200).json(result.list)
}
//

//

//

//
