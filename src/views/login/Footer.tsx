// views/login/Footer.tsx

import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='w-full max-w-6xl mx-auto bg-white rounded-[20px] shadow-md border border-kuhs-border/60 shrink-0'>
      {/* Desktop: horizontal */}
      <div className='hidden lg:flex items-center justify-between px-8 py-4'>
        <div className='flex items-center gap-2'>
          <Image src='/images/logos/kba-logo.png' alt='Kerala Blockchain Academy' width={36} height={36} className='object-contain' />
          <div className='leading-tight'>
            <p className='text-[10px] font-bold text-kuhs-navy m-0'>Kerala</p>
            <p className='text-[10px] font-bold text-kuhs-navy m-0'>Blockchain</p>
            <p className='text-[10px] font-bold text-kuhs-navy m-0'>Academy</p>
          </div>
        </div>
        <div className='text-center'>
          <p className='text-[10px] text-gray-500 m-0'>Designed, Developed and Implemented by</p>
          <p className='text-[11px] font-bold text-kuhs-navy m-0'>Kerala Blockchain Academy (KBA)</p>
          <p className='text-[10px] text-gray-400 m-0 mt-0.5'>A Centre of Excellence Established by Digital University Kerala.</p>
        </div>
        <div className='flex items-center gap-2'>
          <Image src='/images/logos/duk.png' alt='Digital University Kerala' width={100} height={50} className='object-contain' />
        </div>
      </div>

      {/* Mobile: vertical stacked center */}
      <div className='lg:hidden flex flex-col items-center gap-3 px-6 py-4 text-center'>
        <Image src='/images/logos/kba-logo.png' alt='Kerala Blockchain Academy' width={40} height={40} className='object-contain' />
        <div>
          <p className='text-[10px] text-gray-500 m-0'>Designed, Developed and Implemented by</p>
          <p className='text-xs font-bold text-kuhs-navy m-0'>Kerala Blockchain Academy (KBA)</p>
          <p className='text-[10px] text-gray-400 m-0 mt-0.5'>A Centre of Excellence Established by Digital University Kerala.</p>
        </div>
        <Image src='/images/logos/duk.png' alt='Digital University Kerala' width={40} height={40} className='object-contain' />
      </div>
    </footer>
  )
}

export default Footer
