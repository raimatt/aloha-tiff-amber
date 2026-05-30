import { getToken } from "./auth";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function authHeaders() {
  const token = getToken()

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}

async function responseCheck(res) {
  const text = await res.text();
  throw new Error(`HTTP ${res.status}: ${text}`);
}

export const createProduct = async (data) => {
  const headers = authHeaders()

  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    await responseCheck(response)
  }

  return response.json()
}

export const updateProduct = async (id, data) => {
  const headers = authHeaders()

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    await responseCheck(response)
  }

  return response.json()
}

export const deleteProduct = async (id) => {
  const headers = authHeaders()

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers
  })

  if (!response.ok) {
    await responseCheck(response)
  }

  return response.json()
}

export const uploadImage = async (file) => {
  const form = new FormData()
  form.append("image", file)

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${getToken()}`
    },
    body: form
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || `Upload failed (${response.status})`)
  }

  const data = await response.json()
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
