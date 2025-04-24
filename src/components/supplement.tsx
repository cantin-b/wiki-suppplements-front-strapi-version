import StrapiRichText from './StrapiRichText'
import type { Supplement as SupplemenType } from '@/types/supplement'
import Image from 'next/image'


type Props = {
  supplement: SupplemenType
  className?: string
}

export default function Supplement({ supplement, className }: Props) {
  const imageUrl = supplement.image?.[0].url
  const imageAlt = supplement.image?.[0]?.name ?? supplement.name

  return (
    <div className={className}>
      <StrapiRichText blocks={supplement.introduction} />
          {imageUrl && (
            <Image
              src={`${process.env.STRAPI_URL}${imageUrl}`}
              alt={imageAlt}
              width={800}
              height={500}
              className="w-full h-auto rounded-lg my-6"
            />
          )}
        <StrapiRichText blocks={supplement.full_description} />
    </div>
  )
}
