export default class BaseApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._options = {
      method: "",
      headers: {
        //"Content-type": "application/json",
        authorization: null,
      },
      body: null,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _reset() {
    this._options.method = "";
    this._options.body = null;
    this._options.headers.authorization = null;
  }

  _request(url) {
    return fetch(this._baseUrl + url, this._options)
      .then(this._checkResponse)
      .finally(() => {
        this._reset();
      });
  }

  _fetch = (endpoint, how) => {
    this._options.method = how;
    return this._request(endpoint);
  };

  _send = (endpoint, parcel, how) => {
    this._options.method = how;
    this._options.body = JSON.stringify(parcel);
    return this._request(endpoint);
  };
}
