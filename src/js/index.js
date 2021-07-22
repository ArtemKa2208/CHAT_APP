import 'babel-polyfill';
import './../sass/styles.scss';
function sendMessage(){
      const button = document.querySelector('.send_message_button');
      const input = document.querySelector('.send_message_input');
      const blockForMessage = document.querySelector('.inner_chat_block_message');
      const styleBold = document.querySelector('.style_bold');
      const styleItalic = document.querySelector('.style_italic');
      const styleUnderline = document.querySelector('.style_underline');
      const charactersEntered = document.querySelector('.characters_entered');
      const spaceEntered = document.querySelector('.space_entered');
      let text_style = '';
      button.onclick = function(){
            const p = document.createElement('p');
            if(input.value){
                  p.innerHTML = input.value;
                  switch(text_style){
                        case 'bold':
                              p.classList.add('style_bold');   
                        break;
                        case 'italic':
                              p.classList.add('style_italic');   
                        break;
                        case 'underline':
                              p.classList.add('style_underline');   
                        break;
                  }
                  input.value = '';
                  p.classList.add('message_p');   
                  charactersEntered.innerHTML = '0 characters entered';
                  spaceEntered.innerHTML = '0 whitespace characters entered';
                  blockForMessage.appendChild(p);
                  blockForMessage.scrollTop = 9999;
            } 
      }
      styleBold.onclick = function(){
            if(text_style === 'italic' || text_style === 'bold' || text_style === 'underline'){
                  text_style = '';
                  styleItalic.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                  styleBold.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                  styleUnderline.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
            }else{
                  text_style = 'bold';
                  styleBold.style.backgroundColor = 'rgb(135, 219, 255)';
            }
            
      }
      styleItalic.onclick = function(){
            if(text_style === 'italic' || text_style === 'bold' || text_style === 'underline'){
                  text_style = '';
                  styleItalic.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                  styleBold.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                  styleUnderline.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
            }else{
                  text_style = 'italic';
                  styleItalic.style.backgroundColor = 'rgb(135, 219, 255)';
            }
      }
      styleUnderline.onclick = function(){
            if(text_style === 'italic' || text_style === 'bold' || text_style === 'underline'){
                  text_style = '';
                  styleItalic.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                  styleBold.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                  styleUnderline.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';

            }else{
                  text_style = 'underline';
                  styleUnderline.style.backgroundColor = 'rgb(135, 219, 255)';
            }
      }
      input.oninput = function(){
            charactersEntered.innerHTML = input.value.length + ' characters entered';
            spaceEntered.innerHTML = input.value.split(' ').length -1 + ' whitespace characters entered';
            console.log(input.value.split(' '));
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


function closeChat(){
      const pCloseChat = document.querySelectorAll('.close_chat');
      for(let i = 0; i < pCloseChat.length; i++){
            pCloseChat[i].onclick = function(){
                  pCloseChat[i].parentNode.parentNode.removeChild(pCloseChat[i].parentNode);
            }
      }
}
function getUsers(){
      const divUsersOnline = document.querySelector('.div_users_online');
      let xhr = new XMLHttpRequest();
      let allUsers;
      xhr.open('GET','https://studentschat.herokuapp.com/users');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();

      xhr.onload = function(){
            allUsers = JSON.parse(xhr.response);
            console.log(allUsers)
            for(let i = 0; i < allUsers.length; i++){
                  const p = document.createElement('p');
                  p.classList.add('user_online');
                  p.innerHTML = allUsers[i].username;
                  divUsersOnline.appendChild(p);
            }
            newChat();
      }
    

}

getUsers();

function getMessage(){
      let xhr = new XMLHttpRequest();
      let allUsers;
      xhr.open('GET','https://studentschat.herokuapp.com/messages');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();

      xhr.onload = function(){
            allUsers = JSON.parse(xhr.response);
            console.log(allUsers)
      }
    
}

getMessage()

function getTime(){
      const date = new Date();
      const local_time = document.querySelector('.local_time');
      const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
      const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
      const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
      local_time.innerHTML = `Your local time is: ${hours}:${minutes}:${seconds}`;
}
setInterval(getTime,0);

function setName(){
      const buttonUsername = document.querySelector('.button_username');
      const cookie = document.cookie.split('=');
      buttonUsername.innerHTML = cookie[1];

}
setName();
