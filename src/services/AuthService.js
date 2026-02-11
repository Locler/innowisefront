import * as authApi from '../api/auth';

class AuthService {
    // Логин
    async login(username, password) {
        const response = await authApi.login(username, password);

        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        // Сохраняем токены
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Настраиваем axios для будущих запросов
        authApi.API_URL.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Валидация токена через query-параметр
        const validateResponse = await this.validate();

        const role = validateResponse.data.role;
        const userId = validateResponse.data.userId;

        // Сохраняем данные пользователя
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', userId);

        return { accessToken, refreshToken, role, userId };
    }

    // Регистрация
    async register(body) {
        return authApi.register(body);
    }

    // Валидация токена
    async validate() {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Нет токена');

        // Передаём токен как query-параметр
        return authApi.API_URL.get('/auth/validate', {
            params: { token }
        });
    }

    // Выход из системы
    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        delete authApi.API_URL.defaults.headers.common['Authorization'];
    }
}

export default new AuthService();
