import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideProps } from 'lucide-react'

export type CardDetailProps = {
  title: string
  description: string
  content: Array<{
    title: string
    value: string | React.ReactNode
    Icon?: React.ComponentType<LucideProps>
  }>
}

export const CardDetail = ({ title, description, content }: CardDetailProps) => (
  <article className="mx-auto max-w-3xl p-4">
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-400">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {content.map(({ title, value, Icon }, index) => (
            <div key={index} className="contents">
              <div className="flex">
                {Icon ? <Icon className="mr-2" /> : null}
                <span>{title}:</span>
              </div>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </article>
)
