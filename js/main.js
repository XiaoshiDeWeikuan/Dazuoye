// 全局变量
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentCategory = 'all';
let currentSlide = 0;// 当前显示的第几张轮播图（0-4）
let slideInterval;// 轮播定时器
const SLIDE_INTERVAL = 2000; // 轮播间隔：2秒
const TOTAL_SLIDES = 5; // 总共5张轮播图

// DOM元素
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const authModal = document.getElementById('authModal');
const userStatus = document.getElementById('userStatus');
const registerBtn = document.getElementById('registerBtn');
const categoryTitle = document.getElementById('categoryTitle');
const categories = document.querySelectorAll('.category');
const closeModalBtns = document.querySelectorAll('#closeModal, #closeModal2');

// 搜索管理器类
class SearchManager {
    constructor() {
        this.searchTerm = '';
        this.searchInput = null;
        this.searchBtn = null;
        this.onSearchCallback = null;
    }
    // 初始化搜索功能
    init(searchInputId, searchBtnId, onSearchCallback) {
        this.searchInput = document.getElementById(searchInputId);
        this.searchBtn = document.getElementById(searchBtnId);
        this.onSearchCallback = onSearchCallback;
        if (!this.searchInput || !this.searchBtn) {
            console.error('搜索元素未找到');
            return;
        }
        this.bindEvents();
        this.initURLSearch();
    }
    // 绑定搜索事件
    bindEvents() {
        // 搜索按钮点击
        this.searchBtn.addEventListener('click', () => this.performSearch());
        // 回车键搜索
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        // 实时搜索
         this.searchInput.addEventListener('input', 
         this.debounce(() => this.performSearch(), 300));
    }
    // 执行搜索
    performSearch() {
        const oldTerm = this.searchTerm;
        this.searchTerm = this.searchInput.value.trim();
        // 只有当搜索词变化时才回调
        if (oldTerm !== this.searchTerm && this.onSearchCallback) {
            this.onSearchCallback(this.searchTerm);
        }
    }
    // 清除搜索
    clearSearch() {
        this.searchInput.value = '';
        this.searchTerm = '';
        if (this.onSearchCallback) {
            this.onSearchCallback('');
        }
    }
    // 初始化URL参数搜索
    initURLSearch() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            this.searchInput.value = searchParam;
            this.searchTerm = searchParam;
            if (this.onSearchCallback) {
                this.onSearchCallback(searchParam);
            }
        }
    }
    // 获取当前搜索词
    getSearchTerm() {
        return this.searchTerm;
    }
    // 设置搜索词（外部调用）
    setSearchTerm(term) {
        this.searchTerm = term;
        if (this.searchInput) {
            this.searchInput.value = term;
        }
    }
    // 防抖函数（用于实时搜索）
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}
// 创建全局搜索管理器实例
const searchManager = new SearchManager();
// 初始化页面
function initPage() {
    // 显示当前用户状态
    updateUserStatus();
    // 显示商品
    displayProducts(products);
    // 更新购物车数量显示
    updateCartCount();
    // 初始化搜索管理器
    searchManager.init('searchInput', 'searchBtn', (searchTerm) => {
        // 搜索回调：当搜索词变化时执行
        handleSearch(searchTerm);
    });
    // 初始化轮播图
    initBanner();
    // 绑定事件
    bindEvents();
}
// 搜索处理函数
function handleSearch(term) {
    // 更新分类标题
    updateSearchTitle(term);
    // 过滤并显示商品
    filterAndDisplayProducts();
}
function updateSearchTitle(searchTerm) {
    const categoryNames = {
        all: '推荐商品',
        electronics: '电脑数码',
        clothing: '服装服饰',
        home: '家居家装',
        food: '食品饮料',
        sports: '运动户外',
        books: '图书音像'
    };
    let title = categoryNames[currentCategory] || '商品';
    
    if (searchTerm) {
        title = `搜索"${searchTerm}"的结果`;
    }
    if (categoryTitle) {
        categoryTitle.textContent = title;
    }
}

// 整合过滤和显示逻辑
function filterAndDisplayProducts() {
    const searchTerm = searchManager.getSearchTerm();
    let filteredProducts = products;
    // 1. 按分类过滤
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(
            product => product.category === currentCategory
        );
    }
    // 2. 按搜索词过滤
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    // 3. 显示商品
    displayProducts(filteredProducts);
}

// 绑定事件
function bindEvents() {
    // 分类点击事件
    categories.forEach(category => {
        category.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
            
            currentCategory = category.dataset.category;
            
            // 分类变化时也要更新显示
            updateSearchTitle(searchManager.getSearchTerm());
            filterAndDisplayProducts();
        });
    });
    
    // 用户登录/注册事件
    userStatus.addEventListener('click', () => {
        if (currentUser) {
            logout();
        } else {
            showLoginModal();
        }
    });
    
    registerBtn.addEventListener('click', showRegisterModal);
    
    // 关闭模态框事件
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            authModal.style.display = 'none';
        });
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });
}

// 轮播图相关函数
function initBanner() {
    const bannerContainer = document.getElementById('bannerContainer');
    const bannerIndicators = document.getElementById('bannerIndicators');
    // 清空轮播图容器
    bannerContainer.innerHTML = '';
    bannerIndicators.innerHTML = '';
    // 添加轮播图图片和指示器
    for (let i = 0; i < TOTAL_SLIDES; i++) {
        // 创建轮播图slide
        const slide = document.createElement('div');
        slide.className = 'banner-slide';
        slide.innerHTML = `<img src="images/banners/轮播图${i + 1}.png" alt="轮播图${i + 1}">`;
        bannerContainer.appendChild(slide);
        // 创建指示器
        const indicator = document.createElement('div');
        indicator.className = 'banner-indicator';
        indicator.dataset.index = i;
        if (i === 0) indicator.classList.add('active');
        // 绑定指示器点击事件
        indicator.addEventListener('click', () => {
            goToSlide(i);
        });
        bannerIndicators.appendChild(indicator);
    }
    // 开始自动轮播
    startSlideShow();
    // 添加鼠标悬停暂停功能
    const bannerSection = document.querySelector('.banner-section');
    bannerSection.addEventListener('mouseenter', stopSlideShow);
    bannerSection.addEventListener('mouseleave', startSlideShow);
}
// 开始轮播
function startSlideShow() {
    // 清除已有的定时器
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    // 设置新的定时器
    slideInterval = setInterval(() => {
        nextSlide();
    }, SLIDE_INTERVAL);
}
// 停止轮播
function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// 下一张轮播图
function nextSlide() {
    currentSlide = (currentSlide + 1) % TOTAL_SLIDES;
    updateSlide();
}
// 跳转到指定轮播图
function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    // 重新开始自动轮播
    startSlideShow();
}

// 更新轮播图显示
function updateSlide() {
    const bannerContainer = document.getElementById('bannerContainer');
    const indicators = document.querySelectorAll('.banner-indicator');
    // 移动轮播图容器
    bannerContainer.style.transform = `translateX(-${currentSlide * 20}%)`;
    // 更新指示器状态
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 添加到购物车
function addToCart(productId) {
    // 检查用户是否登录
    if (!currentUser) {
        alert('请先登录再添加商品到购物车');
        showLoginModal();
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // 检查购物车是否已有该商品
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    // 保存到localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 更新购物车数量显示
    updateCartCount();
    
    // 显示添加成功提示
    alert(`成功添加 ${product.name} 到购物车`);
}

// 更新购物车数量显示
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);

// 在页面离开时清除定时器（防止内存泄漏）
window.addEventListener('beforeunload', () => {
    stopSlideShow();
});

// 导出搜索管理器到全局（如果需要外部访问）
if (typeof window !== 'undefined') {
    window.searchManager = searchManager;
}