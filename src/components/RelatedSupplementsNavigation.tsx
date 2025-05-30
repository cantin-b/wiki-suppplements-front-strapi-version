import Link from "next/link"
import { Button } from '@/components/Button'
import { Supplement } from '@/types/supplement'


export default async function RelatedSupplementNavigation({
  previous,
  next,
  className
}: {
  previous: Supplement,
  next: Supplement,
  className?: string
}) {

  if (!previous && !next) return null

  return (
    <div className={`flex ${className}`}>
      {previous && (
        <div className="flex flex-col items-start gap-3">
          <Button
            href={`/supplements/${previous.slug}`}
            aria-label="Previous"
            variant="secondary"
            arrow='left'
          >
            Previous
          </Button>
          <Link
            href={`/supplements/${previous.slug}`}
            className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
          >
            {previous.name}
          </Link>
          

        </div>
      )}
      {next && (
        <div className="ml-auto flex flex-col items-end gap-3">
          <Button
            href={`/supplements/${next.slug}`}
            aria-label="Next"
            variant="secondary"
            arrow='right'
          >
            Next
          </Button>
          <Link
            href={`/supplements/${next.slug}`}
            className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
          >
            {next.name}
          </Link>
        </div>
      )}
    </div>
  )
}
