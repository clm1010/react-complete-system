// app/success/page.tsx
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Submission Successful!</h1>
      <p>Your questionnaire has been submitted successfully.</p>
      <br />
      <Link href='/'>Go back to Home</Link>
      <br />
      <Link href='/questionnaire/new'>Submit another questionnaire</Link>
    </div>
  )
}
