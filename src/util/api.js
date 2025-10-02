import axios from 'axios';

//const API_BASE = 'http://10.0.2.2:8080';
const API_BASE = 'http://192.168.45.62:8080';


export const getRequest = async (url, params = {}) => {
    try {
        const res = await axios.get(`${API_BASE}${url}`, { params });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const postRequest = async (url, body) => {
    try {
        const res = await axios.post(`${API_BASE}${url}`, body);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const putRequest = async (url, body) => {
    try {
        const res = await axios.put(`${API_BASE}${url}`, body);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const deleteRequest = async (url) => {
    try {
        const res = await axios.delete(`${API_BASE}${url}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getRequestWithToken = async (url, token) => {
    try {
        const res = await axios.get(`${API_BASE}${url}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


export const postRequestWithToken = async (url, body, token) => {
    try {
        const res = await axios.post(`${API_BASE}${url}`, body, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const putRequestWithToken = async (url, body, token) => {
    try {
        const res = await axios.put(`${API_BASE}${url}`, body, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const deleteRequestWithToken = async (url, token) => {
    try {
        const res = await axios.delete(`${API_BASE}${url}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
