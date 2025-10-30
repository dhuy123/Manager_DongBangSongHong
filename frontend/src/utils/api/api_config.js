// src/api/apiConfig.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Định nghĩa URL API

//  const API_BASE_URL = 'https://048abb8bd81b.ngrok-free.app/api';

const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    // timeout: 5000, // Giới hạn thời gian request (5 giây)
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    }
});

export { apiInstance, API_BASE_URL };
