function getTime(){
      const date = new Date();
      const local_time = document.querySelector('.local_time');
      const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
      const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
      const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
      local_time.innerHTML = `Your local time is: ${hours}:${minutes}:${seconds}`;
}
setInterval(getTime,0);
    