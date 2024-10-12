import axios from 'axios';

const API_BASE_URL = "https://wishlistapi-b5777d959cf8.herokuapp.com/items"; // Make sure the backend is running on this port, adjust if needed.

// Get all lists for a user
export const getAllListsForUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/lists`, {
            params: { userId: userId },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all lists for user", error);
        throw error;
    }
};

// Get a specific list by ID
export const getListById = async (listId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/lists/${listId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching the list by ID", error);
        throw error;
    }
};

// Create a new list for a user
export const createList = async (userId, name, isPublic) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/lists`, null, {
            params: {
                userId: userId,
                name: name,
                isPublic: isPublic
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating a new list", error);
        throw error;
    }
};

// Update a list by its ID
export const updateListByParams = async (listId, name = null, isPublic = null) => {
    try {
        const params = {};
        if (name) params.name = name;
        if (isPublic !== null) params.isPublic = isPublic;

        const response = await axios.patch(`${API_BASE_URL}/lists/${listId}`, null, { params });
        return response.data;
    } catch (error) {
        console.error("Error updating the list", error);
        throw error;
    }
};

// Delete a list by ID
export const deleteList = async (listId) => {
    try {
        await axios.delete(`${API_BASE_URL}/lists/${listId}`);
    } catch (error) {
        console.error("Error deleting the list", error);
        throw error;
    }
};

// Add an existing item to a list
export const addExistingItemToList = async (listId, itemId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/lists/${listId}/add-existing-item`, null, {
            params: { itemId: itemId }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding item to list", error);
        throw error;
    }
};

// Add an item to the collection
export const addItemToCollection = async (item) => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, item); // Sending the item object in the request body
        return response.data;
    } catch (error) {
        console.error("Error adding item to collection", error);
        throw error;
    }
};

// Get all items from the collection
export const getAllItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all items", error);
        throw error;
    }
};

// Get a specific item by its ID
export const getItemById = async (itemId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching item by ID", error);
        throw error;
    }
};

// Update a specific item by its ID and params
export const updateItemByParams = async (itemId, updatedData) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${itemId}`, null, {
            params: updatedData,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating item", error);
        throw error;
    }
};

// Delete a specific item by its ID
export const deleteItem = async (itemId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${itemId}`);
    } catch (error) {
        console.error("Error deleting item", error);
        throw error;
    }
};

// Remove an item from a list
export const removeItemFromList = async (listId, itemId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/lists/${listId}/remove-item/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing item from list", error);
        throw error;
    }
};

// Search for items based on search terms
export const searchItems = async (searchQuery) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { search: searchQuery },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching for items", error);
        throw error;
    }
};

// Fetch 10 random lists that don't belong to the user
export const getRandomLists = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/lists/random`, {
            params: { userId: userId },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching random lists", error);
        throw error;
    }
};