const UniversityDashboard = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-bold text-[#2D336B] m-0'>University Dashboard</h1>
        <p className='text-sm text-gray-500 mt-1 m-0'>Kerala University of Health Sciences — Admin Overview</p>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          { label: 'Affiliated Colleges', value: '203', icon: 'ri-building-line', color: '#48A6A7' },
          { label: 'Total Students', value: '42,800', icon: 'ri-graduation-cap-line', color: '#2D336B' },
          { label: 'Active Programs', value: '58', icon: 'ri-book-2-line', color: '#48A6A7' },
          { label: 'Exam Centres', value: '87', icon: 'ri-pencil-ruler-2-line', color: '#2D336B' },
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

      <div className='bg-white rounded-2xl border border-[#E0DDD6] p-6 shadow-sm'>
        <p className='text-sm text-gray-400 text-center m-0'>
          Use the top navigation bar to manage colleges, programs, examinations, and reports.
        </p>
      </div>
    </div>
  )
}

export default UniversityDashboard
