import * as api from '../api/auth';

class AuthService {
    async login(username, password) {
        const res = await api.login(username, password);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        return res.data;
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
    }
}

export default new AuthService();
