// api.js
import axios from "axios";

const API = () => {
  const URL = process.env.NEXT_PUBLIC_TODO_CUSTOM_API;

  const handleRequest = async (request) => {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    console.error("API request failed:", error);
    throw error;
  };

  const getTodos = async () => {
    return handleRequest(axios.get(`${URL}/todos`));
  };

  const createTodo = async (data) => {
    return handleRequest(axios.post(`${URL}/todos`, data));
  };

  const updateTodo = async (id, data) => {
    return handleRequest(axios.put(`${URL}/todos/${id}`, data));
  };

  const deleteTodo = async (id) => {
    return handleRequest(axios.delete(`${URL}/todos/${id}`));
  };

  return {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

export default API;
