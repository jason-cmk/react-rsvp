import React from 'react';

export default function InviationMessage(props: { invitee: string }) {
    return (
        <div className='grid-cols-1 py-5 items-center justify-center text-center' >
            <p className=''>Dear <span className='italic'>{props.invitee}</span></p>
            <p className='text-lg'>we are excited to invite you to the wedding of</p>
            <h1 className='text-4xl p-4 text-center '>Cindy and Jason</h1>
            <p className='text-lg'>on the</p>
            <div className='text-4xl p-4 text-center'>14th of March 2024</div>
        </div>
    )
}
