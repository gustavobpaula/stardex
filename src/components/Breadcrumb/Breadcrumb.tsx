import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export type BreadcrumbProps = {
  items: Array<{
    label: string
    url?: string
  }>
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const getLastItem = items[items.length - 1]
  const itemsWithoutLast = items.slice(0, items.length - 1)

  return (
    <BreadcrumbUI>
      <BreadcrumbList>
        {itemsWithoutLast.map((item, index) => (
          <div key={index} className="contents">
            <BreadcrumbItem>
              <BreadcrumbLink href={item?.url || '#'}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{getLastItem.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbUI>
  )
}
