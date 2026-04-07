import BaseApi from "./BaseApi.js";

export default class NewsApi extends BaseApi {
  constructor(baseUrl, key) {
    super(baseUrl);
    this._key = key;
    this._everything = "everything";
    this._topHeadlines = "top-headlines";
    //this._date = new Date().toISOString();
  }

  /*currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });*/

  //dateIWant = new Date().toISOString();

  search(keyword) {
    //let netEndpoint = `${this._everything}?q=${keyword}&from=${this._date}&sortBy=${sortBy}&apiKey=${this._key}`; //aight need to figure out what kind of date range I'd like
    //let netEndpoint = `${this._everything}?q=${keyword}&sortBy=${sortBy}&apiKey=${this._key}`;
    let netEndpoint = `${this._everything}?q=${keyword}&apiKey=${this._key}`;
    return this._fetch(netEndpoint, "GET");
  }
}
