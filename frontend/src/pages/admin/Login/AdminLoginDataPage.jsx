// src/pages/admin/AdminLoginDataPage.jsx
import axios from 'axios';

const loginAdmin = async (adminId, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/admin/login', {
      id: adminId,
      password,
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message,
        remainingAttempts: error.response.data.remainingAttempts,
      };
    } else {
      return { success: false, message: 'Server error. Please try again later.' };
    }
  }
};

export default loginAdmin;
