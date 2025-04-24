import ReactMardown from 'react-markdown'
import { strapiBlocksToMarkdown } from '@/utils/strapiMarkdownHelper'
import type { Supplement } from '@/types/supplement'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  supplement: Supplement
  className?: string
}

export default function Supplement({ supplement, className }: Props) {
  const intro = strapiBlocksToMarkdown(supplement.introduction)
  const content = strapiBlocksToMarkdown(supplement.full_description)
  const imageUrl = supplement.image?.[0].url
  const imageAlt = supplement.image?.[0]?.name ?? supplement.name

  return (
    <div className={className}>
      {/* <article className='prose prose-lg max-w-none'> */}
      <article
        className="
      prose prose-lg max-w-none
      prose-p:mb-2
      prose-h1:mb-6
      prose-h2:mb-2 prose-h3:mb-2
      prose-ul:my-2 prose-ol:my-2
      prose-hr:my-4
      mt-20">
        {/* <h1>{supplement.name}</h1> */}
        {/* <p className='text-muted-foreground'>{supplement.short_description}</p> */}
        <ReactMardown
          components={{
            a: ({ href, children }) =>
              href?.startsWith('/')
                ? <Link href={href}>{children}</Link>
                : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
            
            strong: ({ children }) => (
              <strong className="custom-strong">{children}</strong>
            ),
          }}
        >
          {intro}
        </ReactMardown>
          {imageUrl && (
            <Image
              src={`${process.env.STRAPI_URL}${imageUrl}`}
              alt={imageAlt}
              width={800}
              height={500}
              className="w-full h-auto rounded-lg my-6"
            />
          )}
        <ReactMardown
          components={{
            a: ({ href, children }) =>
              href?.startsWith('/')
                ? <Link href={href}>{children}</Link>
                : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
            
            strong: ({ children }) => (
              <strong className="custom-strong">{children}</strong>
            ),
          }}
        >
          {content}
        </ReactMardown>
      </article>
    </div>
  )
}
