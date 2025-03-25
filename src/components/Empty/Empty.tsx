import Image from 'next/image'

export const Empty = () => (
  <main className="relative flex flex-col items-center justify-center p-4">
    <Image src="/empty.png" alt="Empty" width={700} height={700} />
  </main>
)
