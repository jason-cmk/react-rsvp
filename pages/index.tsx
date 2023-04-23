import RSVPForm from './RSVPForm'
import InvitationMessage from './InvitationMessage'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-rose-400 to-rose-200">
            <div className="rounded-md columns-1 container bg-stone-50 text-black font-serif m-10 p-5 drop-shadow-md">
                <img src='/charlie_rough.png' className='p-5'/>
                <InvitationMessage />
                <RSVPForm />
            </div>
        </main>
    )
}
