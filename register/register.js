// 可能出现一个页面多个document.body.onload的情况，因此将document.body.onload封装，集中调用
document.body.onload = () => {
    commonBodyOnload();
};

const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const emailInput = document.getElementById('emailInput');

usernameInput.onfocus = () => {
    usernameInput.placeholder = '用户名仅支持英文';
};

usernameInput.onblur = () => {
    usernameInput.placeholder = '请输入用户名';
};

passwordInput.onfocus = () => {
    passwordInput.placeholder = '密码至少6位以上';
};

passwordInput.onblur = () => {
    passwordInput.placeholder = '请输入密码';
};

confirmPasswordInput.onfocus = () => {
    confirmPasswordInput.placeholder = '和密码保持一致哦';
};

confirmPasswordInput.onblur = () => {
    confirmPasswordInput.placeholder = '请输入相同的密码';
};

emailInput.onfocus = () => {
    emailInput.placeholder = '支持qq邮箱、163邮箱';
};

emailInput.onblur = () => {
    emailInput.placeholder = '请输入邮箱';
};
