import queryString from "query-string";
import _ from "lodash";
import Mock from 'mockjs'
import Config from "./config";

let request = {}

request.get = (url, params) => {
  if (params) {
    url = `${url}?${queryString.stringify(params)}`
  }
  return fetch(url).then(res => {
    return res._bodyInit
  }).then(res2 => {
    return Mock.mock(JSON.parse(res2))
  }).catch(e => {
    console.warn(e) 
  })
}

request.post = (url, body) => {
  let options = _.extend(Config.header, {
    body: JSON.stringify(body)
  })
  return fetch(url, options).then(res => {
    return res._bodyInit
  }).then(res2 => {
    return Mock.mock(JSON.parse(res2))
  }).catch(e => {
    console.warn(e) 
  })
}

module.exports = request