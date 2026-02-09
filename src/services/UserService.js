import * as api from '../api/users';

class UserService {
    constructor() {
        this.roles = (localStorage.getItem('userRoles') || '').split(',');
    }

    isAdmin() {
        return this.roles.includes('ADMIN');
    }

    async getAllUsers(params) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            const res = await api.getAllUsers(params);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async getUserById(id) {
        try {
            const res = await api.getUserById(id);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async getUserByEmail(email) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            const res = await api.getUserByEmail(email);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async createUser(userDto) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            const res = await api.createUser(userDto);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async updateUser(id, userDto) {
        try {
            const res = await api.updateUser(id, userDto);
            return res.data;
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async deleteUser(id) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            await api.deleteUser(id);
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async activateUser(id) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            await api.activateUser(id);
        } catch (err) {
            throw this.parseError(err);
        }
    }

    async deactivateUser(id) {
        if (!this.isAdmin()) throw new Error('Доступ только для администратора');
        try {
            await api.deactivateUser(id);
        } catch (err) {
            throw this.parseError(err);
        }
    }

    parseError(err) {
        if (err.response?.data?.message) return new Error(err.response.data.message);
        if (err.response?.data) return new Error(JSON.stringify(err.response.data));
        return new Error(err.message || 'Неизвестная ошибка');
    }
}

export default new UserService();
