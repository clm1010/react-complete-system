import { Button, Link } from '@heroui/react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>问卷调查</h1>
      <Button color="secondary" as={Link} href="/question/123">
        开始问卷
      </Button>
    </div>
  )
}
