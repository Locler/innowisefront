import * as api from '../api/auth';
import axios from 'axios';

class AuthService {
    // Логин
    async login(username, password) {
        const res = await api.login(username, password);

        // Сохраняем токены
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        // Получаем userId и роль через validate
        const validation = await api.validate(res.data.accessToken);
        localStorage.setItem('userId', validation.data.userId);
        localStorage.setItem('role', validation.data.role);

        // Обновляем заголовок axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;

        return validation.data;
    }

    // Регистрация
    async register(body) {
        await api.register(body);
    }

    getUserId() {
        return localStorage.getItem('userId');
    }

    getRole() {
        return localStorage.getItem('role');
    }

    getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    isAuthenticated() {
        return !!this.getAccessToken();
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default new AuthService();
