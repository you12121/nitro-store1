// Products Data
const products = [
    {
        id: 1,
        title: "Discord Nitro Classic - شهر واحد",
        description: "احصل على مميزات Discord Nitro Classic لمدة شهر كامل",
        price: 1,
        oldPrice: 6.99,
        image: "assets/images/nitro-classic-card.png",
        category: "classic",
        badge: "الأكثر شعبية",
        features: [
            "رفع ملفات حتى 50MB",
            "جودة فيديو عالية",
            "إيموجي مخصصة",
            "تخصيص العلامة"
        ],
        inStock: true
    },
    {
        id: 2,
        title: "Discord Nitro - شهر واحد",
        description: "الباقة الكاملة من Discord Nitro مع جميع المميزات",
        price: 9.99,
        oldPrice: 12.99,
        image: "assets/images/nitro-premium-card.png",
        category: "nitro",
        badge: "الأفضل",
        features: [
            "رفع ملفات حتى 100MB",
            "جودة فيديو 4K",
            "إيموجي مخصصة",
            "Server Boost مجاني",
            "ألعاب مجانية"
        ],
        inStock: true
    },
    {
        id: 3,
        title: "Discord Nitro Classic - 3 أشهر",
        description: "وفر أكثر مع باقة الثلاثة أشهر",
        price: 12.99,
        oldPrice: 18.99,
        image: "assets/images/nitro-classic-card.png",
        category: "classic",
        badge: "وفر 30%",
        features: [
            "رفع ملفات حتى 50MB",
            "جودة فيديو عالية",
            "إيموجي مخصصة",
            "تخصيص العلامة"
        ],
        inStock: true
    },
    {
        id: 4,
        title: "Discord Nitro - سنة كاملة",
        description: "أفضل قيمة! باقة سنوية كاملة مع خصم كبير",
        price: 99.99,
        oldPrice: 119.99,
        image: "assets/images/nitro-premium-card.png",
        category: "nitro",
        badge: "أفضل قيمة",
        features: [
            "رفع ملفات حتى 100MB",
            "جودة فيديو 4K",
            "إيموجي مخصصة",
            "Server Boost مجاني",
            "ألعاب مجانية",
            "دعم أولوية"
        ],
        inStock: true
    },
    {
        id: 5,
        title: "Server Boost - شهر واحد",
        description: "عزز خادمك المفضل بـ Server Boost",
        price: 4.99,
        oldPrice: null,
        image: "assets/images/server-boost-card.png",
        category: "boost",
        badge: "جديد",
        features: [
            "تحسين جودة الصوت",
            "رفع حد الملفات",
            "إيموجي إضافية",
            "خلفية خادم مخصصة"
        ],
        inStock: true
    },
    {
        id: 6,
        title: "Server Boost - 3 أشهر",
        description: "باقة Server Boost لثلاثة أشهر مع خصم",
        price: 12.99,
        oldPrice: 14.99,
        image: "assets/images/server-boost-card.png",
        category: "boost",
        badge: "وفر 15%",
        features: [
            "تحسين جودة الصوت",
            "رفع حد الملفات",
            "إيموجي إضافية",
            "خلفية خادم مخصصة"
        ],
        inStock: true
    }
];

// Filter products by category
function filterProducts(category) {
    const grid = document.getElementById('products-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    // Filter and display products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// Display products in grid
function displayProducts(productsToShow) {
    const grid = document.getElementById('products-grid');
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card scroll-animate" data-category="${product.category}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features.map(feature => `
                        <div class="product-feature">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="product-footer">
                    <div class="product-price">
                        $${product.price}
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn-icon btn-view" onclick="openProductModal(${product.id})" title="عرض التفاصيل">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon btn-cart" onclick="addToCart(${product.id})" title="إضافة للعربة">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Trigger scroll animations
    setTimeout(() => {
        observeScrollAnimations();
    }, 100);
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Open product modal
function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-product-title');
    const modalImage = document.getElementById('modal-product-image');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDescription = document.getElementById('modal-product-description');
    const modalFeatures = document.getElementById('modal-product-features');
    const modalQuantity = document.getElementById('modal-quantity');
    
    modalTitle.textContent = product.title;
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalPrice.innerHTML = `$${product.price} ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}`;
    modalDescription.textContent = product.description;
    modalFeatures.innerHTML = product.features.map(feature => `
        <div class="product-feature">
            <i class="fas fa-check"></i>
            <span>${feature}</span>
        </div>
    `).join('');
    modalQuantity.value = 1;
    
    // Store current product ID for adding to cart
    modal.dataset.productId = productId;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Increase quantity
function increaseQuantity() {
    const quantityInput = document.getElementById('modal-quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}

// Decrease quantity
function decreaseQuantity() {
    const quantityInput = document.getElementById('modal-quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

// Add to cart from modal
function addToCartFromModal() {
    const modal = document.getElementById('product-modal');
    const productId = parseInt(modal.dataset.productId);
    const quantity = parseInt(document.getElementById('modal-quantity').value);
    
    addToCart(productId, quantity);
    closeProductModal();
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', function() {
    // Display all products initially
    displayProducts(products);
    
    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.filter;
            filterProducts(category);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('product-modal');
        if (event.target === modal) {
            closeProductModal();
        }
    });
});

