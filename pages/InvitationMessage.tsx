import React from 'react';

export default function InviationMessage(props: { invitee: string }) {
    return (
        <div className='grid-cols-1 py-5 items-center justify-center text-center' >
            <p className='text-xl'>Dear <span className='italic'>{props.invitee}</span></p>
            <p className='text-xl'>we are excited to invite you to celebrate the wedding of</p>
            <h1 className='text-4xl p-4 text-center'>Cindy and Jason</h1>
            <p className='text-xl'>on</p>
            <div className='text-4xl p-4 text-center'>Thursday 14th of March 2024</div>
            <p className='text-xl'>at</p>
            <div className='text-4xl p-4 text-center'>
                <a href="https://goo.gl/maps/ftAd66DC2jx5NdHr6">Bridgewater Estate <span className='bg-gray-50 hover:bg-gray-300 transition-all duration-200 rounded-lg border border-gray-300'>🗺️📍</span></a>
            </div>
        </div>
    )
}
