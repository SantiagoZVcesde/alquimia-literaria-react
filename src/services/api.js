export const API_CONFIG = {
    BASE_URL: 'https://biblioteca-digital-grupo-6-fb6e.onrender.com',
    ENDPOINTS: {
        CLIENTES: '/api/v1/clientes',
        REGISTRO: '/api/v1/clientes/registro',
        LIBROS: '/api/libros',
        CATEGORIAS: '/api/categorias',
        COMPRAS: '/api/compras',
        PRESTAMOS: '/api/prestamos'
    }
};

// Objeto centralizado para mantener compatibilidad absoluta con Login, Register y Library
export const end_points = {
    // Clientes / Usuarios
    users: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLIENTES}`,
    register: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTRO}`,
    
    // Catálogo de libros y categorías
    books: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LIBROS}`,
    categories: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIAS}`,
    
    // Transacciones del sistema
    purchases: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMPRAS}`,
    loans: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRESTAMOS}`
};