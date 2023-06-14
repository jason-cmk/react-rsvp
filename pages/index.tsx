import { useState } from "react"

export default function Home() {
    const [spin, setSpin] = useState<boolean>(false)

    function handleCharlieTapped(): void {
        setSpin(!spin);
    }

    return (
        <main className='flex min-h-screen flex-col items-center bg-gradient-to-b from-rose-400 to-rose-200'>
            <div className='rounded-md columns-1 container bg-stone-100 text-black font-serif m-10 p-5 drop-shadow-md'>
                <div className={spin
                        ? 'animate-spin flex justify-center items-center'
                        : 'flex justify-center items-center'}>
                    {/* eslint-disable-next-line */}
                    <img src='/charlie_rough.png' alt='Charlie the cat' className='max-w-sm p-5 overflow-auto' onClick={handleCharlieTapped} />
                </div>

                <div className='text-red-500 font-bold text-2xl font-sans grid-cols-1 py-5 items-center justify-center text-center
                hover:animate-pulse underline-offset-2' >
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">ADMIN PAGE</a>
                </div>
            </div>
        </main>
    )
}
