import { getLocalData } from "./localStorage";

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
            headers: {...this.#headers, authorization: `Bearer ${getLocalData('token')}` },
        })
        .then(this.#onResponse)
    }

    getUserInfo() {
        return fetch(`${this.#baseUrl}/v2/group-11/users/me`, {
            headers: {...this.#headers, authorization: `Bearer ${getLocalData('token')}` },
        })
        .then(this.#onResponse)
    }

    search(searchQuery) {
        return fetch(`${this.#baseUrl}/products/search?query=${searchQuery}`, {
            headers: {...this.#headers, authorization: `Bearer ${getLocalData('token')}` },
        })
        .then(this.#onResponse)
    }

    setUserInfo({name, about}) {
        return fetch(`${this.#baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {...this.#headers, authorization: `Bearer ${getLocalData('token')}` },
            body: JSON.stringify({name, about})
        })
        .then(this.#onResponse)
    }

    changeLikeProductStatus(productID, like) {
        return fetch(`${this.#baseUrl}/products/likes/${productID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: {...this.#headers, authorization: `Bearer ${getLocalData('token')}` },
        })
        .then(this.#onResponse)
    }
    
    getProductById(idProduct) {
        return fetch(`${this.#baseUrl}/products/${idProduct}`, {
            headers: {...this.#headers, authorization: `Bearer ${getLocalData('token')}` },
        })
        .then(this.#onResponse)
    }

    getProductInfo(idProduct){
        return Promise.all([this.getProductById(idProduct), this.getUserInfo()])

    }

    createReviewProduct(productId, reviewData) {
        return fetch(`${this.#baseUrl}/products/review/${productId}`, {
            method: 'POST',
            headers: {...this.#headers, authorization: `Bearer ${getLocalData('token')}` },
            body: JSON.stringify(reviewData)
        })
        .then(this.#onResponse)
    }

    register(bodyData) {
        return fetch(`${this.#baseUrl}/signup`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(bodyData)
        })
        .then(this.#onResponse)
    }

    authorize(bodyData) {
        return fetch(`${this.#baseUrl}/signin`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(bodyData)
        })
        .then(this.#onResponse)
    }

    checkToken(token) {
        return fetch(`${this.#baseUrl}/users/me`, {
            method: 'GET',
            headers: {...this.#headers, authorization: `Bearer ${token}` }
        })
        .then(this.#onResponse)
    }

}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        // authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOGFhMzk3MTIxODM4ZjI4OTgiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQzLCJleHAiOjE3MTAzMzg0NDN9.Y7nuAVWeA_CGJipJNTktP9raSdpM41B3s-z4l-8rE70'
    }
})

export default api;