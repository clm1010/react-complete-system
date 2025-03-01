'use client'

export default function Success() {
  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <h2 className='text-6xl mb-10'>提交成功！</h2>
      <button
        className='m:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 inline-block text-2xl'
        // onClick={
        //   // Attempt to recover by trying to re-render the segment
        //   () => reset()
        // }
      >
        Try again
      </button>
    </div>
  )
}
