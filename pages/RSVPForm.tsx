import React, { useState, ChangeEvent, FormEvent } from 'react'

type InvitationModel = {
    id: string;
    name: string;
    canAttend: boolean;
    foodAllergies: string;
    message: string;
}

function RSVPForm(props: { invitationData: InvitationModel }) {

    const invitationData = props.invitationData
    const [canAttend, setAttending] = useState<boolean>(invitationData.canAttend)
    const [foodAllergies, setFoodAllergies] = useState<string | null>(invitationData.foodAllergies)
    const [message, setMessage] = useState<string | null>(invitationData.message)

    function handleAttendingChange(event: ChangeEvent<HTMLSelectElement>) {
        let attending: boolean
        if (event.target.value === "yes") {
            attending = true
        } else {
            attending = false
        }

        setAttending(attending)
    }

    function handleFoodAllergiesChange(event: ChangeEvent<HTMLInputElement>) {
        setFoodAllergies(event.target.value)
    }

    function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        setMessage(event.target.value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        fetch('http://localhost/5000/invitations/27a1efe8-aace-404f-888a-4d8995a30e0f', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: invitationData.id,
                canAttend: canAttend,
                foodAllergies: foodAllergies,
                message: message
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

    function getAttendingSelectValue(canAttend: boolean): string {
        if (canAttend === true) {
            return 'yes'
        } else if (canAttend === false) {
            return 'no'
        } else {
            return ''
        }
    }

    return (
        <form onSubmit={handleSubmit} className='min-h-full flex justify-center items-center font-sans'>
            <div className='space-y-6 bg-stone-50 rounded-xl drop-shadow-xl p-5 grid-cols-1 w-96'>
                <label className='flex-col'>
                    <div className='w-full'>Are you able to attend?</div>
                    <select value={getAttendingSelectValue(canAttend)} onChange={handleAttendingChange} className='w-full my-1 rounded-lg bg-white border border-gray-300 p-1'>
                        <option value=''></option>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                    </select>
                </label>
                <label className='flex-col'>
                    <div className='w-full'>Dietary requirements</div>
                    <input type='text' value={foodAllergies || ''} onChange={handleFoodAllergiesChange}
                        className='my-1 w-full rounded-lg border border-gray-300 p-2'
                    />
                </label>
                <label className='flex-col'>
                    <div className='w-full'>Leave us a message!</div>
                    <textarea value={message || ''} rows={5} onChange={handleMessageChange}
                        className='my-1 w-full rounded-lg border border-gray-300 p-2'
                    />
                </label>
                <button type='submit'
                    className='bg-rose-300 btn hover:bg-rose-100 font-medium py-2 px-4 rounded-full'>
                    Submit
                </button>
            </div>
        </form>
    )
}

export default RSVPForm
