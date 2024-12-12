import axios from "axios";

const API_URL = "http://127.0.0.1:4000/api/v1/users/user"; // Backend endpoint

// Fetch user data by userId
export const fetchUserData = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

// Update user data
export const updateUserProfile = async (updateData) => {
    try {
        const response = await axios.put(API_URL, updateData);
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};
