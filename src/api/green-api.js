const apiUrl = 'https://api.green-api.com'

// Check credentials
export const checkCredentials = async (
	idInstance,
	apiTokenInstance
) => {
	try {
		const response = await fetch(
			`${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`,
			{
				method: 'GET'
			}
		)
		if (!response.ok) {
			throw new Error('Неверные данные')
		}
		const data = await response.json()

		return data
	} catch (error) {
		console.error(
			'Error checking credentials:',
			error.message
		)
		throw error
	}
}

// Send message
export const sendMessage = async (
	idInstance,
	apiTokenInstance,
	chatId,
	message
) => {
	try {
		const response = await fetch(
			`${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					chatId: `${chatId}@c.us`,
					message
				})
			}
		)
		if (!response.ok) {
			throw new Error('Failed to send message')
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error sending message:', error)
		throw error
	}
}

// Receive notifications
export const receiveNotification = async (
	idInstance,
	apiTokenInstance,
	seconds = 5
) => {
	try {
		const response = await fetch(
			`${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${seconds}`,
			{
				method: 'GET'
			}
		)
		const data = await response.json()
		console.log(data)
		return data
	} catch (error) {
		console.error('Error receiving notification:', error)
		return null
	}
}

// Delete notification
export const deleteNotification = async (
	idInstance,
	apiTokenInstance,
	receiptId
) => {
	try {
		const response = await fetch(
			`${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
			{
				method: 'DELETE'
			}
		)

		if (!response.ok) {
			if (response.status === 404) {
				console.error('Notification not found')
			} else {
				const errorData = await response.json() // Capture error response
				console.error(
					`Error: ${response.status} ${response.statusText}`,
					errorData
				)
				throw new Error(
					`Error: ${response.status} ${response.statusText}`
				)
			}
		}
	} catch (error) {
		console.error('Error deleting notification:', error)
	}
}
