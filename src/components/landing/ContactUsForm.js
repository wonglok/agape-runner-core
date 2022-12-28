import { useState } from 'react'

export default function ContactUsForm() {
  let [st, setST] = useState({
    label: `Send Message`,
    canSend: true,
  })
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (st.canSend) {
      setST({
        label: 'Sending....',
        canSend: false,
      })
    }

    if (!st.canSend) {
      return
    }

    // Stop the form from submitting and refreshing the page.

    // Get data from the form.
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      message: event.target.message.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/contact-us'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }
    try {
      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options)

      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json()
      console.log(result.data)

      alert(`Email sent successfully.`)
      event.target.name.value = ''
      event.target.email.value = ''
      event.target.message.value = ''
      setST({
        label: `Send Message`,
        canSend: true,
      })
    } catch (e) {
      alert(`error, please try again`)

      setST({
        label: `Send Message`,
        canSend: true,
      })
    }
  }

  //
  return (
    // We pass the event to the handleSubmit() function on submit.
    <form onSubmit={handleSubmit}>
      <div className='container px-4 mx-auto'>
        <div className='flex flex-wrap justify-center pt-36'>
          <div className='w-full px-4 lg:w-6/12'>
            <div className='relative flex flex-col w-full min-w-0 mb-6 break-words rounded-lg shadow-lg bg-slate-200'>
              <div className='flex-auto p-5 lg:p-10'>
                <h4 className='text-2xl font-semibold'>
                  Want to work with us?
                </h4>
                <p className='mt-1 mb-4 leading-relaxed text-slate-500'>
                  Complete this form and we will get back to you in 24 hours.
                </p>
                <div className='relative w-full mt-8 mb-3'>
                  <label
                    className='block mb-2 text-xs font-bold uppercase text-slate-600'
                    htmlFor='full-name'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    className='w-full px-3 py-3 text-sm bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring ease-linear transition-all duration-150'
                    placeholder='Full Name'
                  />
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block mb-2 text-xs font-bold uppercase text-slate-600'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='w-full px-3 py-3 text-sm bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring ease-linear transition-all duration-150'
                    placeholder='Email'
                  />
                </div>
                <div className='relative w-full mb-3'>
                  <label
                    className='block mb-2 text-xs font-bold uppercase text-slate-600'
                    htmlFor='message'
                  >
                    Message
                  </label>
                  <textarea
                    rows='4'
                    cols='80'
                    id='message'
                    name='message'
                    required
                    className='w-full px-3 py-3 text-sm bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring'
                    placeholder='Type a message...'
                  ></textarea>
                </div>
                <div className='mt-6 text-center'>
                  <button
                    className='px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase rounded shadow outline-none bg-slate-800 active:bg-slate-600 hover:shadow-lg focus:outline-none ease-linear transition-all duration-150'
                    type='submit'
                  >
                    {st.label}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
