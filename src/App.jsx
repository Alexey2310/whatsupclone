import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Chat from './components/Chat'
import './App.css'
import { Header } from './components/Header'

const App = () => {
	const [idInstance, setIdInstance] = useState('')
	const [apiTokenInstance, setApiTokenInstance] =
		useState('')
	const [isAuthenticated, setIsAuthenticated] =
		useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const handleLogin = (id, token) => {
		setIdInstance(id)
		setApiTokenInstance(token)
		setIsAuthenticated(true)
	}
	useEffect(() => {
		const credentials = JSON.parse(
			localStorage.getItem('Credentials')
		)
		if (credentials) {
			setIdInstance(credentials.idInstance)
			setApiTokenInstance(credentials.apiTokenInstance)
			setIsAuthenticated(true)
		}
		setIsLoading(false) // Завершаем загрузку
	}, [])

	// Если данные еще загружаются, ничего не отображаем
	if (isLoading) {
		return null // Или можно вернуть лоадер: <div>Loading...</div>
	}
	return (
		<>
		<Header/>
			{!isAuthenticated ? (
				<LoginForm onLogin={handleLogin} />
			) : (
        
				<Chat
					idInstance={idInstance}
					apiTokenInstance={apiTokenInstance}
				/>
			)}
		</>
	)
}

export default App
