import React, { useState } from 'react';

export default function InviationMessage() {
    return (
        <div className='grid-cols-1 py-5 items-center justify-center text-center'
        >
            <p className=''>Dear Dale and Kate</p>
            <p className=''>We are excited to invite you to the wedding of</p>
            <h1 className='text-4xl p-4 text-center '>Cindy and Jason</h1>
            <p className=''>on the</p>
            <div className='text-4xl p-4 text-center'>14th of March 2024</div>
        </div>
    )
}
