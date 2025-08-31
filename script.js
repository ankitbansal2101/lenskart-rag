// Product Data
const products = [
    {
        id: 1,
        name: "Classic Aviator Sunglasses",
        brand: "Ray-Ban",
        category: "sunglasses",
        price: 159.99,
        originalPrice: 199.99,
        rating: 4.8,
        reviewCount: 1247,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
        features: ["UV Protection", "Polarized", "Metal Frame"]
    },
    {
        id: 2,
        name: "Modern Rectangle Eyeglasses",
        brand: "Prada",
        category: "eyeglasses",
        price: 299.99,
        originalPrice: null,
        rating: 4.6,
        reviewCount: 892,
        badge: "new",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop&crop=center",
        features: ["Blue Light Filter", "Lightweight", "Titanium Frame"]
    },
    {
        id: 3,
        name: "Round Vintage Frames",
        brand: "Gucci",
        category: "eyeglasses",
        price: 449.99,
        originalPrice: 529.99,
        rating: 4.9,
        reviewCount: 356,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center",
        features: ["Designer Collection", "Premium Materials", "Adjustable Nose Pads"]
    },
    {
        id: 4,
        name: "Sport Sunglasses Pro",
        brand: "Oakley",
        category: "sunglasses",
        price: 189.99,
        originalPrice: null,
        rating: 4.7,
        reviewCount: 2103,
        badge: null,
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop&crop=center",
        features: ["Impact Resistant", "Wraparound Design", "Anti-Slip"]
    },
    {
        id: 5,
        name: "Blue Light Reading Glasses",
        brand: "Lenskart",
        category: "reading",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.4,
        reviewCount: 1876,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop&crop=center",
        features: ["Blue Light Protection", "Anti-Glare", "Comfortable Fit"]
    },
    {
        id: 6,
        name: "Cat Eye Fashion Frames",
        brand: "Ray-Ban",
        category: "eyeglasses",
        price: 219.99,
        originalPrice: null,
        rating: 4.5,
        reviewCount: 743,
        badge: "new",
        image: "https://images.unsplash.com/photo-1541447270888-26fd4b317831?w=400&h=400&fit=crop&crop=center",
        features: ["Trendy Design", "Acetate Frame", "Spring Hinges"]
    },
    {
        id: 7,
        name: "Polarized Driving Glasses",
        brand: "Oakley",
        category: "sunglasses",
        price: 269.99,
        originalPrice: 319.99,
        rating: 4.8,
        reviewCount: 1432,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop&crop=center",
        features: ["Polarized Lenses", "Reduce Glare", "Enhanced Contrast"]
    },
    {
        id: 8,
        name: "Minimalist Wire Frames",
        brand: "Prada",
        category: "eyeglasses",
        price: 399.99,
        originalPrice: null,
        rating: 4.3,
        reviewCount: 567,
        badge: null,
        image: "https://images.unsplash.com/photo-1584441405886-bc91be61e56a?w=400&h=400&fit=crop&crop=center",
        features: ["Ultra-Light", "Memory Metal", "Adjustable Temple"]
    },
    {
        id: 9,
        name: "Progressive Reading Glasses",
        brand: "Lenskart",
        category: "reading",
        price: 149.99,
        originalPrice: 189.99,
        rating: 4.6,
        reviewCount: 934,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1582142306909-195724d75083?w=400&h=400&fit=crop&crop=center",
        features: ["Progressive Lenses", "Multi-Focus", "Scratch Resistant"]
    }
];

// Application State
let currentProducts = [...products];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const brandFilter = document.getElementById('brandFilter');
const priceFilter = document.getElementById('priceFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const chatIcon = document.getElementById('chatIcon');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(currentProducts);
    updateCartBadge();
    updateWishlistBadge();
    initializeEventListeners();
    initializeChatbot();
});

// Product Rendering
function renderProducts(productsToRender, append = false) {
    if (!append) {
        productsGrid.innerHTML = '';
    }
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Add animation to new products
    const newCards = productsGrid.querySelectorAll('.product-card:not(.animated)');
    newCards.forEach((card, index) => {
        card.classList.add('animated');
        setTimeout(() => {
            card.classList.add('fade-in-up');
        }, index * 100);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.parentElement.innerHTML='<div class=&quot;product-placeholder&quot;><i class=&quot;fas fa-glasses&quot;></i></div>'">
            ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge.toUpperCase()}</span>` : ''}
            <div class="product-actions">
                <button class="product-action-btn" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
                    <i class="fas fa-heart ${wishlist.includes(product.id) ? 'text-red' : ''}"></i>
                </button>
                <button class="product-action-btn" onclick="quickView(${product.id})" title="Quick View">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">
                <span class="price-current">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-count">(${product.reviewCount})</span>
            </div>
            <div class="product-actions-bottom">
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
                <button class="quick-view" onclick="quickView(${product.id})">
                    Quick View
                </button>
            </div>
        </div>
    `;
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Filter Functionality
function initializeEventListeners() {
    categoryFilter.addEventListener('change', applyFilters);
    brandFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    clearFiltersBtn.addEventListener('click', clearAllFilters);
    loadMoreBtn.addEventListener('click', loadMoreProducts);
}

function applyFilters() {
    const category = categoryFilter.value;
    const brand = brandFilter.value;
    const priceRange = priceFilter.value;
    
    let filteredProducts = [...products];
    
    // Category filter
    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Brand filter
    if (brand) {
        filteredProducts = filteredProducts.filter(product => product.brand.toLowerCase().replace('-', '') === brand);
    }
    
    // Price filter
    if (priceRange) {
        const [min, max] = priceRange.includes('+') 
            ? [parseInt(priceRange.split('+')[0]), Infinity]
            : priceRange.split('-').map(p => parseInt(p));
        
        filteredProducts = filteredProducts.filter(product => 
            product.price >= min && (max === Infinity || product.price <= max)
        );
    }
    
    currentProducts = filteredProducts;
    renderProducts(currentProducts);
    
    // Show/hide load more button
    loadMoreBtn.style.display = filteredProducts.length > 9 ? 'block' : 'none';
}

function clearAllFilters() {
    categoryFilter.value = '';
    brandFilter.value = '';
    priceFilter.value = '';
    currentProducts = [...products];
    renderProducts(currentProducts);
    loadMoreBtn.style.display = 'block';
}

function loadMoreProducts() {
    // Simulate loading more products
    const additionalProducts = [...products].slice(0, 3); // Just repeat first 3 for demo
    renderProducts(additionalProducts, true);
}

// Shopping Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification(`${product.name} added to cart!`, 'success');
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification(`${product.name} removed from wishlist`, 'info');
    } else {
        wishlist.push(productId);
        showNotification(`${product.name} added to wishlist!`, 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    renderProducts(currentProducts); // Re-render to update heart icons
}

function updateCartBadge() {
    const cartBadge = document.querySelector('.fa-shopping-cart + .badge');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = cartCount;
}

function updateWishlistBadge() {
    const wishlistBadge = document.querySelector('.fa-heart + .badge');
    wishlistBadge.textContent = wishlist.length;
}

function quickView(productId) {
    const product = products.find(p => p.id === productId);
    showNotification(`Quick view for ${product.name} - Feature coming soon!`, 'info');
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('.notification-styles')) {
        const style = document.createElement('style');
        style.className = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 30px;
                background: white;
                color: #333;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 2000;
                display: flex;
                align-items: center;
                gap: 10px;
                min-width: 250px;
                animation: slideInRight 0.3s ease;
            }
            .notification.success { border-left: 4px solid #2ed573; }
            .notification.info { border-left: 4px solid #667eea; }
            .notification i { color: inherit; }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Chatbot Functionality
function initializeChatbot() {
    chatIcon.addEventListener('click', toggleChatWindow);
    chatClose.addEventListener('click', toggleChatWindow);
}

function toggleChatWindow() {
    chatWindow.classList.toggle('active');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search functionality (basic)
document.querySelector('.fa-search').addEventListener('click', function() {
    const searchTerm = prompt('Search for eyewear:');
    if (searchTerm) {
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
        currentProducts = filtered;
        renderProducts(currentProducts);
        showNotification(`Found ${filtered.length} results for "${searchTerm}"`, 'info');
    }
});

// Add some interactive elements
document.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});
