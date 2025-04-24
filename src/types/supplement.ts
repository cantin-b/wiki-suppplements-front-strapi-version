export type StrapiTextChild = {
    text: string
    type: string
  }
  
  export type StrapiBlock = {
    type: string
    children: StrapiTextChild[]
  }
  
  type SupplementImage = {
    name: string
    url?: string
  }
  
  export type Supplement = {
    id: number
    documentId: string
    name: string
    slug: string
    short_description: string
    introduction: StrapiBlock[]
    full_description: StrapiBlock[]
    image: SupplementImage[]
    benefits?: StrapiBlock[]
    recommended_dosage?: StrapiBlock[]
    cycling_guidelines?: StrapiBlock[]
    potential_side_effects?: StrapiBlock[] | null
    natural_sources?: string
    scientific_name?: string
    origin_country?: string
    available_status: 'AVAILABLE' | 'UNAVAILABLE'
    is_featured?: boolean | null
    createdAt: string
    updatedAt: string
    publishedAt?: string
    locale: string
  }
  