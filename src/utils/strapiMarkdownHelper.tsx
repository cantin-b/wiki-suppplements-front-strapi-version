import { StrapiTextChild, StrapiBlock } from '@/types/supplement'

export function strapiBlocksToMarkdown(blocks: StrapiBlock[] | null | undefined): string {
  if (!blocks) return ''
  return blocks
    .map((block) =>
      block?.children?.map((child) => child.text).join('') ?? ''
    )
    .join('\n')
}