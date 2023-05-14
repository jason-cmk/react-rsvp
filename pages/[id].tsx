import RSVPForm from './RSVPForm'
import InvitationMessage from './InvitationMessage'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    type InvitationModel = {
        id: string;
        name: string;
        canAttend: boolean;
        foodAllergies: string;
        message: string;
    }

    const [invitationData, setInvitationData] = useState<InvitationModel | null>()
    const router = useRouter()

    useEffect(() => {
        axios.get<InvitationModel>('http://localhost:5000/invitations/' + router.query.id)
            .then(response => setInvitationData(response.data))
            .catch(error => console.error('ohhhhh shit i could not load: ' + error))
    }, [router])

    return (
        <main className='flex min-h-screen flex-col items-center bg-gradient-to-b from-rose-400 to-rose-200'>
            <div className='rounded-md columns-1 container bg-stone-100 text-black font-serif m-10 p-5 drop-shadow-md'>
                <div className='flex justify-center items-center'>
                    {/* eslint-disable-next-line */}
                    <img src='/charlie_rough.png' alt='Charlie the cat' className='max-w-sm p-5' />
                </div>
                {invitationData &&
                    <InvitationMessage invitee={invitationData.name} />
                }
                {invitationData &&
                    <RSVPForm invitationData={invitationData} />
                }
            </div>
        </main>
    )
}
