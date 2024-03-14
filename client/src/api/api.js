import axios from 'axios'

export const AuthClient = axios.create({
baseURL:`http://localhost:5000/api/auth`,
withCredentials:true
})