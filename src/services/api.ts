import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ✅ Interceptor: Ajouter le token à chaque requête
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Récupérer le token du localStorage
    const token = localStorage.getItem("token"); // ou "accessToken" selon ton nom
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Interceptor: Gérer les erreurs 401 (token expiré/invalide)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalide ou expiré → Rediriger vers login
      console.error("Unauthorized - redirecting to login");
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Si tu stockes aussi l'user
      window.location.href = "/login"; // ou utiliser navigate si disponible
    }
    return Promise.reject(error);
  }
);

export default api;