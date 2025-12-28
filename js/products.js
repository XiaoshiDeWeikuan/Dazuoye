// 商品数据 - 使用提供的图片
const products = [
    // 电脑数码 (electronics)
    { 
        id: 1, 
        name: "前行者G5 无线鼠标", 
        price: 89, 
        category: "electronics", 
        image: "images/products/前行者G5 无线鼠标.png" 
    },
    { 
        id: 2, 
        name: "星绩 腾讯混元AI智能无线蓝牙鼠标", 
        price: 129, 
        category: "electronics", 
        image: "images/products/星绩 腾讯混元AI智能无线蓝牙鼠标.jpg" 
    },
    { 
        id: 3, 
        name: "剑圣一族有线电竞游戏鼠标", 
        price: 79, 
        category: "electronics", 
        image: "images/products/剑圣一族有线电竞游戏鼠标.png" 
    },
    { 
        id: 4, 
        name: "联想 27英寸显示器", 
        price: 1299, 
        category: "electronics", 
        image: "images/products/联想 27英寸显示器.jpg" 
    },
    { 
        id: 5, 
        name: "飞利浦（PHILIPS）27英寸2K IPS显示器", 
        price: 1599, 
        category: "electronics", 
        image: "images/products/飞利浦（PHILIPS）27英寸2K IPS 8bit 低蓝光 HDMI+DP 节能认证 设计显示屏幕.jpg" 
    },
    { 
        id: 6, 
        name: "飞利浦EVNIA弈威 27英寸电竞游戏显示器", 
        price: 1899, 
        category: "electronics", 
        image: "images/products/飞利浦EVNIA弈威 27英寸电竞游戏显示器.jpg" 
    },
    
    // 服装服饰 (clothing)
    { 
        id: 7, 
        name: "蒙羊王男士羊毛裤薄款修身保暖裤", 
        price: 169, 
        category: "clothing", 
        image: "images/products/蒙羊王男士羊毛裤薄款修身保暖裤男打底裤.jpg" 
    },
    { 
        id: 8, 
        name: "恒源祥蚕丝棉裤", 
        price: 199, 
        category: "clothing", 
        image: "images/products/恒源祥蚕丝棉裤.jpg" 
    },
    { 
        id: 9, 
        name: "LOYEZI VUTYZIUO男鞋新款2025冬季透气真皮运动板鞋", 
        price: 399, 
        category: "clothing", 
        image: "images/products/LOYEZI VUTYZIUO男鞋新款2025冬季透气真皮运动板鞋.jpg" 
    },
    { 
        id: 10, 
        name: "回力（Warrior）棉质卫衣男秋冬", 
        price: 159, 
        category: "clothing", 
        image: "images/products/回力（Warrior）棉质卫衣男秋冬.jpg" 
    },
    { 
        id: 11, 
        name: "HLA海澜之家卫衣男春季", 
        price: 229, 
        category: "clothing", 
        image: "images/products/HLA海澜之家卫衣男春季.jpg" 
    },
    { 
        id: 12, 
        name: "恒源祥轻奢纯100%羊毛绒衫", 
        price: 459, 
        category: "clothing", 
        image: "images/products/恒源祥轻奢纯100羊毛绒衫.jpg"
    },
    { 
        id: 13, 
        name: "HLA海澜之家卫衣冬", 
        price: 289, 
        category: "clothing", 
        image: "images/products/HLA海澜之家卫衣冬.jpg" 
    },
    { 
        id: 14, 
        name: "施华洛世奇幸运四叶草女士项链", 
        price: 1299, 
        category: "clothing", 
        image: "images/products/施华洛世奇（SWAROVSKI）Latisha 幸运四叶草女士项链.jpg" 
    },
    
    // 家居家装 (home)
    { 
        id: 15, 
        name: "浪莎（LangSha）乳胶枕头枕芯深睡护颈椎枕", 
        price: 129, 
        category: "home", 
        image: "images/products/浪莎（LangSha）乳胶枕头枕芯深睡护颈椎枕.jpg" 
    },
    { 
        id: 16, 
        name: "雅鹿澳洲进口羊毛被子100纯羊毛", 
        price: 499, 
        category: "home", 
        image: "images/products/雅鹿澳洲进口羊毛被子100纯羊毛.jpg" 
    },
    { 
        id: 17, 
        name: "木墨（mumo） 组合书柜", 
        price: 899, 
        category: "home", 
        image: "images/products/木墨（mumo） 组合书柜.jpg" 
    },
    { 
        id: 18, 
        name: "添可芙万极客蒸汽版全向助力洗地机", 
        price: 3299, 
        category: "home", 
        image: "images/products/添可芙万极客蒸汽版全向助力洗地机.jpg" 
    },
    { 
        id: 19, 
        name: "碧云泉G5小积木净水器", 
        price: 1299, 
        category: "home", 
        image: "images/products/碧云泉G5小积木净水器.jpg" 
    },
    { 
        id: 20, 
        name: "熊猫中国风入户电梯门贴纸", 
        price: 39, 
        category: "home", 
        image: "images/products/熊猫中国风入户电梯门贴纸.jpg" 
    },
    
    // 食品饮料 (food)
    { 
        id: 21, 
        name: "麦酥园 芝士夹心饼干早餐饼干", 
        price: 25, 
        category: "food", 
        image: "images/products/麦酥园 芝士夹心饼干早餐饼干.jpg" 
    },
    { 
        id: 22, 
        name: "泓一黑米芡实糕", 
        price: 19, 
        category: "food", 
        image: "images/products/泓一黑米芡实糕.jpg" 
    },
    { 
        id: 23, 
        name: "颜小贝爆浆可颂夹心面包", 
        price: 32, 
        category: "food", 
        image: "images/products/颜小贝爆浆可颂夹心面包.jpg" 
    },
    { 
        id: 24, 
        name: "小胡鸭香辣去骨鸭掌248g", 
        price: 46, 
        category: "food", 
        image: "images/products/小胡鸭香辣去骨鸭掌248g.jpg" 
    },
    { 
        id: 25, 
        name: "盼盼 手撕面包棒700g", 
        price: 29, 
        category: "food", 
        image: "images/products/盼盼 手撕面包棒700g.jpg" 
    },
    { 
        id: 26, 
        name: "猪兄全麦面包2斤", 
        price: 35, 
        category: "food", 
        image: "images/products/猪兄全麦面包2斤.jpg" 
    },
    { 
        id: 27, 
        name: "盼盼 鸡蛋糕700g", 
        price: 27, 
        category: "food", 
        image: "images/products/盼盼 鸡蛋糕700g.jpg" 
    },
    
    // 图书音像 (books)
    { 
        id: 28, 
        name: "《正是橙黄橘绿时》图书", 
        price: 49, 
        category: "books", 
        image: "images/products/《正是橙黄橘绿时》图书.jpg" 
    },
    { 
        id: 29, 
        name: "《中国史极简》", 
        price: 59, 
        category: "books", 
        image: "images/products/《中国史极简》.jpg" 
    },
    { 
        id: 30, 
        name: "吴军全套4册见识+态度+格局+富足", 
        price: 199, 
        category: "books", 
        image: "images/products/吴军全套4册见识+态度+格局+富足全套4套.jpg" 
    },
    { 
        id: 31, 
        name: "朝花夕拾原著正版", 
        price: 39, 
        category: "books", 
        image: "images/products/朝花夕拾原著正版.jpg" 
    },
    { 
        id: 32, 
        name: "【全2册】历史不忍细看+历史的遗憾", 
        price: 69, 
        category: "books", 
        image: "images/products/【全2册】历史不忍细看+历史的遗憾.jpg" 
    },
    { 
        id: 33, 
        name: "飞鸟集+新月集 中英双语对照注释版", 
        price: 45, 
        category: "books", 
        image: "images/products/飞鸟集+新月集 中英双语对照注释版.jpg" 
    },
    
    // 运动户外 (sports) - 新增商品
    { 
        id: 34, 
        name: "李宁骑行围脖套男女加绒加厚骑行面罩", 
        price: 89, 
        category: "sports", 
        image: "images/products/李宁骑行围脖套男女加绒加厚骑行面罩.jpg" 
    },
    { 
        id: 35, 
        name: "特步（XTEP）护膝半月板损伤运动医滑膜炎专用", 
        price: 129, 
        category: "sports", 
        image: "images/products/特步（XTEP）护膝半月板损伤运动医滑膜炎专用.jpg" 
    },
    { 
        id: 36, 
        name: "李宁（LI-NING）护膝运动保暖男女士跑步", 
        price: 99, 
        category: "sports", 
        image: "images/products/李宁（LI-NING）护膝运动保暖男女士跑步.jpg" 
    },
    { 
        id: 37, 
        name: "TPE可折叠瑜伽垫", 
        price: 159, 
        category: "sports", 
        image: "images/products/TPE可折叠瑜伽垫.jpg" 
    },
    { 
        id: 38, 
        name: "艾伦伯顿（Alen Botun）跑步运动套装", 
        price: 299, 
        category: "sports", 
        image: "images/products/艾伦伯顿（Alen Botun）跑步运动套装.jpg" 
    },
    { 
        id: 39, 
        name: "步锐特（BURUITE）跑步运动套装男", 
        price: 269, 
        category: "sports", 
        image: "images/products/步锐特（BURUITE）跑步运动套装男.jpg" 
    },
    { 
        id: 40, 
        name: "回力男鞋休闲款劳保鞋", 
        price: 189, 
        category: "sports", 
        image: "images/products/回力男鞋休闲款劳保鞋.jpg" 
    },
    { 
        id: 41, 
        name: "361°外套男秋冬季新款立领运动休闲户外", 
        price: 399, 
        category: "sports", 
        image: "images/products/361°外套男秋冬季新款立领运动休闲户外.jpg" 
    }
];

// 修复图片路径函数（处理特殊字符）
function encodeImagePath(imagePath) {
    // 对路径进行编码，但保留斜杠
    const parts = imagePath.split('/');
    const encodedParts = parts.map(part => {
        // 对文件名部分进行编码
        if (part.includes('.')) {
            return encodeURIComponent(part);
        }
        return part;
    });
    return encodedParts.join('/');
}

// 显示商品
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<div class="empty-cart">没有找到相关商品</div>';
        return;
    }
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category; // 添加data-category属性用于CSS样式
        // 使用编码后的图片路径
        const encodedImagePath = encodeImagePath(product.image);
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${encodedImagePath}" alt="${product.name}" 
                     onerror="handleImageError(this, '${product.name}')">
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">¥${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> 加入购物车
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    // 绑定加入购物车按钮事件
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
            addToCart(productId);
        });
    });
}

// 图片加载错误处理函数
function handleImageError(img, productName) {
    console.warn(`图片加载失败: ${productName}, 路径: ${img.src}`);
    
    // 移除错误图片
    img.style.display = 'none';
    
    // 创建替代的占位符
    const container = img.parentElement;
    const placeholder = document.createElement('div');
    placeholder.className = 'product-img-placeholder';
    placeholder.innerHTML = `
        <div class="placeholder-content">
            <i class="fas fa-image"></i>
            <span>${productName}</span>
        </div>
    `;
    container.appendChild(placeholder);
}

// 页面加载时显示所有商品
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
});