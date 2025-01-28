import { useEffect } from 'react'
import { receiveNotification, deleteNotification } from '../api/green-api'

const useChatNotifications = (idInstance, apiTokenInstance, chatId, setMessages) => {
  useEffect(() => {
    if (!chatId) return

    const fetchNotifications = async () => {
      try {
        const notification = await receiveNotification(
          idInstance,
          apiTokenInstance,
          10
        )

        if (notification && notification.body) {
          if (notification.body.typeWebhook === 'incomingMessageReceived') {
            const message = notification.body.messageData.textMessageData
              ? notification.body.messageData.textMessageData.textMessage
              : notification.body.messageData.extendedTextMessageData
              ? notification.body.messageData.extendedTextMessageData.text
              : null

            if (message) {
              setMessages((prevMessages) => [...prevMessages, message])
            }
          } else if (notification.body.typeWebhook === 'outgoingAPIMessageReceived') {
            const message = notification.body.messageData.extendedTextMessageData
              ? notification.body.messageData.extendedTextMessageData.text
              : null

            if (message) {
              setMessages((prevMessages) => [...prevMessages, message])
            }
          } else if (notification.body.typeWebhook === 'outgoingMessageReceived') {
            const message = notification.body.messageData.textMessageData
              ? notification.body.messageData.textMessageData.textMessage
              : null

            if (message) {
              setMessages((prevMessages) => [...prevMessages, message])
            }
          }

          if (notification.receiptId) {
            try {
              await deleteNotification(
                idInstance,
                apiTokenInstance,
                notification.receiptId
              )
            } catch (error) {
              console.error('Error deleting notification:', error)
            }
          }

          if (notification.body.typeWebhook === 'outgoingMessageStatus') {
            console.log('Outgoing message status:', notification.body.status)
          } else if (notification.body.typeWebhook === 'stateInstanceChanged') {
            console.log('Instance state changed to:', notification.body.stateInstance)
          } else if (
            notification.body.typeWebhook !== 'incomingMessageReceived' &&
            notification.body.typeWebhook !== 'outgoingAPIMessageReceived' &&
            notification.body.typeWebhook !== 'outgoingMessageReceived' &&
            notification.body.typeWebhook !== 'outgoingMessageStatus' &&
            notification.body.typeWebhook !== 'stateInstanceChanged'
          ) {
            if (notification.body.typeWebhook !== null && notification.body.typeWebhook !== undefined) {
              console.error(
                'Notification structure is not as expected:',
                notification
              )
            }
          }
        } else {
          if (notification !== null && notification !== undefined) {
            console.error('Notification is null or undefined')
          }
        }
      } catch (error) {
        console.error('Error receiving notification:', error)
      }
    }

    const intervalId = setInterval(fetchNotifications, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [chatId, idInstance, apiTokenInstance, setMessages])
}

export default useChatNotifications
