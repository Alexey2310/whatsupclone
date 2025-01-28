import { useState ,useRef, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import useChatNotifications from '../hooks/useChatNotifications' 
import clsx from 'clsx'
import ChatForm from './ChatForm'
import { FcOk } from "react-icons/fc";
import PropTypes from 'prop-types' // Import PropTypes for validation

const Chat = ({ idInstance, apiTokenInstance }) => {
	const [chatId, setChatId] = useState('')
	const [messages, setMessages] = useState([]) 
	const contaunerRef=useRef(null)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()
const chatContainerClasses =clsx('chatcontainer',{
  'no-chatId':!chatId
})
	// Handle chat creation
	const onSubmit = (data) => {
		setChatId(data.chatId)
    setMessages([])
	}
  useChatNotifications(idInstance, apiTokenInstance, chatId, setMessages)
 useEffect(()=>{
	const chatContainer = contaunerRef.current
	if(chatContainer) {
		chatContainer.scrollTop = chatContainer.scrollHeight
	}
 },[messages])
	return (
		<div className={chatContainerClasses}>
       {
        chatId && <div>
				<h3>Сообщения:</h3>
				<ul className='messagelist' ref={contaunerRef}>
					{messages.map((message, index) => (
						<li className='messageitem' key={index}><FcOk style={{marginRight:'1rem'}} />{message}</li>
					))}
				</ul>
			</div>
      }
      <div >
      <form onSubmit={handleSubmit(onSubmit)}>
				<input className='phoneinput'
					{...register('chatId', {
						required: 'Обязательное поле',
						pattern: {
							value: /^\d+$/,
							message:
								'Введите номер телефона в формате 7(код страны)90000000'
						},
						minLength: {
							value: 11,
							message: 'Номер телефона должен быть не менее 11 символов'
						}
					})}
					placeholder='Номер пользователя'
				/>
				<button className='btnphoneinput' type='submit'>Создать чат</button>
				{errors.chatId && <p>{errors.chatId.message}</p>}
			</form>
     
			{chatId && (
				<ChatForm
					idInstance={idInstance}
					apiTokenInstance={apiTokenInstance}
					chatId={chatId}
				/>
			)}
      </div>
			

			{/* Display messages */}
		
		</div>
	)
}

// Prop validation
Chat.propTypes = {
	idInstance: PropTypes.string.isRequired,
	apiTokenInstance: PropTypes.string.isRequired
}

export default Chat
