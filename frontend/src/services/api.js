import { getToken, logout, markSessionExpired } from "./auth";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Skip Content-Type for FormData so the browser sets the multipart boundary itself.
function authHeaders(isJson = true) {
  const headers = { Authorization: `Bearer ${getToken()}` }
  if (isJson) headers["Content-Type"] = "application/json"
  return headers
}

// A 401 means the token is dead: clear it and send the admin back to login.
function handleUnauthorized() {
  logout()
  markSessionExpired()
  if (window.location.pathname.startsWith("/admin")) {
    // Hard redirect (not router) because this lives outside React's component tree.
    // replace() so the dead admin page doesn't sit in history.
    window.location.replace("/admin/login")
  }
}

// One wrapper for every protected request, so 401 handling lives in one place.
async function authedFetch(url, options = {}) {
  const isForm = options.body instanceof FormData

  const response = await fetch(url, {
    ...options,
    headers: { ...authHeaders(!isForm), ...(options.headers || {}) },
  })

  if (response.status === 401) {
    handleUnauthorized()
    // Tagged so callers can skip rendering an error message — we're redirecting.
    const err = new Error("Your session expired. Please log in again.")
    err.code = "SESSION_EXPIRED"
    throw err
  }

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`HTTP ${response.status}: ${text}`)
  }

  return response.json()
}

export const createProduct = (data) =>
  authedFetch(`${API_URL}/products`, { method: "POST", body: JSON.stringify(data) })

export const updateProduct = (id, data) =>
  authedFetch(`${API_URL}/products/${id}`, { method: "PUT", body: JSON.stringify(data) })

export const deleteProduct = (id) =>
  authedFetch(`${API_URL}/products/${id}`, { method: "DELETE" })

export const uploadImage = async (file) => {
  const form = new FormData()
  form.append("image", file)

  const data = await authedFetch(`${API_URL}/upload`, { method: "POST", body: form })
  return data.url
}

export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  return response.json();
};

export const getProductsByCategory = async (category) => {
  const response = await fetch(`${API_URL}/products/category/${category}`);

  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);

  return response.json();
};
