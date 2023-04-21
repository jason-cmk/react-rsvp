import React, { useState, ChangeEvent, FormEvent } from 'react';

function RSVPForm() {
    const [attending, setAttending] = useState<string | null>(null);
    const [foodAllergies, setFoodAllergies] = useState<string | null>(null);

    function handleAttendingChange(event: ChangeEvent<HTMLSelectElement>) {
        setAttending(event.target.value);
    }

    function handleFoodAllergiesChange(event: ChangeEvent<HTMLInputElement>) {
        setFoodAllergies(event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
                console.log('RSVP submitted successfully:', data);
            })
            .catch(error => {
                console.error('Error submitting RSVP:', error);
            });
    }

    return (
        <div className="flex min-h-full justify-center 
        //bg-blue-50"
        >
            <form onSubmit={handleSubmit}
                className="mt-8 space-y-6 bg-stone-50 rounded-md drop-shadow-md p-5 grid-cols-1">
                <div>
                    <label>
                        Are you able to attend?
                        <select value={attending || ''} onChange={handleAttendingChange} className='ml-3 border'>
                            <option value=""></option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Food allergies:
                        <input type="text" value={foodAllergies || ''} onChange={handleFoodAllergiesChange}
                            className='ml-3 border'
                        />
                    </label>
                </div>
                <br />
                <button type="submit"
                    className='border bg-stone-50'>
                    Submit RSVP
                </button>
            </form>
        </div>
    );
}

export default RSVPForm;
