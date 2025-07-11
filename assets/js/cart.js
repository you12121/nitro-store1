// Shopping Cart Management
let cart = JSON.parse(localStorage.getItem('nitro-cart')) || [];

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    updateCartUI();
    saveCart();
    showSuccessMessage(`تم إضافة ${product.title} إلى العربة!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
}

// Update item quantity in cart
function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
            saveCart();
        }
    }
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--gray-color); margin-bottom: 1rem;"></i>
                <p>عربة التسوق فارغة</p>
                <button class="btn btn-primary" onclick="closeCart(); scrollToSection('products')">
                    <i class="fas fa-shopping-bag"></i>
                    تسوق الآن
                </button>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="إزالة من العربة">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Update cart total
    cartTotal.textContent = `$${calculateCartTotal().toFixed(2)}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('nitro-cart', JSON.stringify(cart));
}

// Open cart modal
function openCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    updateCartUI();
}

// Close cart modal
function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showSuccessMessage('عربة التسوق فارغة!', 'error');
        return;
    }
    
    // Simulate checkout process
    const total = calculateCartTotal();
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Show checkout confirmation
    const confirmCheckout = confirm(`
        هل تريد المتابعة للدفع؟
        
        عدد المنتجات: ${itemCount}
        المجموع: $${total.toFixed(2)}
        
        سيتم توجيهك لصفحة الدفع الآمنة.
    `);
    
    if (confirmCheckout) {
        // Simulate successful checkout
        showSuccessMessage('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.', 'success');
        
        // Clear cart
        cart = [];
        updateCartUI();
        saveCart();
        closeCart();
        
        // Scroll to contact section
        setTimeout(() => {
            scrollToSection('contact');
        }, 2000);
    }
}

// Show success message
function showSuccessMessage(message, type = 'success') {
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    
    successText.textContent = message;
    
    // Update styling based on type
    if (type === 'error') {
        successMessage.style.background = 'var(--error-color)';
    } else {
        successMessage.style.background = 'var(--success-color)';
    }
    
    successMessage.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    
    // Add event listener to cart link
    document.querySelector('.cart-link').addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
    });
    
    // Close cart modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('cart-modal');
        if (event.target === modal) {
            closeCart();
        }
    });
});

