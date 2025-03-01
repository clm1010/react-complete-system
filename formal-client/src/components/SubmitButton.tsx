'use client'

export default function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type='submit'
      disabled={isPending}
      className='w-full font-bold cursor-pointer text-center text-white tracking-widest'
    >
      {isPending && '提交中...' || '提交'}
    </button>
  )
}
