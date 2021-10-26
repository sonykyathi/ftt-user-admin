
import api from './api';

export const getRoles = async () => {
    return await api.get(`/api/v1/user/getrole`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('token'))
            }
        }).then(res => res.data);

}


export const activeUsers = async (data) => {
    return await api.post(`/api/v1/admin/activeusers`, data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('token'))
            }
        }).then(res => res.data);

}


export const inactiveUsers = async (data) => {
    return await api.post(`/api/v1/admin/inactiveusers`, data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('token'))
            }
        }).then(res => res.data);
}

export const activeInactiveUser = async (data) => {
    return await api.post(`/api/v1/admin/activeinactiveuser`, data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('token'))
            }
        }).then(res => res.data);
}

export const forgotPassowrd = async (data) => {
    return await api.post(`/api/v1/user/forgot-password`, data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.data);
}

export const resetPassword = async (data) => {
    return await api.post(`/api/v1/user/update-password`, data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.data);
}