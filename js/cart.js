// 购物车页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    console.log('购物车页面加载完成');
    // 初始化页面
    initCartPage(); 
    // 绑定事件
    bindCartEvents();
});
// 定义当前用户变量
let currentUser = null;
// 定义购物车变量
let cart = [];
// 初始化购物车页面
function initCartPage() {
    // 加载购物车数据
    loadCartFromStorage();
    // 加载用户数据
    loadUserData();
    // 显示购物车商品
    displayCartItems();
    // 更新购物车摘要
    updateCartSummary();
}
// 从localStorage加载购物车数据
function loadCartFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('加载购物车数据:', cart.length, '件商品');
    updateCartCount();
}
// 加载用户数据
function loadUserData() {
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    console.log('当前用户:', currentUser ? currentUser.username : '未登录');
    updateUserStatus();
}
// 更新用户状态显示
function updateUserStatus() {
    const userStatus = document.getElementById('userStatus');
    if (userStatus) {
        if (currentUser) {
            userStatus.innerHTML = `<span class="current-user">${currentUser.username}</span>`;
            userStatus.title = '点击退出登录';
        } else {
            userStatus.textContent = '您好，请登录';
            userStatus.title = '点击登录';
        }
    }
}
// 更新购物车数量显示
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// 显示购物车商品
function displayCartItems() {
    const cartItemsList = document.getElementById('cartItemsList');
    // 清空列表
    cartItemsList.innerHTML = '';
    // 如果购物车为空，显示空购物车消息
    if (cart.length === 0) {
        const emptyCartMessage = document.createElement('div');
        emptyCartMessage.className = 'empty-cart-message';
        emptyCartMessage.style.display = 'block';
        emptyCartMessage.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <h3>购物车还是空的</h3>
            <p>快去首页逛逛吧</p>
            <a href="index.html" class="btn-primary">去首页挑选商品</a>
        `;
        cartItemsList.appendChild(emptyCartMessage);
        // 禁用结算按钮
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }
    
    // 启用结算按钮
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.disabled = false;
    
    // 添加每个购物车商品
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const cartItemCard = document.createElement('div');
        cartItemCard.className = 'cart-item-card';
        
        // 截断过长的商品名称（超过7个中文字符显示省略号）
        let displayTitle = item.name;
        let fullTitle = item.name; // 完整名称用于title属性
        
        // 如果商品名称超过10个中文字符（约20个英文字符），则截断
        if (displayTitle.length > 10) {
            displayTitle = displayTitle.substring(0, 10) + '...';
        }
        
        cartItemCard.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='images/products/default.jpg'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title" title="${fullTitle}">${displayTitle}</div>
            </div>
            <div class="cart-item-price">¥${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
                <div class="quantity-control">
                    <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                    <button class="quantity-btn increase-btn" data-index="${index}">+</button>
                </div>
            </div>
            <div class="cart-item-total" id="itemTotal${index}">¥${itemTotal.toFixed(2)}</div>
            <div class="cart-item-remove">
                <button class="remove-btn" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsList.appendChild(cartItemCard);
    });
    
    // 绑定购物车内的事件
    bindCartItemEvents();
}

// 绑定购物车事件
function bindCartEvents() {
    console.log('绑定购物车事件...');
    // 清空购物车按钮
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('清空购物车按钮被点击');
            if (cart.length === 0) {
                alert('购物车已经是空的');
                return;
            }
            showClearCartModal();
        });
    }
    // 结算按钮
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('去结算按钮被点击');
            checkout();
        });
    }
    // 用户状态点击事件
    const userStatus = document.getElementById('userStatus');
    if (userStatus) {
        userStatus.addEventListener('click', function() {
            if (currentUser) {
                logout();
            } else {
                // 跳转到首页并显示登录模态框
                window.location.href = 'index.html';
            }
        });
    }
    // 付款模态框关闭按钮
    const closePaymentModalBtn = document.getElementById('closePaymentModal');
    if (closePaymentModalBtn) {
        closePaymentModalBtn.addEventListener('click', closePaymentModal);
    }
    const cancelPaymentBtn = document.getElementById('cancelPayment');
    if (cancelPaymentBtn) {
        cancelPaymentBtn.addEventListener('click', closePaymentModal);
    }
    // 清空购物车模态框关闭按钮
    const cancelClearBtn = document.getElementById('cancelClear');
    if (cancelClearBtn) {
        cancelClearBtn.addEventListener('click', closeClearCartModal);
    }
    // 确认清空购物车按钮
    const confirmClearBtn = document.getElementById('confirmClear');
    if (confirmClearBtn) {
        confirmClearBtn.addEventListener('click', confirmClearCart);
    }
    
    // 确认付款按钮
    const confirmPaymentBtn = document.getElementById('confirmPayment');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', confirmPayment);
    }
    
    // 付款模态框外部点击关闭
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closePaymentModal();
            }
        });
    }
    
    // 清空购物车模态框外部点击关闭
    const clearCartModal = document.getElementById('clearCartModal');
    if (clearCartModal) {
        clearCartModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeClearCartModal();
            }
        });
    }
    
    // 成功模态框按钮
    const backToHomeBtn = document.getElementById('backToHome');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    const viewOrdersBtn = document.getElementById('viewOrders');
    if (viewOrdersBtn) {
        viewOrdersBtn.addEventListener('click', function() {
            alert('订单功能正在开发中...');
        });
    }
    
    // 成功模态框外部点击关闭
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }
    
    // 支付方式选择
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选项的active类
            document.querySelectorAll('.payment-option').forEach(opt => {
                opt.classList.remove('active');
            });
            // 添加当前选项的active类
            this.classList.add('active');
            // 选中对应的radio按钮
            this.querySelector('input').checked = true;
        });
    });
}

// 绑定购物车商品内的事件
function bindCartItemEvents() {
    // 减少数量按钮
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            decreaseQuantity(index);
        });
    });
    
    // 增加数量按钮
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            increaseQuantity(index);
        });
    });
    
    // 数量输入框
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            const newQuantity = parseInt(this.value);
            updateQuantity(index, newQuantity);
        });
    });
    
    // 删除按钮
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            removeFromCart(index);
        });
    });
}

// 减少商品数量
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        saveCartToStorage();
        updateCartItemDisplay(index);
        updateCartSummary();
    }
}

// 增加商品数量
function increaseQuantity(index) {
    cart[index].quantity += 1;
    saveCartToStorage();
    updateCartItemDisplay(index);
    updateCartSummary();
}

// 更新商品数量
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        newQuantity = 1;
    }
    
    cart[index].quantity = newQuantity;
    saveCartToStorage();
    updateCartItemDisplay(index);
    updateCartSummary();
}

// 更新购物车商品显示
function updateCartItemDisplay(index) {
    const item = cart[index];
    const itemTotal = item.price * item.quantity;
    
    // 更新数量输入框
    const quantityInput = document.querySelector(`.quantity-input[data-index="${index}"]`);
    if (quantityInput) {
        quantityInput.value = item.quantity;
    }
    
    // 更新小计
    const itemTotalElement = document.getElementById(`itemTotal${index}`);
    if (itemTotalElement) {
        itemTotalElement.textContent = `¥${itemTotal.toFixed(2)}`;
    }
}

// 从购物车移除商品
function removeFromCart(index) {
    if (confirm(`确定要移除 "${cart[index].name}" 吗？`)) {
        cart.splice(index, 1);
        saveCartToStorage();
        displayCartItems();
        updateCartSummary();
    }
}

// 显示清空购物车确认模态框
function showClearCartModal() {
    console.log('显示清空购物车确认模态框');
    document.getElementById('clearCartModal').style.display = 'flex';
}
// 关闭清空购物车模态框
function closeClearCartModal() {
    document.getElementById('clearCartModal').style.display = 'none';
}
// 确认清空购物车
function confirmClearCart() {
    cart = [];
    saveCartToStorage();
    displayCartItems();
    updateCartSummary();
    closeClearCartModal();
    alert('购物车已清空');
}

function updateCartSummary() {
    let itemsCount = 0;
    let subtotal = 0;
    
    cart.forEach(item => {
        itemsCount += item.quantity;
        subtotal += item.price * item.quantity;
    });
    
    // 计算运费（满99免运费）
    const shippingFee = subtotal >= 99 ? 0 : 10;
    const totalAmount = subtotal + shippingFee;
    
    // 更新显示
    document.getElementById('itemsCount').textContent = `${itemsCount}件`;
    document.getElementById('subtotal').textContent = `¥${subtotal.toFixed(2)}`;
    document.getElementById('shippingFee').textContent = `¥${shippingFee.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `¥${totalAmount.toFixed(2)}`;
}

// 保存购物车到localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
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

// 结算
function checkout() {
    console.log('执行结算操作');
    
    // 检查用户是否登录
    if (!currentUser) {
        alert('请先登录再进行结算');
        // 跳转到首页并显示登录模态框
        window.location.href = 'index.html';
        return;
    }
    
    // 检查购物车是否为空
    if (cart.length === 0) {
        alert('购物车为空，无法结算');
        return;
    }
    
    // 显示付款模态框
    showPaymentModal();
}

// 显示付款模态框
function showPaymentModal() {
    console.log('显示付款模态框');
    const paymentModal = document.getElementById('paymentModal');
    
    if (!paymentModal) {
        console.error('找不到付款模态框元素');
        return;
    }
    
    // 更新付款金额
    const totalAmount = document.getElementById('totalAmount');
    const paymentAmount = document.getElementById('paymentAmount');
    
    if (totalAmount && paymentAmount) {
        paymentAmount.textContent = totalAmount.textContent;
    }
    
    // 显示模态框
    paymentModal.style.display = 'flex';
    
    console.log('付款模态框已显示');
}

// 关闭付款模态框
function closePaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.style.display = 'none';
    }
}

// 确认付款
function confirmPayment() {
    const paymentMethodElement = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethodElement) {
        alert('请选择支付方式');
        return;
    }
    
    const paymentMethod = paymentMethodElement.value;
    
    console.log('确认付款，支付方式:', paymentMethod);
    
    // 模拟付款处理
    setTimeout(() => {
        // 关闭付款模态框
        closePaymentModal();
        
        // 显示成功模态框
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.style.display = 'flex';
        }
        
        // 记录订单历史
        const order = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            items: [...cart],
            total: document.getElementById('totalAmount').textContent,
            paymentMethod: paymentMethod
        };
        
        // 保存订单到localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // 清空购物车
        cart = [];
        saveCartToStorage();
        displayCartItems();
        updateCartSummary();
        
    }, 500);
}
