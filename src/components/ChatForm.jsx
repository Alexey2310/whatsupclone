import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { sendMessage } from '../api/green-api';
import whatsappIcon from '../assets/icons8-whatsapp-48.png';

const ChatForm = ({ idInstance, apiTokenInstance, chatId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendMessage(idInstance, apiTokenInstance, chatId, data.message);
      reset();
    } catch {
      console.error('Error sending message');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <input
          className='chatinput'
          {...register('message', { required: 'Message cannot be empty' })}
          placeholder="Ваше сообщение"
        />
        <button className='chatBtn' type="submit">
          <img src={whatsappIcon} alt="Иконка WhatsApp" width="24" height="24" />
          <span>Отправить</span>
        </button>
      </div>
      {errors.message && <p>{errors.message.message}</p>}
    </form>
  );
};

ChatForm.propTypes = {
  idInstance: PropTypes.string.isRequired,
  apiTokenInstance: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
};

export default ChatForm;
