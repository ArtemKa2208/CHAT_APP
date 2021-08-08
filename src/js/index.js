import 'babel-polyfill';
import './../sass/styles.scss';
import images from '../js/img.js'
// const { images } = require('../js/img.js')
if(window.location.pathname === '/index.html'){
      let messageCounter = 0;
      let arrAllUsers;
      let setNames = new Set();
      function sendMessage(){
            const button = document.querySelector('.send_message_button');
            const input = document.querySelector('.send_message_input');
            const blockForMessage = document.querySelector('.inner_chat_block_message');
            const styleBold = document.querySelector('.style_bold');
            const styleItalic = document.querySelector('.style_italic');
            const styleUnderline = document.querySelector('.style_underline');
            const charactersEntered = document.querySelector('.characters_entered');
            const spaceEntered = document.querySelector('.space_entered');
            const lettersEntered = document.querySelector('.letters_entered');
            const punctuationEntered = document.querySelector('.punctuation_entered');
            let prewLength = 0;
            let countLetters = 0;
            let countPunctuation = 0;
            let lastLetter = '';
            let bold = 0;
            let italic = 0;
            let underline = 0;
            let formatText = '';
            button.onclick = function(){
                  let xhrSendMessages = new XMLHttpRequest(); 
                  const username = (document.cookie.split(';')[1]).split('=')[1];                     
                  xhrSendMessages.open("POST",'https://studentschat.herokuapp.com/messages');
                  xhrSendMessages.setRequestHeader('Content-Type', 'application/json');
                  xhrSendMessages.send(JSON.stringify({
                        datetime: new Date().toISOString(),
                        message: formatText || input.value,
                        username:username,
                  }));
                  xhrSendMessages.onload = function(){
                        if(input.value){
                              if(xhrSendMessages.status != 200){
                                    alert(`Error ${xhrSendMessages.status}: ${xhrSendMessages.statusText}`);
                              }
      
                              styleBold.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                              styleItalic.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                              styleUnderline.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                              formatText = '';
                              input.value = '';
                              charactersEntered.innerHTML = '0 characters entered';
                              spaceEntered.innerHTML = '0 whitespace characters entered';
                              lettersEntered.innerHTML = '0 letters entered';
                              punctuationEntered.innerHTML = '0 punctuation marks entered'
                              blockForMessage.scrollTop = 99999999999;
                              prewLength = 0;
                              countLetters = 0;
                        } 
                  };
                
            }
            styleBold.onclick = function(){
                  if(bold){
                        let indexFirst = input.value.indexOf('<b>');
                        let indexLast = input.value.indexOf('</b>');
                        formatText = input.value.slice(indexFirst,indexFirst + 3);
                        formatText = formatText.slice(indexLast, indexLast + 4);
                        bold = 0;
                        styleBold.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                       
                  }else{
                        formatText = `<b>${input.value}</b>`
                        bold = 1;
                        styleBold.style.backgroundColor = 'rgb(135, 219, 255)';
                  }
                  
            }
            styleItalic.onclick = function(){
                  if(italic){
                        let indexFirst = input.value.indexOf('<i>');
                        let indexLast = input.value.indexOf('</i>');
                        formatText = input.value.slice(indexFirst,indexFirst + 3);
                        formatText = formatText.slice(indexLast, indexLast + 4);
                        italic = 0;
                        styleItalic.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                       
                  }else{
                        formatText = `<i>${input.value}</i>`
                        italic = 1;
                        styleItalic.style.backgroundColor = 'rgb(135, 219, 255)';
                  }
            }
            styleUnderline.onclick = function(){
                  if(underline){
                        let indexFirst = input.value.indexOf('<u>');
                        let indexLast = input.value.indexOf('</u>');
                        formatText = input.value.slice(indexFirst,indexFirst + 3);
                        formatText = formatText.slice(indexLast, indexLast + 4);
                        underline = 0;
                        styleUnderline.style.backgroundColor = 'rgba(190, 236, 255, 0.646)';
                       
                  }else{
                        formatText = `<u>${input.value}</u>`
                        underline = 1;
                        styleUnderline.style.backgroundColor = 'rgb(135, 219, 255)';
                  }
            }
            input.oninput = function(){
                  let reg = new RegExp(/[,.!?;:()]/);
                  let nowLength = input.value.length;
                  charactersEntered.innerHTML = input.value.length + ' characters entered';
                  spaceEntered.innerHTML = input.value.split(' ').length -1 + ' whitespace characters entered';
                  if(nowLength < prewLength){
                        if(lastLetter.toUpperCase() != lastLetter.toLowerCase()){
                              countLetters--;
                              lettersEntered.innerHTML = countLetters + ' letters entered';
                        }else if(lastLetter.search(reg) != -1){
                              countPunctuation--;
                              punctuationEntered.innerHTML = countPunctuation + ' punctuation marks entered';
                        }
                  }else{
                        if(input.value[input.value.length-1].toUpperCase() != input.value[input.value.length-1].toLowerCase()){
                              countLetters++;
                              lettersEntered.innerHTML = countLetters + ' letters entered';
                        }else if((input.value[nowLength-1]).search(reg) != -1){
                              countPunctuation++;
                              punctuationEntered.innerHTML = countPunctuation + ' punctuation marks entered';
                        }
                  }
                  prewLength = input.value.length;
                  lastLetter = input.value[input.value.length-1];
                  console.log(input.value.split(' '));
                  
            
            }
            input.addEventListener('keyup', function(e) {
                  if (e.keyCode === 13) {
                        let xhrSendMessages = new XMLHttpRequest(); 
                        const username = (document.cookie.split(';')[1]).split('=')[1];                     
                        xhrSendMessages.open("POST",'https://studentschat.herokuapp.com/messages');
                        xhrSendMessages.setRequestHeader('Content-Type', 'application/json');
                        xhrSendMessages.send(JSON.stringify({
                              datetime: new Date().toISOString(),
                              message:input.value,
                              username:username,
                        }));
                        xhrSendMessages.onload = function(){
                              if(input.value){
                                    if(xhrSendMessages.status != 200){
                                          alert(`Error ${xhrSendMessages.status}: ${xhrSendMessages.statusText}`);
                                    }
                                    input.value = '';
                                    charactersEntered.innerHTML = '0 characters entered';
                                    spaceEntered.innerHTML = '0 whitespace characters entered';
                                    lettersEntered.innerHTML = '0 letters entered';
                                    punctuationEntered.innerHTML = '0 punctuation marks entered'
                                    blockForMessage.scrollTop = 99999999999;
                                    prewLength = 0;
                                    countLetters = 0;
                              } 
                        };
                  }
            })
      }
      
      sendMessage();
      function newChat(){
            const username = document.querySelectorAll('.user_online');
            const tabs = document.querySelector('.tabs');
            let flag = true;
            for(let i = 0; i < username.length; i++){
                  username[i].onclick = function(){
                        if(setNames.size === 0){
                                    const button = document.createElement('button');
                                    const p = document.createElement('p');
                                    p.classList.add('close_chat');
                                    p.innerHTML = '[x]';
                                    button.innerHTML = username[i].innerHTML + " ";
                                    tabs.appendChild(button);
                                    button.appendChild(p);
                                    closeChat(username[i].innerText,i);  
                                    // const pCloseChat = document.querySelectorAll('.close_chat');
                                    // pCloseChat[i].onclick = function(){
                                    //       console.log(username + ' del')
                                    //       setNames.delete(username);
                                    //       pCloseChat[i].parentNode.parentNode.removeChild(pCloseChat[i].parentNode);
                                    // }
                        }else{
                              setNames.forEach(function(value){
                                    console.log('0 ' + value)
                                    console.log(value + ' ' + username[i].innerText)
                                    if(value === username[i].innerText){
                                          // console.log(value.innerText)
                                          console.log('aga')
                                          flag = false;
                                          
                                    }
                              })
                              if(flag){
                                    const button = document.createElement('button');
                                    const p = document.createElement('p');
                                    p.classList.add('close_chat');
                                    p.innerHTML = '[x]';
                                    button.innerHTML = username[i].innerHTML + " ";
                                    tabs.appendChild(button);
                                    button.appendChild(p);
                                    closeChat(username[i].innerText,i);
                                    // const pCloseChat = document.querySelectorAll('.close_chat');
                                    // pCloseChat[i].onclick = function(){
                                    //       console.log(username + ' del')
                                    //       setNames.delete(username);
                                    //       pCloseChat[i].parentNode.parentNode.removeChild(pCloseChat[i].parentNode);
                                    // }

                              }
                        }
                        setNames.add(username[i].innerText);
                        console.log(setNames)
                  }
            }
      }
      
      
      function closeChat(username,i){
            console.log('1: ' + username)
            const pCloseChat = document.querySelectorAll('.close_chat');
            // for(let i = 0; i < pCloseChat.length; i++){
                  pCloseChat[i].onclick = function(){
                        console.log(username + ' del')
                        setNames.delete(username);
                        pCloseChat[i].parentNode.parentNode.removeChild(pCloseChat[i].parentNode);
                  }
            // }
      }
      function getUsers(){
            const divUsersOnline = document.querySelector('.div_users_online');
            // while (divUsersOnline.firstChild) {
            //       divUsersOnline.firstChild.remove()
            // }
            const pOnline = document.querySelector('.p_online');
            let xhr = new XMLHttpRequest();
            let allUsers;
            let online = 0;
            xhr.open('GET','https://studentschat.herokuapp.com/users');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
      
            xhr.onload = function(){
                  allUsers = JSON.parse(xhr.response);
                  arrAllUsers = JSON.parse(xhr.response);
                  for(let i = 0; i < allUsers.length; i++){
                        const p_name = document.createElement('p');
                        const p_online = document.createElement('p');
                        const img = document.createElement('img');
                        const div = document.createElement('div');
                        const idImg = allUsers[i].avatarId;
                        p_name.classList.add('user_online');
                        p_online.classList.add('user_online_icon');
                        img.classList.add('img_avatar');
                        div.classList.add('div_in_users_online');
                        if(idImg){
                              img.src = images[idImg];
                        }else{
                              img.src = images.default;
                        }
                        
                        if(allUsers[i].status === 'active'){
                              p_online.innerHTML = '🟢 '
                              p_name.innerText = allUsers[i].username;
                              online++;
                        }else{
                              p_online.innerHTML = '🔴 '
                              p_name.innerText = allUsers[i].username;
                        }
                        div.appendChild(p_online);
                        div.appendChild(img);
                        div.appendChild(p_name);
                        divUsersOnline.appendChild(div);
                     
                  }
                  pOnline.innerHTML = "Online: " + online;
                  newChat();
            }
          
      
      }
      
      //  setInterval(getUsers,200);
      getUsers();
      
      function getMessage(){
            const blockForMessage = document.querySelector('.inner_chat_block_message');
            const username = (document.cookie.split(';')[1]).split('=')[1];
            let messages;
            let xhr = new XMLHttpRequest();
            xhr.open('GET','https://studentschat.herokuapp.com/messages');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
            // console.log(arrAllUsers);
            xhr.onload = function(){
                  messages = JSON.parse(xhr.response);
                 
                  for(let i = messageCounter; i < messages.length; i++){

                        const date = new Date(messages[i].datetime);
                        const firstDiv = document.createElement('div');
                        const secondDiv = document.createElement('div');
                        const thirdDiv = document.createElement('div');
                        const pName = document.createElement('p');
                        const pText = document.createElement('p');
                        const pDate = document.createElement('p');
                        const msgImg = document.createElement('img');
                        const month = (date.getMonth()+1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                        const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
                        const year = date.getFullYear();
                        const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
                        const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();

                        if(messages[i].username === username){
                              firstDiv.classList.add('chat__item','chat__item--responder'); 
                              thirdDiv.classList.add('chat__my_message-content'); 
                              secondDiv.classList.add('div_my_message');
                              thirdDiv.innerHTML = messages[i].message;
                              pDate.classList.add('message_from_date');
                              pDate.innerText = `${day}.${month}.${year} ${hours}:${minutes}`; 
                              secondDiv.appendChild(thirdDiv); 
                              secondDiv.appendChild(pDate); 
                        }else{
                              let isHaveImg = false;
                              arrAllUsers.forEach(element => {
                                    if(element.username === messages[i].username){
                                          if(element.avatarId){
                                          msgImg.src = images[element.avatarId];
                                          isHaveImg = true;
                                          }
                                    }
                              });
                              if(!isHaveImg){
                                    console.log(images.default)
                                    msgImg.src = images.default;  
                              }
                              msgImg.classList.add('img_in_messages');
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
                              firstDiv.appendChild(msgImg);      
                        }
                        
                        blockForMessage.appendChild(firstDiv);
                        firstDiv.appendChild(secondDiv);
                        // blockForMessage.appendChild(firstDiv);
                        // firstDiv.appendChild(secondDiv);
                        blockForMessage.scrollTop = 99999999999;
                        messageCounter++;   
                  }
            }
          
      }
      // getMessage();
      setInterval(getMessage, 100);
      
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
      
      function getOnline(){
            const timeOnline = document.querySelector('.time_online');
            console.log('11_11_11');
            localStorage.seconds++;
            if(localStorage.seconds > 59){
                  localStorage.minutes++;
                  localStorage.seconds = 0;
            }
            if(localStorage.minutes > 59){
                  localStorage.hours++;
                  localStorage.minutes = 0;
            }
            let seconds = (localStorage.seconds < 10)? '0' + localStorage.seconds : localStorage.seconds;
            let minutes = (localStorage.minutes < 10)? '0' + localStorage.minutes : localStorage.minutes;
            let hours = (localStorage.hours < 10)? '0' + localStorage.hours : localStorage.hours;

            timeOnline.innerText = `You are online for: ${hours}:${minutes}:${seconds}` 
      }
     
      setInterval(getOnline,1000);
}

if(window.location.pathname === '/about.html'){
      function getInfo(){
            const myName = (document.cookie.split(';')[1]).split('=')[1];
            console.log('1230' + myName)
            const getAboutGender = document.querySelector('.get_about_gender');
            const getAboutName = document.querySelector('.get_about_name');
            const getAboutAbout = document.querySelector('.get_about_about');
            const getAboutPhone = document.querySelector('.get_about_phone');
            const getAboutCountry = document.querySelector('.get_about_country');
            const getAboutMail = document.querySelector('.get_about_mail');
            const getAboutImg = document.querySelector('.get_about_photo');
            const xhrUsers = new XMLHttpRequest();
            xhrUsers.open('GET','https://studentschat.herokuapp.com/users');
            xhrUsers.setRequestHeader('Content-Type', 'application/json');
            xhrUsers.send();
            xhrUsers.onload = function(){
                  const users = JSON.parse(xhrUsers.response);
                  users.forEach(element => {
                        if(element.username === myName){
                              console.log('000' + myName)
                              getAboutName.innerText =  myName;
                              getAboutGender.innerText = (element.gender) ? 'Gender: ' + element.gender : 'Gender: ---';
                              getAboutAbout.innerText = (element.about) ? 'About: ' + element.about : 'About: ---';
                              getAboutPhone.innerText = (element.phone) ? 'Phone: ' + element.phone : 'Phone: ---';
                              getAboutCountry.innerText = (element.country) ? 'Country: ' + element.country : 'Country: ---';
                              getAboutMail.innerText = (element.mail) ? 'Mail: ' + element.mail : 'Mail: ---';
                              getAboutImg.src = (element.avatarId) ? images[element.avatarId] : images.default
                        }
                  });
            }      
      }
      getInfo()
      function setInfo(){
            const myName = (document.cookie.split(';')[1]).split('=')[1];
            const gender = document.querySelector('.set_gender');
            const about = document.querySelector('.set_about');
            const phone = document.querySelector('.set_phone');
            const country = document.querySelector('.set_country');
            const mail = document.querySelector('.set_mail');
            const image = document.querySelector('.set_image');
            const button = document.querySelector('.add_info_about_button');
            button.onclick = function(){
                  const xhrUsers = new XMLHttpRequest();
                  xhrUsers.open('POST','https://studentschat.herokuapp.com/users');
                  xhrUsers.setRequestHeader('Content-Type', 'application/json');
                  xhrUsers.send(JSON.stringify({
                        username:myName,
                        gender:gender.value,
                        about:about.value,
                        phone:phone.value,
                        country:country.value,
                        mail:mail.value,
                        image:image.value,
                  }));
                  xhrUsers.onload = function(){
                        window.location.href = 'index.html';
                  }
            }
                  
      }
      setInfo()
      function getOnlineAbout(){
            localStorage.seconds++;
            if(localStorage.seconds > 59){
                  localStorage.minutes++;
                  localStorage.seconds = 0;
            }
            if(localStorage.minutes > 59){
                  localStorage.hours++;
                  localStorage.minutes = 0;
            }
      }
           
      setInterval(getOnlineAbout,1000);
}

if(window.location.pathname === '/registration.html'){
      function registration(){
            const buttonRegist = document.querySelector('.button_regist');
            console.log('a')
            buttonRegist.onclick = function(){
                  const form = new FormData(document.forms.formRegist);
                  const username = form.get('username');
                  const password = form.get('password');
                  console.log(username);
                  console.log(password)
                        let xhrRegist = new XMLHttpRequest();
                        xhrRegist.open("POST",'https://studentschat.herokuapp.com/users/register');
                        xhrRegist.setRequestHeader('Content-Type', 'application/json');
                        try {
                              xhrRegist.send(JSON.stringify({username,password}));
                              xhrRegist.onload = function(){ // какая то беда, не всегда заходит сюда
                                    alert(xhrRegist.status)
                                    if(xhrRegist.status === 200){
                                          alert('Registration completed successfully');
                                          window.location.href = 'login.html';
                                    }else{
                                          alert('This user already exists');
                                          window.location.href = 'registration.html';
                                    }
                              }
                        } catch (error) {
                              alert(error);
                        }
            }
      }
      registration();
}

if(window.location.pathname === '/login.html'){
      function login(){
            const buttonLogin = document.querySelector('.button_login');
            buttonLogin.onclick = function(){;
                  const form = new FormData(document.forms.formLogin);
                  const username = form.get('username');
                  const password = form.get('password');
                  const xhrLogin = new XMLHttpRequest();
                  xhrLogin.open('POST','https://studentschat.herokuapp.com/users/login');
                  xhrLogin.setRequestHeader('Content-Type', 'application/json');
                  xhrLogin.send(JSON.stringify({
                        'username': username, 
                        'password': password
                  }));
                  xhrLogin.onload = function(){
                        // let flag = true;
                        if(xhrLogin.status === 200){
                              let allUsers = JSON.parse(xhrLogin.response)[0];
                              console.log(xhrLogin.response)
                              document.cookie = `user=${allUsers.username}`;
                              document.cookie = `id=${allUsers.user_id}`;
                              localStorage.setItem('seconds',0);
                              localStorage.setItem('minutes',0);
                              localStorage.setItem('hours',0);
                              window.location.href = 'index.html';
                        }else{
                              alert(`Error ${xhrLogin.status}: ${xhrLogin.statusText}`);
                        }
                  }
            }
      }
      login();
}

if(window.location.pathname === '/index.html' || window.location.pathname === '/about.html' || window.location.pathname === '/'){
      function exit(){
      const username = (document.cookie.split(';')[1]).split('=')[1];
      const userId = (document.cookie.split(';')[2]).split('=')[1];
      const buttonExit = document.querySelector('.button_username');
      console.log(username)
      buttonExit.onclick = function(){
            if(buttonExit.innerHTML === 'Exit'){
                  let xhr = new XMLHttpRequest();
                  let allUsers;
                  xhr.open('POST','https://studentschat.herokuapp.com/users/logout');
                  xhr.setRequestHeader('Content-Type', 'application/json');
                  xhr.send(JSON.stringify({
                        status:"inactive",
                        user_id:userId,
                        username:username,
                  }));
                  xhr.onload = function(){
                        if(xhr.status !=200){
                              alert('Oops, error');
                              window.location.href = 'login.html';
                        }else{
                              document.cookie = 'user=';
                              document.cookie = 'id='
                              window.location.href = 'login.html';
                        }
                      
                        
                  }
            }
      }
     
      }
      exit();

      function isLogIn(){
      const username = (document.cookie.split(';')[1]).split('=')[1];
      console.log(username)
      if(username == ''){
            window.location.href = 'login.html';
      }
      }

      isLogIn();

      function autoExit(){
      const username = (document.cookie.split(';')[1]).split('=')[1];
      const xhr = new XMLHttpRequest();
      let flag = false;
      xhr.open('GET','https://studentschat.herokuapp.com/users');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
      xhr.onload = function(){
            const users = JSON.parse(xhr.response);
            users.forEach(element => {
                  if(element.username === username){
                        flag = true;
                  }
            });
            if(!flag){
                  document.cookie = 'user=';
                  document.cookie = 'id='
                  window.location.href = 'login.html';
            }
      }
      }

      setInterval(autoExit, 500);
}