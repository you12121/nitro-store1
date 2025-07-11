// Main JavaScript file for Nitro Store

// Global variables
let isLoading = false;

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },
    
    // Generate unique ID
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Performance optimizations
const performance = {
    // Lazy load images
    initLazyLoading: function() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    },
    
    // Preload critical resources
    preloadResources: function() {
        const criticalImages = [
            'assets/images/nitro-logo.png',
            'assets/images/hero-background.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
};

// Analytics and tracking
const analytics = {
    // Track user interactions
    trackEvent: function(category, action, label = '') {
        // Simulate analytics tracking
        console.log(`Analytics: ${category} - ${action} - ${label}`);
        
        // In a real implementation, you would send this to your analytics service
        // Example: gtag('event', action, { event_category: category, event_label: label });
    },
    
    // Track page views
    trackPageView: function(page) {
        this.trackEvent('Navigation', 'Page View', page);
    },
    
    // Track product interactions
    trackProductView: function(productId, productName) {
        this.trackEvent('Product', 'View', `${productId} - ${productName}`);
    },
    
    // Track cart actions
    trackCartAction: function(action, productId, productName) {
        this.trackEvent('Cart', action, `${productId} - ${productName}`);
    }
};

// Error handling
const errorHandler = {
    // Log errors
    logError: function(error, context = '') {
        console.error(`Error in ${context}:`, error);
        
        // In production, you might want to send errors to a logging service
        // Example: Sentry.captureException(error);
    },
    
    // Handle network errors
    handleNetworkError: function(error) {
        showSuccessMessage('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.', 'error');
        this.logError(error, 'Network');
    },
    
    // Handle validation errors
    handleValidationError: function(field, message) {
        const fieldElement = document.querySelector(`[name="${field}"]`);
        if (fieldElement) {
            fieldElement.classList.add('error');
            // Remove error class after user starts typing
            fieldElement.addEventListener('input', function() {
                this.classList.remove('error');
            }, { once: true });
        }
        showSuccessMessage(message, 'error');
    }
};

// Local storage management
const storage = {
    // Set item with expiration
    setItem: function(key, value, expirationHours = 24) {
        const item = {
            value: value,
            expiration: Date.now() + (expirationHours * 60 * 60 * 1000)
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    
    // Get item with expiration check
    getItem: function(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        
        try {
            const item = JSON.parse(itemStr);
            if (Date.now() > item.expiration) {
                localStorage.removeItem(key);
                return null;
            }
            return item.value;
        } catch (e) {
            localStorage.removeItem(key);
            return null;
        }
    },
    
    // Remove item
    removeItem: function(key) {
        localStorage.removeItem(key);
    }
};

// Theme management
const theme = {
    // Toggle dark mode (for future implementation)
    toggleDarkMode: function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        storage.setItem('dark-mode', isDark);
    },
    
    // Initialize theme
    initTheme: function() {
        const savedTheme = storage.getItem('dark-mode');
        if (savedTheme) {
            document.body.classList.add('dark-mode');
        }
    }
};

// Accessibility improvements
const accessibility = {
    // Add keyboard navigation
    initKeyboardNavigation: function() {
        document.addEventListener('keydown', function(e) {
            // Close modals with Escape key
            if (e.key === 'Escape') {
                closeCart();
                closeProductModal();
            }
            
            // Navigate with arrow keys in product grid
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const focusedElement = document.activeElement;
                if (focusedElement.classList.contains('product-card')) {
                    const productCards = Array.from(document.querySelectorAll('.product-card'));
                    const currentIndex = productCards.indexOf(focusedElement);
                    
                    let nextIndex;
                    if (e.key === 'ArrowRight') {
                        nextIndex = (currentIndex + 1) % productCards.length;
                    } else {
                        nextIndex = (currentIndex - 1 + productCards.length) % productCards.length;
                    }
                    
                    productCards[nextIndex].focus();
                    e.preventDefault();
                }
            }
        });
    },
    
    // Add focus indicators
    initFocusIndicators: function() {
        // Add focus styles for keyboard navigation
        const style = document.createElement('style');
        style.textContent = `
            .product-card:focus,
            .feature-card:focus,
            .btn:focus {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
        
        // Make product cards focusable
        document.querySelectorAll('.product-card').forEach(card => {
            card.setAttribute('tabindex', '0');
        });
    },
    
    // Add ARIA labels
    initAriaLabels: function() {
        // Add ARIA labels to interactive elements
        document.querySelectorAll('.btn-cart').forEach(btn => {
            btn.setAttribute('aria-label', 'إضافة إلى عربة التسوق');
        });
        
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.setAttribute('aria-label', 'عرض تفاصيل المنتج');
        });
    }
};

// Search functionality (for future implementation)
const search = {
    // Initialize search
    initSearch: function() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;
        
        const debouncedSearch = utils.debounce(this.performSearch, 300);
        searchInput.addEventListener('input', debouncedSearch);
    },
    
    // Perform search
    performSearch: function(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            displayProducts(products);
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.features.some(feature => feature.toLowerCase().includes(query))
        );
        
        displayProducts(filteredProducts);
        analytics.trackEvent('Search', 'Query', query);
    }
};

// Newsletter subscription (for future implementation)
const newsletter = {
    // Subscribe to newsletter
    subscribe: function(email) {
        if (!this.validateEmail(email)) {
            showSuccessMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }
        
        // Simulate API call
        showSuccessMessage('تم الاشتراك في النشرة الإخبارية بنجاح!');
        analytics.trackEvent('Newsletter', 'Subscribe', email);
    },
    
    // Validate email
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize performance optimizations
        performance.preloadResources();
        performance.initLazyLoading();
        
        // Initialize accessibility features
        accessibility.initKeyboardNavigation();
        accessibility.initFocusIndicators();
        accessibility.initAriaLabels();
        
        // Initialize theme
        theme.initTheme();
        
        // Initialize search (if search input exists)
        search.initSearch();
        
        // Track initial page load
        analytics.trackPageView('Home');
        
        console.log('Nitro Store initialized successfully!');
        
    } catch (error) {
        errorHandler.logError(error, 'Initialization');
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - pause animations, etc.
        console.log('Page hidden');
    } else {
        // Page is visible - resume animations, etc.
        console.log('Page visible');
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    showSuccessMessage('تم استعادة الاتصال بالإنترنت');
});

window.addEventListener('offline', function() {
    showSuccessMessage('انقطع الاتصال بالإنترنت', 'error');
});

// Export functions for global use
window.NitroStore = {
    utils,
    analytics,
    storage,
    theme,
    search,
    newsletter
};

