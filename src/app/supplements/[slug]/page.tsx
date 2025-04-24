import Supplement from '@/components/supplement'
import RelatedSupplementNavigation from '@/components/RelatedSupplementsNavigation'
import { Supplement as SupplementType } from '@/types/supplement'
import { STRAPI_API_URL, API_TOKEN_READ_ONLY } from '@/constants/env'


export default async function SupplementPage({ params }: { params: { slug: string } }) {

  const headers = {
    Authorization: `Bearer ${API_TOKEN_READ_ONLY}`,
  }

  const sortedSupplementsQuery = `${STRAPI_API_URL}/supplements?locale=en&populate=image&sort=name:asc`
  let fetchFailed = false
  let errText = ''

  const sortedSupplements = await fetch(sortedSupplementsQuery, { headers })
    .then(async (res )=> {
      if (!res.ok) {
        fetchFailed = true
        errText = await res.text()
        return null
      }
      return res.json()
    })
    .then(list => list.data)

  const currentIndex = sortedSupplements.findIndex((s: SupplementType) => s.slug === params.slug)
  const supplement = sortedSupplements[currentIndex]

  const previous = 
    currentIndex === 0 
    ? sortedSupplements[sortedSupplements.length - 1] 
    : sortedSupplements[currentIndex - 1]
  const next = 
    currentIndex === sortedSupplements.length - 1 
    ? sortedSupplements[0] 
    : sortedSupplements[currentIndex + 1]

  if (fetchFailed) {
    console.error('Fetch failed:', errText)
    return <div>Fetch failed</div>
  }

  if (!supplement) return <div>Supplement not found</div>

  return (
    <>
      <Supplement supplement={supplement} className="xl:w-3/4 lg:pl-20" />
      <RelatedSupplementNavigation 
        previous={previous}
        next={next}
        className="mt-16 xl:w-3/4 lg:pl-20" 
      />
    </>
  )
}
