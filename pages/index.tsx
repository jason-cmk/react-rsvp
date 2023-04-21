import RSVPForm from './RSVPForm'
import InvitationMessage from './InvitationMessage'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-rose-400 to-rose-200">
            <div className="rounded-md columns-1 container bg-stone-50 text-black font-serif m-10 p-5 drop-shadow-md">
                <p className='text-center'>You are invited to the wedding of</p>
                <h1 className='text-4xl p-5 text-center '>Cindy and Jason</h1>
                <InvitationMessage />
                <RSVPForm />
            </div>
        </main>
    )
}
