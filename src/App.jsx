import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Chat from './components/Chat'
import './App.css'
import { Header } from './components/Header'

const App = () => {
	const [idInstance, setIdInstance] = useState('')
	const [apiTokenInstance, setApiTokenInstance] = useState('')
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const handleLogin = (id, token) => {
		setIdInstance(id)
		setApiTokenInstance(token)
		setIsAuthenticated(true)
	}

	useEffect(() => {
		const credentials = JSON.parse(localStorage.getItem('Credentials'))
		if (credentials) {
			setIdInstance(credentials.idInstance)
			setApiTokenInstance(credentials.apiTokenInstance)
			setIsAuthenticated(true)
		}
		setIsLoading(false)
	}, [])

	if (isLoading) {
		return null
	}

	return (
		<>
			<Header />
			<main>
			{!isAuthenticated ? (
				<LoginForm onLogin={handleLogin} />
			) : (
				<Chat
					idInstance={idInstance}
					apiTokenInstance={apiTokenInstance}
				/>
			)}

			</main>
		
		</>
	)
}

export default App
