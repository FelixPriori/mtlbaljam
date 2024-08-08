'use client'
import { sendEmail } from '@/app/api/contact/_sendEmail'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styles from './styles.module.scss'

export default function ContactForm() {
	const [isSuccess, setIsSuccess] = useState(false)
	const t = useTranslations('MtlBalJam.contact')

	const handleSubmit = async (data: FormData) => {
		try {
			await sendEmail(data)
			toast.success(t('success'), {
				className: 'mbj-toast-success',
			})
			setIsSuccess(true)
		} catch {
			toast.error(t('error'))
		}
	}

	return !isSuccess ? (
		<form className="mbj-form" action={handleSubmit}>
			<fieldset className="mbj-fieldset">
				<label className="mbj-label" htmlFor="contactFullName">
					{t('fullName')}
				</label>
				<input
					className="mbj-field"
					required
					id="contactFullName"
					name="fullName"
					type="text"
					placeholder={t('fullNamePlaceholder')}
				/>
			</fieldset>
			<fieldset className="mbj-fieldset">
				<label className="mbj-label" htmlFor="contactEmail">
					{t('email')}
				</label>
				<input
					className="mbj-field"
					required
					id="contactEmail"
					name="email"
					type="email"
					placeholder={t('emailExample')}
				/>
			</fieldset>
			<fieldset className="mbj-fieldset">
				<label className="mbj-label" htmlFor="contactMessage">
					{t('message')}
				</label>
				<textarea
					className="mbj-field"
					required
					id="contactMessage"
					name="message"
					rows={5}
					placeholder={t('messagePlaceholder')}
				/>
			</fieldset>
			<div className="mbj-button-container">
				<button className="mbj-button" type="submit">
					{t('send')}
				</button>
			</div>
		</form>
	) : (
		<p className={styles.success}>{t('success')}</p>
	)
}
