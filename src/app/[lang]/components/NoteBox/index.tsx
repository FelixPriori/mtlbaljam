import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

interface NoteBoxProps {
	variant?: 'solid' | 'dotted'
	className?: string
	children: ReactNode
}

export default function NoteBox({ variant = 'solid', className, children }: NoteBoxProps) {
	return (
		<div className={clsx(styles.noteBox, styles[variant], className)}>
			{children}
		</div>
	)
}
