import nodemailer from 'nodemailer'
export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.name || !body.email || !body.message) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Missing Fields' })
  }

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })

  let mailJSON = {
    from: process.env.EMAIL_FROM,
    to: 'marketing@agape.games',
    subject: `Contact Form of ${body.name} from Agape Site`,
    text: `
Name: ${body.name}
Email:  ${body.email}
Message:
${body.message}
    `,
    // html: '<p>HTML version of the message</p>',
  }

  await transporter.sendMail(mailJSON).then(
    (data) => {
      console.log(data)
      res.status(200).json({ data: `${JSON.stringify(body)}` })
    },
    (err) => {
      console.error(err)
      res.status(500).json({ data: `error` })
    }
  )
  //

  // Found the name.
  // Sends a HTTP success code
}

//

//

//

//
