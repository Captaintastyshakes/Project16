import BaseApi from "./baseApi.js";

export default class DbApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
  }

  login() {}
  logout() {}
  changeProfile() {}
  saveNewsCard() {}
  removeNewsCard() {}

  storage = {};
}
