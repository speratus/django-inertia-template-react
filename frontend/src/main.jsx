import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'

import './styles.css'

createInertiaApp({
	resolve: name => {
		const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
		return pages[`./Pages/${name}.jsx`]
	},
	setup({ el, App, pro[s}) {
		createRoot(el).render(<App {...props} />)
	},
})

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'
