import * as api from '../api/users';

class UserService {
    getAllUsers(params) {
        return api.getAllUsers(params);
    }

    getUserById(id) {
        return api.getUserById(id);
    }

    getUserByEmail(email) {
        return api.getUserByEmail(email);
    }

    createUser(userDto) {
        return api.createUser(userDto);
    }

    updateUser(id, userDto) {
        return api.updateUser(id, userDto);
    }

    deleteUser(id) {
        return api.deleteUser(id);
    }

    activateUser(id) {
        return api.activateUser(id);
    }

    deactivateUser(id) {
        return api.deactivateUser(id);
    }
}

export default new UserService();
