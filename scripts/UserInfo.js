export default class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userNameElement.textContent;
    userInfo.job = this._userJobElement.textContent;

    return userInfo;
  }

  setUserInfo(userName, userJob) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
  }

}