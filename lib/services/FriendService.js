import { viewAccount } from '../utils/near.js';

export default class FriendService {
  static async getBalance(accountId) {
    return await viewAccount(accountId);
  }
}
