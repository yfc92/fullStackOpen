import axios from 'axios'

const url = "/api/persons"

const getAll = () =>{
    return axios
    .get(url)
    .then(response => response.data)
}

const add = newPerson =>{
    return axios
    .post(url, newPerson)
    .then(response => response.data)
}

const remove = id =>{
    const targetUrl = `${url}/${id}`
    return axios
    .delete(targetUrl)
    .then(response => response.data)
}

const update = (id, updatedPerson) => {
    const targetUrl = `${url}/${id}`
    return axios
    .put(targetUrl, updatedPerson)
    .then(response => response.data)
}

export default {
    getAll,
    add,
    remove,
    update
}