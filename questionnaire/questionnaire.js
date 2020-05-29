// 可能出现一个页面多个document.body.onload的情况，因此将document.body.onload封装，集中调用
document.body.onload = () => {
    commonBodyOnload();
};