const CollegeDashboard = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-bold text-[#2D336B] m-0'>College Dashboard</h1>
        <p className='text-sm text-gray-500 mt-1 m-0'>Welcome back, College Admin</p>
      </div>

      {/* Quick stat cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          { label: 'Total Students', value: '1,248', icon: 'ri-graduation-cap-line', color: '#48A6A7' },
          { label: 'Departments', value: '12', icon: 'ri-building-4-line', color: '#2D336B' },
          { label: 'Courses Offered', value: '36', icon: 'ri-file-list-3-line', color: '#48A6A7' },
          { label: 'Pending Fees', value: '₹4.2L', icon: 'ri-money-rupee-circle-line', color: '#2D336B' },
        ].map(stat => (
          <div
            key={stat.label}
            className='bg-white rounded-2xl border border-[#E0DDD6] p-4 flex items-center gap-3 shadow-sm'
          >
            <div
              className='w-10 h-10 rounded-xl flex items-center justify-center shrink-0'
              style={{ backgroundColor: `${stat.color}18` }}
            >
              <i className={`${stat.icon} text-xl`} style={{ color: stat.color }} aria-hidden='true' />
            </div>
            <div>
              <p className='text-xs text-gray-500 m-0'>{stat.label}</p>
              <p className='text-lg font-bold text-[#2D336B] m-0'>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder content area */}
      <div className='bg-white rounded-2xl border border-[#E0DDD6] p-6 shadow-sm'>
        <p className='text-sm text-gray-400 text-center m-0'>
          Select a section from the top menu to get started.
        </p>
      </div>
    </div>
  )
}

export default CollegeDashboard
