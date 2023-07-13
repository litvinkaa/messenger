import { $authHost} from "./index";

export const updateChat = async (chat) => {
    const {data} = await $authHost.put('api/chat/update', {chat})
    return data
}

export const createChat = async (user1_id, user2_id) => {
    const {data} = await $authHost.post('api/chat/create', {user1_id, user2_id})
    return data
}

export const getChat = async (id) => {
    const {data} = await $authHost.get(`api/chat/${id}`)
    return data
}

export const getMessages = async (id) => {
        const {data} = await $authHost.get(`api/chat/messages/${id}` )
        return data
    
    
}

   