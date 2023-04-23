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

    function handleMessageChange(event: ChangeEvent<HTMLInputElement>): void {
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
            <form onSubmit={handleSubmit}
                className='space-y-6 bg-stone-50 rounded-xl drop-shadow-xl p-5 grid-cols-1 '>
                <div>
                    <label>
                        <div class='my-1'>Are you able to attend?</div>
                        <select value={attending || ''} onChange={handleAttendingChange} className='border my-1'>
                            <option value=''></option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        <div>Food allergies:</div>
                        <input type='text' value={foodAllergies || ''} onChange={handleFoodAllergiesChange}
                            className='border my-1'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <div>Leave us message!</div>
                        <textarea type='text' value={message || ''} onChange={handleMessageChange}
                            className='border my-1 ' 
                        />
                    </label>
                </div>
                <br />
                <button type='submit'
                    className='bg-rose-300 btn hover:bg-rose-100 font-bold py-2 px-4 rounded-full'>
                    Submit RSVP
                </button>
            </form>
        </div>
    )
}

export default RSVPForm
