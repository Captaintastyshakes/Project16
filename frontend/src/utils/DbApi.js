//marking for pull request analysis
import BaseApi from "./baseApi.js";

export default class DbApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
  }
  //these are future backend functions that have not been developed/implemented
  login() {}
  logout() {}
  changeProfile() {}
  saveNewsCard() {}
  removeNewsCard() {}

  storage = {};
}
