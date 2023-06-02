import axios from "axios"

const server = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    crossDomain: true,
})

export default server
