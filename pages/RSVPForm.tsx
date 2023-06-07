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

    const [canAttend, setAttending] = useState<boolean>(invitationData?.canAttend)
    const [foodAllergies, setFoodAllergies] = useState<string | null>(invitationData?.foodAllergies)
    const [message, setMessage] = useState<string | null>(invitationData?.message)
    const [inDraft, setInDraft] = useState<boolean>(true)
    const [sending, setSending] = useState<boolean>(false);

    function handleAttendingChange(event: ChangeEvent<HTMLSelectElement>) {
        let attending: boolean
        if (event.target.value === "yes") {
            attending = true
        } else {
            attending = false
        }

        setAttending(attending)
        setInDraft(true)
    }

    function handleFoodAllergiesChange(event: ChangeEvent<HTMLInputElement>) {
        setFoodAllergies(event.target.value)
        setInDraft(true)
    }

    function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        setMessage(event.target.value)
        setInDraft(true)
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

    async function saveInvitation() {
        const maxRetries = 5;
        const delay = 5000;
        let tries = 0;

        while (tries < maxRetries) {
            try {
                const response = await fetch('https://windows-rsvp-backend.azurewebsites.net/invitations/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: invitationData.id,
                        canAttend: canAttend,
                        foodAllergies: foodAllergies,
                        message: message
                    }),
                });

                console.log('RSVP submitted successfully:', response);

                return;

            } catch (error: any) {
                console.error('Error submitting RSVP:', error);
                tries += 1
                await new Promise(r => setTimeout(r, delay));
            }
        }

        console.error('Max retries attempted for saving invitation.');
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setSending(true);

        let minWaitTime = new Promise(r => setTimeout(r, 750));
        let saveInvitationPromise = saveInvitation();

        await Promise.all([minWaitTime, saveInvitationPromise]);

        setInDraft(false)
        setSending(false)
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
                <div className="flex">
                    <div className="font-medium rounded-full double-confirm overflow-hidden">
                        <div className={!inDraft ? 'transform transition duration-500 ease-in-out -translate-x-full'
                            : 'transform transition duration-500 ease-in-out'} >
                            <button type='submit'
                                disabled={sending}
                                className={sending ? 'py-2 px-4 bg-rose-300 disabled:bg-rose-100 btn hover:bg-rose-100 animate-pulse' 
                                : 'py-2 px-4 bg-rose-300 disabled:bg-rose-100 btn hover:bg-rose-100 focus:bg-rose-100 focus:rounded-full'} >
                                Submit
                            </button>
                            <button disabled
                                className='absolute py-2 px-4 bg-green-200 btn' >
                                Thanks!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default RSVPForm
