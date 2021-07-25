import 'babel-polyfill';
import './../sass/styles.scss';
let messageCounter = 0;
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
            let xhrSendMessages = new XMLHttpRequest(); 
            const cookie = document.cookie.split('=');                      
            xhrSendMessages.open("POST",'https://studentschat.herokuapp.com/messages');
            xhrSendMessages.setRequestHeader('Content-Type', 'application/json');
            xhrSendMessages.send(JSON.stringify({
                  datetime: new Date().toISOString(),
                  message:input.value,
                  username:cookie[1],
            }));
            xhrSendMessages.onload = function(){
                  if(input.value){
                        if(xhrSendMessages.status != 200){
                              alert(`Error ${xhrSendMessages.status}: ${xhrSendMessages.statusText}`);
                        }
                        // switch(text_style){
                        //       case 'bold':
                        //             secondDiv.classList.add('style_bold');   
                        //       break;
                        //       case 'italic':
                        //             secondDiv.classList.add('style_italic');   
                        //       break;
                        //       case 'underline':
                        //             secondDiv.classList.add('style_underline');   
                        //       break;
                        // }
                        input.value = '';
                        charactersEntered.innerHTML = '0 characters entered';
                        spaceEntered.innerHTML = '0 whitespace characters entered';
                        blockForMessage.scrollTop = 9999;
                  } 
            };
          
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
      const pOnline = document.querySelector('.p_online');
      let xhr = new XMLHttpRequest();
      let allUsers;
      let online = 0;
      xhr.open('GET','https://studentschat.herokuapp.com/users');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();

      xhr.onload = function(){
            allUsers = JSON.parse(xhr.response);
            console.log(allUsers)
            for(let i = 0; i < allUsers.length; i++){
                  const p = document.createElement('p');
                  p.classList.add('user_online');
                  if(allUsers[i].status === 'active'){
                        p.innerHTML ='🟢 ' + allUsers[i].username;
                        online++;
                  }else{
                        p.innerHTML ='🔴 ' + allUsers[i].username;
                  }
                 
                  divUsersOnline.appendChild(p);
            }
            pOnline.innerHTML = "Online: " + online;
            newChat();
      }
    

}

getUsers();

function getMessage(){
      const blockForMessage = document.querySelector('.inner_chat_block_message');
      const cookie = document.cookie.split('=');
      let xhr = new XMLHttpRequest();
      let messages;
      xhr.open('GET','https://studentschat.herokuapp.com/messages');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();

      xhr.onload = function(){
            messages = JSON.parse(xhr.response);
            for(let i = messageCounter; i < messages.length; i++){
                  const date = new Date(messages[i].datetime);
                  const firstDiv = document.createElement('div');
                  const secondDiv = document.createElement('div');
                  const pName = document.createElement('p');
                  const pText = document.createElement('p');
                  const pDate = document.createElement('p');
                  const month = (date.getMonth()+1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                  const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
                  const year = date.getFullYear();
                  const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
                  const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
                  if(messages[i].username === cookie[1]){
                        firstDiv.classList.add('chat__item','chat__item--responder'); 
                        secondDiv.classList.add('chat__my_message-content'); 
                        secondDiv.innerText = messages[i].message;   
                  }else{
                        firstDiv.classList.add('chat__message'); 
                        secondDiv.classList.add('chat__incoming_message-content');
                        pName.classList.add('message_from_name');
                        pText.classList.add('message_from_text');
                        pDate.classList.add('message_from_date');
                        pName.innerHTML = messages[i].username; 
                        pText.innerText = messages[i].message; 
                        pDate.innerText = `${day}.${month}.${year} ${hours}:${minutes}`; 
                        secondDiv.appendChild(pName); 
                        secondDiv.appendChild(pText); 
                        secondDiv.appendChild(pDate); 
                        
                  }
                  blockForMessage.appendChild(firstDiv);
                  firstDiv.appendChild(secondDiv);
                  // blockForMessage.appendChild(firstDiv);
                  // firstDiv.appendChild(secondDiv);
                  blockForMessage.scrollTop = 9999;
                  messageCounter++;
                  
            }
      }
    
}
setInterval(getMessage, 200);

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
      if(cookie[1]){
            buttonUsername.innerHTML = 'Exit';
      }
      

}
setName();

// function exit(){
//       const buttonExit = document.querySelector('.button_username');
//       buttonExit.onclick = function(){
//             if(buttonExit.innerHTML === 'Exit'){
//                   let xhr = new XMLHttpRequest();
//                   let allUsers;
//                   xhr.open('POST','https://studentschat.herokuapp.com/users/register');
//                   xhr.setRequestHeader('Content-Type', 'application/json');
//                   xhr.send(JSON.stringify({user_id:710424788,username:"Harry Potter",password:"123456789",status:"inactive"}));
//                   xhr.onload = function(){
//                         console.log('GOOD')
//                   }
//             }
//       }
     
// }
// exit();