import { redirect } from 'next/navigation'

// Redirect the user to the default locale when the app root is requested
export default function RootPage() {
	redirect('/fr')
}
