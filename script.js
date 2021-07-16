function sendMessage(){
      const button = document.querySelector('.send_message_button');
      const input = document.querySelector('.send_message_input');
      const blockForMessage = document.querySelector('.inner_chat_block_message');
      button.onclick = function(){
            const p = document.createElement('p');
            if(input.value){
                  p.innerHTML = input.value;
                  input.value = '';
                  blockForMessage.appendChild(p);
                  blockForMessage.scrollTop = 9999;
            } 
      }
}

sendMessage();

function newChat(){
      const username = document.querySelectorAll('.user_online');
      const tabs = document.querySelector('.tabs');
      for(let i = 0; i < username.length; i++){
            username[i].onclick = function(){
                  const button = document.createElement('button');
                  const p = document.createElement('p');
                  p.classList.add('close_chat');
                  p.innerHTML = '[x]';
                  button.innerHTML = username[i].innerHTML + " ";
                  tabs.appendChild(button);
                  button.appendChild(p);
                  closeChat();
            }
      }
}

newChat();

function closeChat(){
      const pCloseChat = document.querySelectorAll('.close_chat');
      for(let i = 0; i < pCloseChat.length; i++){
            pCloseChat[i].onclick = function(){
                  pCloseChat[i].parentNode.parentNode.removeChild(pCloseChat[i].parentNode);
            }
      }
}
