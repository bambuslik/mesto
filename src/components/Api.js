export default class Api {
  constructor({apiUrl, token, cohort}) {
    this._apiUrl = apiUrl;
    this._token = token;
    this._cohort = cohort;
  }

  getUser() {
    return fetch(`${this._apiUrl}/v1/${this._cohort}/users/me`,
      {
        headers: {
          authorization: this._token
        }
      })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Данные профиля не получены! Ошибка запроса: ${res.status}, ${res.statusText}`);
      });
  }

  getInitialCards() {
    return fetch(`${this._apiUrl}/v1/${this._cohort}/cards`,
      {
        headers: {
          authorization: this._token
        }
      })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Карточки не получены! Ошибка запроса: ${res.status}, ${res.statusText}`);
      });
  }

  editProfile(name, job) {
    return fetch(`${this._apiUrl}/v1/${this._cohort}/users/me`,
      {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${name}`,
          about: `${job}`
        })
      })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Профиль не сохранен! Ошибка запроса: ${res.status}, ${res.statusText}`);
      });
  }

  addCard(name, link) {
    return fetch(`${this._apiUrl}/v1/${this._cohort}/cards`,
      {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${name}`,
          link: `${link}`
        })
      })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Карточка не добавлена! Ошибка запроса: ${res.status}, ${res.statusText}`);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._apiUrl}/v1/${this._cohort}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Карточка не удалена! Ошибка запроса: ${res.status}, ${res.statusText}`);
      });
  }

  setLike(cardId) {
    return fetch(`${this._apiUrl}/v1/${this._cohort}/cards/likes/${cardId}`,
      {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Лайк не поставлен! Ошибка запроса: ${res.status}, ${res.statusText}`);
      });
  }

  unsetLike(cardId) {
    return fetch(`${this._apiUrl}/v1/${this._cohort}/cards/likes/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Лайк не удален! Ошибка запроса: ${res.status}, ${res.statusText}`);
      });
  }

  setAvatar(avatar) {
    return fetch(`${this._apiUrl}/v1/${this._cohort}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: `${avatar}`
        })
      })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Аватар не сохранен! Ошибка запроса: ${res.status}, ${res.statusText}`);
      });
  }

}