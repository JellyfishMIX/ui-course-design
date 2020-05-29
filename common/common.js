// 可能出现一个页面多个document.body.onload的情况，因此将document.body.onload封装，集中调用
const commonBodyOnload = () => {
    currentTime();
    setInterval(currentTime, 1000);
};

// header

const dateElement = document.getElementById('headerDate');

const currentTime = () => {
    const date = new Date();
    dateElement.innerHTML=date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
};