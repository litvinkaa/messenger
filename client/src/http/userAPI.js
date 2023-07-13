import { $authHost, $host } from "./index";

import { LOCAL_STORAGE_AUTH_KEY } from "../utils/consts";

import jwt_decode from "jwt-decode";

export const registration = async (username, password) => {
    const {data} = await $host.post('api/user/registration', {username, password})
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, data.token)
    return jwt_decode(data.token)
}

export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username, password})
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, data.token)
    return jwt_decode(data.token)
}


export const get = async (id) => {
    const {data} = await $authHost.get(`api/user/${id}`)
    return data
}

export const searchUser = async (name_fragment) => {
    const {data} = await $authHost.get(`api/user/search/${name_fragment}`)
    return data
}

export const check = async () => {
    try
    {
        const {data} = await $authHost.get('api/user/auth' )
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, data.token)
        return jwt_decode(data.token)
    }
    catch(err)
    {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
    }
    
}

export const updateUser = async (user) => {
    const {data} = await $authHost.put('api/user/update', {user})
    return data
}

   