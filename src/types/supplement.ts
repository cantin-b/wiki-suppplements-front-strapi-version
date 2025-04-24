/* Rich Text Types */
export type StrapiTextChild = {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  }

  export type StrapiLinkNode = {
  type: 'link'
  url: string
  children: StrapiTextNode[]
  }

  export type StrapiTextNode = StrapiTextChild | StrapiLinkNode

  export type StrapiBlock =
  | { type: 'paragraph'; children: StrapiTextNode[] }
  | { type: 'heading'; level: number; children: StrapiTextNode[] }
  | { type: 'list'; format: 'unordered' | 'ordered'; children: StrapiListItem[] }
  | { type: 'list-item'; children: StrapiTextNode[] }

  export type StrapiListItem = { type: 'list-item'; children: StrapiTextNode[] }
  
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
  