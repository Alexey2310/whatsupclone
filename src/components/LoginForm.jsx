import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types' // Import PropTypes for validation
import { checkCredentials } from '../api/green-api'
const LoginForm = ({ onLogin }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm()

	const onSubmit = async (data) => {
		const { idInstance, apiTokenInstance } = data

		try {
			await checkCredentials(idInstance, apiTokenInstance)
			onLogin(idInstance, apiTokenInstance)
			localStorage.setItem(
				'Credentials',
				JSON.stringify({ idInstance, apiTokenInstance })
			)
		} catch(error)
		 {
			setError('apiTokenInstance', {
				type: 'manual',
				message: error.message
			})
			
		}
	}

	return (
		<form
			className='loginform'
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1>Введите учетные данные</h1>
			<div className='form-inputs'>
				<input
					{...register('idInstance', {
						required: 'IDInstance is required'
					})}
					placeholder='idInstance'
				/>
				{errors.idInstance && (
					<p>{errors.idInstance.message}</p>
				)}

				<input
					{...register('apiTokenInstance', {
						required: 'APITokenInstance is required'
					})}
					placeholder='apiTokenInstance'
				/>
				{errors.apiTokenInstance && (
					<p>{errors.apiTokenInstance.message}</p>
				)}
			</div>

			<button type='submit'>Login</button>
		</form>
	)
}

// Prop validation
LoginForm.propTypes = {
	onLogin: PropTypes.func.isRequired
}

export default LoginForm
