import axios from 'axios'

const url = "https://studies.cs.helsinki.fi/restcountries"

const endpoint_all = "api/all"
const endpoint_name = "api/name"

const getAll = () =>{
    return( 
        axios
            .get(`${url}/${endpoint_all}`)
            .then(response => response.data)
    )
}

const getByName = (name) =>{
    return(
        axios
            .get(`${url}/${endpoint_name}/${name}`)
            .then(response => response.data)
    )
}

export default{
    getAll,
    getByName
}