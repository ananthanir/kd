// views/login/UniversityBranding.tsx

import Image from 'next/image'

const UniversityBranding = () => {
    return (
        <div className='flex flex-col items-center gap-2 shrink-0'>
            <Image
                src='/images/logos/kuhs-logo.png'
                alt='kuhs'
                width={110}
                height={110}
                className='object-contain'
                priority
            />
            <h1 className='text-3xl font-bold text-kuhs-navy text-center m-0 leading-tight'>
                Kerala University of Health Sciences
            </h1>
            <p className='text-2xl font-medium text-kuhs-navy text-center m-0'>
                കേരള ആരോഗ്യ ശാസ്‌ത്ര സർവ്വകലാശാല
            </p>
        </div>
    )
}

export default UniversityBranding
