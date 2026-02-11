import * as api from '../api/users';

class UserService {
    async getAllUsers(params) {
        try {
            const res = await api.getAllUsers(params);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при загрузке пользователей');
        }
    }

    async getUserById(id) {
        try {
            const res = await api.getUserById(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при получении пользователя');
        }
    }

    async createUser(dto) {
        try {
            const res = await api.createUser(dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при создании пользователя');
        }
    }

    async updateUser(id, dto) {
        try {
            const res = await api.updateUser(id, dto);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при обновлении пользователя');
        }
    }

    async deleteUser(id) {
        try {
            await api.deleteUser(id);
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при удалении пользователя');
        }
    }

    async activateUser(id) {
        try {
            const res = await api.activateUser(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при активации пользователя');
        }
    }

    async deactivateUser(id) {
        try {
            const res = await api.deactivateUser(id);
            return res.data;
        } catch (e) {
            throw new Error(e.response?.data?.message || 'Ошибка при деактивации пользователя');
        }
    }
}

export default new UserService();
