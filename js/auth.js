// 登录/注册切换
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// 绑定登录/注册切换事件
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        
        // 更新活跃标签
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // 显示对应内容
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabId}Tab`) {
                content.classList.add('active');
            }
        });
    });
});

// 显示登录模态框
function showLoginModal() {
    // 切换到登录标签
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-tab="login"]').classList.add('active');
    
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById('loginTab').classList.add('active');
    
    // 显示模态框
    authModal.style.display = 'flex';
    document.getElementById('loginUsername').focus();
}

// 显示注册模态框
function showRegisterModal() {
    // 切换到注册标签
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-tab="register"]').classList.add('active');
    
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById('registerTab').classList.add('active');
    
    // 显示模态框
    authModal.style.display = 'flex';
    document.getElementById('registerUsername').focus();
}

// 用户登录
function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim(); 
    // 简单验证
    if (!username || !password) {
        alert('请输入用户名和密码');
        return;
    }   
    // 从localStorage获取用户数据
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // 登录成功
        currentUser = { username: user.username, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        // 更新用户状态
        updateUserStatus();
        // 关闭模态框
        authModal.style.display = 'none';
        // 清空表单
        loginForm.reset();
        alert(`欢迎回来，${username}！`);
    } else {
        alert('用户名或密码错误');
    }
}
// 用户注册
function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    // 验证输入
    if (!username || !email || !password || !confirmPassword) {
        alert('请填写所有字段');
        return;
    }
    if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
    }
    if (password.length < 6) {
        alert('密码长度至少为6位');
        return;
    }
    // 从localStorage获取用户数据
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // 检查用户名是否已存在
    if (users.find(u => u.username === username)) {
        alert('用户名已存在');
        return;
    }
    // 检查邮箱是否已存在
    if (users.find(u => u.email === email)) {
        alert('邮箱已被注册');
        return;
    }
    // 创建新用户
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    // 自动登录
    currentUser = { username, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); 
    // 更新用户状态
    updateUserStatus();
    // 关闭模态框
    authModal.style.display = 'none';
    // 清空表单
    registerForm.reset();
    alert(`注册成功，欢迎 ${username}！`);
}
// 用户登出
function logout() {
    if (confirm('确定要退出登录吗？')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateUserStatus();
        alert('已成功退出登录');
    }
}

// 更新用户状态显示
function updateUserStatus() {
    if (currentUser) {
        userStatus.innerHTML = `<span class="current-user">${currentUser.username}</span>`;
        userStatus.title = '点击退出登录';
        registerBtn.style.display = 'none';
    } else {
        userStatus.textContent = '您好，请登录';
        userStatus.title = '点击登录';
        registerBtn.style.display = 'inline';
    }
}
// 绑定登录表单提交事件
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login();
});
// 绑定注册表单提交事件
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    register();
});