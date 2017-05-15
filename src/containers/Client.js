import 'whatwg-fetch'
const url = require('url')

/**
 * Simple fetch wrapper
 *
 * Usage:
 * let api = new Client('https://foo.bar:8000/api/latest/')
 * api.get('data/100500')
 *    .then(data => processData(data))
 *    .catch(error => handleError(error))
 *
 */
class Client {
  constructor(baseUrl) {
    this.makeUrl = (path) => {
      if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) { // Absolute URL
        return path.replace('/\/+$/', '\/') // make sure about the single trailing slash
      }
      else { // relative to API root
        return (url.resolve(baseUrl, path) + '/').replace('/\/+$/', '\/')
      }
    }
  }

  checkHttpResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }
    else {
      let error = new Error( 'Failed to load resource '
        + response.url
        + '. The server responded with a status '
        + response.status + ' (' + response.statusText + ').')
      error.response = response
      throw error
    }
  }

  get = (path) => {
    const params = {
      method: 'GET',
      credentials: 'same-origin',
    }
    return fetch (this.makeUrl(path), params)
      .then (response => this.checkHttpResponse (response))
      .then (response => response.json ())
  }

  post = (path, payload) => {
    const body = JSON.stringify (payload)
    const params = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': window.csrftoken
      },
      body: body,
      credentials: 'same-origin',
    }
    return fetch (this.makeUrl(path), params)
      .then (response => this.checkHttpResponse (response))
      .then (response => response.json ())
  }

  delete = (path) => {
    const params = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': window.csrftoken
      },
      credentials: 'same-origin',
    }
    return fetch (this.makeUrl(path), params)
      .then (response => this.checkHttpResponse (response))
  }

  patch = (path, payload) => {
    const body = JSON.stringify (payload)
    const params = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': window.csrftoken
      },
      body: body,
      credentials: 'same-origin',
    }
    return fetch (this.makeUrl(path), params)
      .then (response => this.checkHttpResponse (response))
      .then (response => response.json ())
  }
}

export default Client
