//marking for pull request analysis
import BaseApi from "./BaseApi.js";

export default class NewsApi extends BaseApi {
  constructor(baseUrl, key) {
    super(baseUrl);
    this._key = key;
    this._everything = "everything";
    this._topHeadlines = "top-headlines";
  }

  search(keyword) {
    //let netEndpoint = `${this._everything}?q=${keyword}&from=${this._date}&sortBy=${sortBy}&apiKey=${this._key}`; //aight need to figure out what kind of date range I'd like
    //let netEndpoint = `${this._everything}?q=${keyword}&sortBy=${sortBy}&apiKey=${this._key}`;
    //For the intent and purpose of this project at this stage I don't feel it's necessary to modify the api call to do much more than what the defaults my account is configured for anyways.
    //These are here mainly to show I know what modifying the calls would take but don't feel the need to implement at this time.
    let netEndpoint = `${this._everything}?q=${keyword}&apiKey=${this._key}`;
    return this._fetch(netEndpoint, "GET");
  }
}
