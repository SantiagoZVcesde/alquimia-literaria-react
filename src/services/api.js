export const API_CONFIG = {
    BASE_URL: 'https://fakestoreapi.com',
    ENDPOINTS: {
        PRODUCTS: '/products',
        CART: '/cart',
        LOGIN: '/auth/login',
        USERS: '/users'
    }
};

// AÑADE ESTO AL FINAL para que Login.jsx no se rompa:
export const end_points = {
    users: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`
};