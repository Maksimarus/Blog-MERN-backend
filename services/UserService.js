import UserModel from '../models/User.js';

class UserService {
  async createNew(user) {
    const newUser = await UserModel.create(user);
    return newUser;
  }
  async login(email) {
    const user = await UserModel.findOne(email);
    return user;
  }
  async getMe(id) {
    const me = await UserModel.findById(id);
    return me;
  }
}

export default new UserService();
