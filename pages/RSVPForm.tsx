import React, { useState, ChangeEvent, FormEvent } from 'react'

function RSVPForm() {
    const [attending, setAttending] = useState<string | null>(null)
    const [foodAllergies, setFoodAllergies] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    function handleAttendingChange(event: ChangeEvent<HTMLSelectElement>) {
        setAttending(event.target.value)
    }

    function handleFoodAllergiesChange(event: ChangeEvent<HTMLInputElement>) {
        setFoodAllergies(event.target.value)
    }

    function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        setMessage(event.target.value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        fetch('/api/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                attending,
                foodAllergies
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('RSVP submitted successfully:', data)
            })
            .catch(error => {
                console.error('Error submitting RSVP:', error)
            })
    }

    return (
        <div className='min-h-full flex justify-center items-center font-sans'>
            <form onSubmit={handleSubmit}>
                <div className='space-y-6 bg-stone-50 rounded-xl drop-shadow-xl p-5 grid-cols-1 w-96'>
                    <div>
                        <label className='flex-col'>
                            <div className='w-full'>Are you able to attend?</div>
                            <select value={attending || ''} onChange={handleAttendingChange} className='w-full my-1 rounded-lg border border-gray-300'>
                                <option value=''></option>
                                <option value='yes'>Yes</option>
                                <option value='no'>No</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className='flex-col'>
                            <div className='w-full'>Food allergies:</div>
                            <input type='text' value={foodAllergies || ''} onChange={handleFoodAllergiesChange}
                                className='my-1 w-full rounded-lg border border-gray-300'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='flex-col'>
                            <div className='w-full'>Leave us message!</div>
                            <textarea value={message || ''} rows={5} onChange={handleMessageChange}
                                className='my-1 w-full rounded-lg border border-gray-300'
                            />
                        </label>
                    </div>
                    <br />
                    <button type='submit'
                        className='bg-rose-300 btn hover:bg-rose-100 font-medium py-2 px-4 rounded-full'>
                        Submit RSVP
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RSVPForm
