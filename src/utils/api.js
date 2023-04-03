class Api {
    #baseUrl;
    #headers;

    constructor({ baseUrl, headers }) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;   
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
         
    }

    getAllInfo(){
        return Promise.all([this.getProductsList(), this.getUserInfo()])

    }
    getProductsList() {
        return fetch(`${this.#baseUrl}/products`, {
            headers: this.#headers
        })
        .then(this.#onResponse)
    }

    getUserInfo() {
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
        .then(this.#onResponse)
    }

    search(searchQuery) {
        return fetch(`${this.#baseUrl}/products/search?query=${searchQuery}`, {
            headers: this.#headers
        })
        .then(this.#onResponse)
    }
}


const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOGFhMzk3MTIxODM4ZjI4OTgiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQzLCJleHAiOjE3MTAzMzg0NDN9.Y7nuAVWeA_CGJipJNTktP9raSdpM41B3s-z4l-8rE70'
    }
})

export default api;