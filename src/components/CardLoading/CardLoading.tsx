import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const CardLoading = () => {
  return (
    <Card
      className="w-full max-w-xs justify-self-center"
      aria-busy="true"
      aria-label="Loading card content"
      role="region"
    >
      <CardHeader className="flex justify-between">
        <CardTitle>
          <Skeleton className="h-6 w-[200px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2">
          <Skeleton className="my-2 h-4 w-[100px]" />
          <Skeleton className="my-2 h-4 w-[100px] justify-self-end" />
          <Skeleton className="my-2 h-4 w-[100px]" />
          <Skeleton className="my-2 h-4 w-[100px] justify-self-end" />
        </div>
      </CardContent>
      <CardFooter className="inline-flex justify-center">
        <Skeleton className="h-8 w-[150px]" />
      </CardFooter>
    </Card>
  )
}
