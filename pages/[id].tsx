import RSVPForm from './RSVPForm'
import InvitationMessage from './InvitationMessage'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

async function getInvitationData(id: string) {
    const maxRetries = 5;
    const delay = 5000;
    let tries = 0;

    while (tries < maxRetries) {
        try {
            var response = await fetch('https://windows-rsvp-backend.azurewebsites.net/invitations/' + id);

            return response

        } catch {
            tries += 1
            await new Promise(r => setTimeout(r, delay));
        }
    }
}

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
        async function fetchInvitationData(): Promise<void> {
            if (typeof (router.query.id) !== 'string') {
                console.error('Unabale to read invitation ID from query parameter.');
                return;
            }

            try {
                const response = await getInvitationData(router.query.id);

                if (response === undefined) {
                    throw new Error('Response undefined!');
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: InvitationModel = await response.json();

                setInvitationData(data);

            } catch (error) {
                console.error('ohhhhh shit i could not load: ' + error);
            }
        }

        fetchInvitationData()
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
