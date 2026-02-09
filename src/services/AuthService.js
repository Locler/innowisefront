import * as api from '../api/auth';

class AuthService {
    async login(username, password) {
        const res = await api.login(username, password);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        const validation = await api.validate(res.data.accessToken);
        localStorage.setItem('userId', validation.data.userId);
        localStorage.setItem('role', validation.data.role); // сохраняем роль
    }

    getUserId() {
        return localStorage.getItem('userId');
    }

    getRole() {
        return localStorage.getItem('role');
    }

    async register(userId, username, password, role = 'USER') {
        await api.register(userId, username, password, role);
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
    }
}

export default new AuthService();
