 export const loadChatData = (chatId,setMessages) => {
  const storedData = localStorage.getItem('chatData')
  if (storedData) {
    const parsedData = JSON.parse(storedData)
    const currentChatData = parsedData.find(item => item.chatId === chatId)
    if (currentChatData) {
      setMessages(currentChatData.messages)
    }
  }
}
 export const saveChatData = (chatId, messages) => {
  const storedData = localStorage.getItem('chatData')
  let newData = storedData ? JSON.parse(storedData) : []
  const currentChatData = newData.find(item => item.chatId === chatId)

  if (currentChatData) {
    currentChatData.messages = messages
  } else {
    newData.push({ chatId, messages })
  }
  localStorage.setItem('chatData', JSON.stringify(newData))
}