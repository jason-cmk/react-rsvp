export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center bg-gradient-to-b from-rose-400 to-rose-200'>
            <div className='rounded-md columns-1 container bg-stone-100 text-black font-serif m-10 p-5 drop-shadow-md'>
                <div className='flex justify-center items-center'>
                    {/* eslint-disable-next-line */}
                    <img src='/charlie_rough.png' alt='Charlie the cat' className='max-w-sm p-5' />
                </div>
            </div>
        </main>
    )
}
