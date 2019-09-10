const socket = io.connect("http://localhost:3000");

const chatbox = document.getElementById("chatbox");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

socket.on("message", message => {
  const messageItem = document.createElement("li");
  messageItem.innerText = message;
  chatbox.appendChild(messageItem);
});

sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  socket.emit("message", message);
});

window.onload = function() {
  fetch("http://localhost:3000/messages")
    .then(res => res.json())
    .then(messages => {
      messages.forEach(message => {
        const messageItem = document.createElement("li");
        messageItem.innerText = message;
        chatbox.appendChild(messageItem);
      });
    });
};
