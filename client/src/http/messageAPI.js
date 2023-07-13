import { $authHost} from "./index";

export const updateMessage = async (message) => {
    const {data} = await $authHost.put('api/message/update', {message})
    return data
}

export const sendMessage = async (message) => {
    const {data} = await $authHost.post('api/message/send', {message})
    return data
}

export const getMessage  = async (id) => {
    const {data} = await $authHost.get(`api/message/${id}`)
    return data
}

