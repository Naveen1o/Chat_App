const johnSelectorBtn = document.querySelector('#john-selector')
const janeSelectorBtn = document.querySelector('#jane-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const ChatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')
 
const messages = JSON.parse(localStorage.getItem('messages')) || []

const createchatMessageElement =(message) => 
    ` <div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg' }">
     <div class="message-sender">${message.sender}</div>
     <div class="message-text">${message.text}</div>
     <div class="message-timestamp">${message.timestamp}</div>
</div>
`


window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createchatMessageElement(message)
    })
}

let messageSender = 'John'

const updateMessageSender = (name) =>{
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`

    if(name === 'John'){
        johnSelectorBtn.classList.add('active-person')
        janeSelectorBtn.classList.remove('active-person')
    }
    if(name === 'Jane'){
        janeSelectorBtn.classList.add('active-person')
        johnSelectorBtn.classList.remove('active-person')
    }

    chatInput.focus()
}

johnSelectorBtn.onclick = () => updateMessageSender('John')
janeSelectorBtn.onclick = () => updateMessageSender('Jane')


// form chat input submit
const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }
    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))
    chatMessages.innerHTML += createchatMessageElement(message)

    ChatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
    // chatMessages.classList.add('chat-messages')
}

ChatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})