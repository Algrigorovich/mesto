class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then( res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch(err => {
      console.log(err);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then( res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch(err => {
      console.log(err);
    });
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then( res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch(err => {
      console.log(err);
    });
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then( res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch(err => {
      console.log(err);
    });
  }









}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '1156e6c2-0259-404f-a04b-e576a16d1ddc',
    'Content-Type': 'application/json'
  }
});
