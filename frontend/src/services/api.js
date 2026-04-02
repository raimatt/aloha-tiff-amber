const API_URL = 'http://localhost:5000/api';

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
