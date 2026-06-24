import { INSTRUCTIONS, USER_TYPES } from "@/constants/login/userTypesConstants"


type Props = {
  selected: string
  onChange: (id: string) => void
}

const UserTypeSelector = ({ selected, onChange }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {/* Section heading */}
      <div className='flex items-center gap-3'>
        <div className='flex-1 h-[1.5px] bg-kuhs-primary' />
        <span className='text-sm font-semibold text-kuhs-navy whitespace-nowrap'>Login As</span>
        <div className='flex-1 h-[1.5px] bg-kuhs-primary' />
      </div>

      {/* User type cards */}
      <div className='grid grid-cols-4 gap-2'>
        {USER_TYPES.map(type => {
          const isActive = selected === type.id
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={[
                'relative flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border-2 transition-all cursor-pointer bg-white',
                isActive
                  ? 'border-kuhs-primary bg-kuhs-primary-subtle'
                  : 'border-kuhs-border hover:border-kuhs-primary/50',
              ].join(' ')}
            >
              {isActive && (
                <span className='absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-kuhs-primary flex items-center justify-center'>
                  <i className='ri-check-line text-white text-[10px]' aria-hidden='true' />
                </span>
              )}
              <i
                className={`${type.icon} text-xl ${isActive ? 'text-kuhs-primary' : 'text-kuhs-primary/70'}`}
                aria-hidden='true'
              />
              <span className={`text-xs font-semibold ${isActive ? 'text-kuhs-primary' : 'text-kuhs-navy'}`}>
                {type.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Instructions panel */}
      <div className='rounded-xl border border-kuhs-primary/40 bg-kuhs-primary-subtle p-3 flex flex-col gap-1.5'>
        <div className='flex items-center gap-2 mb-0.5'>
          <i className='ri-information-line text-kuhs-primary text-base' aria-hidden='true' />
          <span className='text-xs font-bold text-kuhs-navy'>Instructions</span>
        </div>
        {INSTRUCTIONS.map(instruction => (
          <div key={instruction} className='flex items-start gap-2'>
            <i className='ri-checkbox-circle-fill text-kuhs-primary text-xs mt-0.5 shrink-0' aria-hidden='true' />
            <span className='text-xs text-kuhs-navy'>{instruction}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserTypeSelector
