import api from "./axiosInstance";


export const apiService = {
    // GET request
    get: async (endpoint) => {
        try {
            const response = await api.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
    },

    // POST request
    post: async (endpoint, data) => {
        try {
            const response = await api.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('POST Error:', error);
            throw error;
        }
    },

    // PUT request
    put: async (endpoint, data) => {
        try {
            const response = await api.put(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('PUT Error:', error);
            throw error;
        }
    },

    // DELETE request
    delete: async (endpoint) => {
        try {
            const response = await api.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error('DELETE Error:', error);
            throw error;
        }
    }
};