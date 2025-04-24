import Supplement from '@/components/supplement'
import RelatedSupplementNavigation from '@/components/RelatedSupplementsNavigation'

export default async function SupplementPage({ params }: { params: { slug: string } }) {
  const strapiUrl = process.env.STRAPI_API_URL
  const token = process.env.API_TOKEN_READ_ONLY

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const supplementQuery = `${strapiUrl}/supplements?filters[slug][$eq]=${params.slug}&populate[related_supplements][populate][supplement][fields][0]=name&populate[related_supplements][populate][supplement][fields][1]=slug`
  const imageQuery = `${strapiUrl}/supplements?filters[slug][$eq]=${params.slug}&populate=image`

  // Fetching twice the API because of Strapi limitation of populating twice
  const [supplementRes, imageRes] = await Promise.all([
    fetch(supplementQuery, { headers }),
    fetch(imageQuery, { headers })
  ])
  

  if (!supplementRes.ok || !imageRes.ok) {
    const errText = !supplementRes.ok
      ? await supplementRes.text()
      : await imageRes.text()
    console.error('Fetch failed:', errText)
    return <div>Fetch failed</div>
  }

  const [supplementData, imageData] = await Promise.all([
    supplementRes.json(),
    imageRes.json()
  ])

  console.log('supplementData ', supplementData)
  console.log('imageData ', imageData)

  const supplement = {
    ...supplementData.data?.[0],
    image: imageData.data?.[0]?.image
  }

  if (!supplementData.data?.[0]) return <div>Supplement not found</div>

  return (
    <>
      <Supplement supplement={supplement} className="xl:w-3/4 lg:pl-20" />
      <RelatedSupplementNavigation relatedSupplements={supplement?.related_supplements} className="mt-16 xl:w-3/4 lg:pl-20" />
    </>
  )
}
