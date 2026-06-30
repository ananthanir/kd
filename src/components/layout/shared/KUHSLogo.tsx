'use client'

import Image from 'next/image'

type Props = {
  /** Controls text visibility with a smooth transition — used by the collapsible student sidebar. Defaults to true. */
  textVisible?: boolean
  /** Duration in ms that matches the sidebar collapse animation. Defaults to 250. */
  transitionDuration?: number
}

const KUHSLogo = ({ textVisible = true, transitionDuration = 250 }: Props) => (
  <div className='flex items-center gap-2 shrink-0'>
    <Image
      src='/images/logos/kuhs-logo.png'
      alt='KUHS'
      width={32}
      height={32}
      className='object-contain shrink-0'
      priority
    />
    {/* Text hidden below sm (640 px); on larger screens it fades with sidebar collapse */}
    <div
      className='hidden sm:block leading-none overflow-hidden whitespace-nowrap'
      style={{
        opacity:   textVisible ? 1 : 0,
        maxWidth:  textVisible ? 200 : 0,
        transition: `opacity ${transitionDuration * 0.6}ms ease, max-width ${transitionDuration}ms ease`,
      }}
    >
      <p className='text-[11px] font-extrabold m-0 leading-tight' style={{ color: 'var(--mui-palette-text-primary)' }}>
        Kerala University of
      </p>
      <p className='text-[11px] font-extrabold m-0 leading-tight' style={{ color: 'var(--mui-palette-text-primary)' }}>
        Health Sciences
      </p>
    </div>
  </div>
)

export default KUHSLogo
