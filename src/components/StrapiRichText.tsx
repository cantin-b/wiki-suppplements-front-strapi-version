import React from 'react'
import { StrapiTextNode, StrapiBlock } from '@/types/supplement'


export default function StrapiRichText({ blocks }: { blocks: StrapiBlock[] }) {
	if (!blocks) return null

	return (
		<div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
			{blocks.map((block, idx) => {
				switch (block.type) {
					case 'heading':
						const Tag = `h${block.level}` as keyof JSX.IntrinsicElements
						const headingSizes = {
							1: 'text-4xl',
							2: 'text-3xl',
							3: 'text-2xl',
							4: 'text-xl',
							5: 'text-lg',
							6: 'text-base'
						}

						return (
							<Tag
								key={idx}
								className={`mt-6 mb-3 font-bold text-zinc-900 dark:text-white ${headingSizes[block.level as keyof typeof headingSizes]}`}
							>
								{renderText(block.children)}
							</Tag>
						)

					case 'paragraph':
						return (
							<p key={idx} className="mb-4 text-base leading-relaxed">
								{renderText(block.children)}
							</p>
						)
					case 'list':
						const ListTag = block.format === 'unordered' ? 'ul' : 'ol'
						return (
							<ListTag key={idx} className="pl-6 mb-4 list-disc">
								{block.children.map((item, i) => (
									<li key={i}>{renderText(item.children)}</li>
								))}
							</ListTag>
						)
					default:
						return null
				}
			})}
		</div>
	)
}

function renderText(children: StrapiTextNode[]): React.ReactNode {
	return children.map((child, i) => {
		// Handle plain text
		if (child.type === 'text') {
			let text = <span key={i}>{child.text}</span>

			if (child.bold) text = <strong>{text}</strong>
			if (child.italic) text = <em>{text}</em>
			if (child.underline) text = <u>{text}</u>

			return <React.Fragment key={i}>{text}</React.Fragment>
		}

		// Handle links
		if (child.type === 'link') {
			return (
				<a
					key={i}
					href={child.url}
					className="text-zinc-600 underline hover:text-zinc-800"
				>
					{renderText(child.children)} 
				</a>
			)
		}

		return null
	})
}

